// src/__tests__/integration/ProductFlow.test.jsx

// Importing React and necessary testing utilities from Vitest and Testing Library.
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';

// Redux and Router imports for setting up the test environment.
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Using MemoryRouter for controlled test routing.

// Importing the main application components and pages to reconstruct the app structure for tests.
// This gives us more control than rendering the full App.jsx which has its own BrowserRouter.
import Layout from '../../components/common/Layout';
import ProductListing from '../../pages/ProductListing';
import ProductDetail from '../../pages/ProductDetail';
import Favorites from '../../pages/Favorites';

// The API utility module will be mocked.
import * as api from '../../utils/api';

// Importing Redux slice reducers to build a fresh store for each test.
import productsReducer from '../../redux/slices/productsSlice';
import favoritesReducer from '../../redux/slices/favoritesSlice';
import filtersReducer from '../../redux/slices/filtersSlice';

// We're mocking the entire API module.
// This allows us to control the responses of API calls during tests.
vi.mock('../../utils/api', () => ({
  fetchProducts: vi.fn(),
  fetchProductById: vi.fn(),
  fetchCategories: vi.fn(),
}));

// Describe block for our main integration test suite: Product Flow.
// This suite will test the end-to-end user journey for product interactions.
describe('Product Flow Integration', () => {
  // Mock data that our API calls will resolve with.
  // This gives us predictable data for our assertions.
  const mockProductsData = [
    {
      id: 1,
      title: 'Product One',
      price: 29.99,
      category: 'electronics',
      image: 'https://example.com/1.jpg',
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: 'Product Two',
      price: 39.99,
      category: 'clothing',
      image: 'https://example.com/2.jpg',
      rating: { rate: 4.0, count: 50 },
    },
  ];
  const mockCategoriesData = ['electronics', 'clothing'];

  // This variable will hold our Redux store instance, fresh for each test.
  let testStore;

  // beforeEach hook: This runs before each 'it' test block.
  beforeEach(() => {
    // Create a new, clean Redux store instance for every test.
    // This is crucial for test isolation, preventing state leakage between tests.
    testStore = configureStore({
      reducer: {
        products: productsReducer,
        favorites: favoritesReducer,
        filters: filtersReducer,
      },
    });

    // Clear any previous mock call history and reset mock implementations.
    vi.clearAllMocks();
    // Mock the fetchProducts API call to resolve with our predefined product data.
    // We use a spread `[...mockProductsData]` to pass a copy, ensuring the original mock array isn't mutated.
    api.fetchProducts.mockResolvedValue([...mockProductsData]);
    // Mock fetchCategories.
    api.fetchCategories.mockResolvedValue([...mockCategoriesData]);
    // Mock fetchProductById to find a product from our mock data.
    api.fetchProductById.mockImplementation((id) =>
      Promise.resolve(mockProductsData.find((p) => p.id === parseInt(id)))
    );
  });

  // afterEach hook: Runs after each test to perform cleanup.
  afterEach(() => {
    cleanup(); // This unmounts React trees that were mounted with 'render'.
  });

  // Custom render helper: Sets up the Redux Provider and MemoryRouter.
  // This allows us to render components within a realistic app-like environment
  // and control the initial route for testing specific scenarios.
  const renderWithProvidersAndRouter = (ui, { route = '/' } = {}) => {
    // The `ui` argument isn't strictly used here as we always render the main route structure,
    // but it's a common pattern if you wanted to render arbitrary components.
    // For this suite, we always want our main app structure starting at a specific route.
    return render(
      <Provider store={testStore}> {/* Provide the test-specific Redux store */}
        <MemoryRouter initialEntries={[route]}> {/* Control initial route for the test */}
          <Layout> {/* Include the main Layout (Navbar, etc.) */}
            <Routes> {/* Define the same routes as in App.jsx */}
              <Route path="/" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Layout>
        </MemoryRouter>
      </Provider>
    );
  };

  // Test case: Verifies that products are loaded and displayed on the home page.
  it('loads and displays products on home page', async () => {
    renderWithProvidersAndRouter(<div />); // Render the app, ProductListing is the default route.
    
    // Wait for the asynchronous data fetching and UI update to complete.
    await waitFor(() => {
      // Assert that both mock products are visible on the screen.
      expect(screen.getByText('Product One')).toBeInTheDocument();
      expect(screen.getByText('Product Two')).toBeInTheDocument();
    });
    // Verify that our mocked API functions were called as expected.
    expect(api.fetchProducts).toHaveBeenCalledTimes(1);
    expect(api.fetchCategories).toHaveBeenCalledTimes(1);
  });

  // Test case: Checks if the search functionality filters products correctly.
  it('allows searching for products', async () => {
    renderWithProvidersAndRouter(<div />);
    // Ensure initial products are loaded before interacting with search.
    await waitFor(() => {
        expect(screen.getByText('Product One')).toBeInTheDocument();
        expect(screen.getByText('Product Two')).toBeInTheDocument();
    });

    // Find the search input and simulate typing.
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'One' } });

    // Wait for the debounced search to take effect and UI to update.
    await waitFor(
      () => {
        expect(screen.getByText('Product One')).toBeInTheDocument(); // "Product One" should remain.
        expect(screen.queryByText('Product Two')).not.toBeInTheDocument(); // "Product Two" should be filtered out.
      },
      { timeout: 2000 } // Slightly longer timeout to accommodate debounce.
    );
  });

  // Test case: Verifies category filtering.
  it('allows filtering by category', async () => {
    renderWithProvidersAndRouter(<div />);
    // Wait for initial products.
     await waitFor(() => {
        expect(screen.getByText('Product One')).toBeInTheDocument();
        expect(screen.getByText('Product Two')).toBeInTheDocument();
    });

    // Find the category select dropdown and change its value.
    const categorySelect = screen.getByLabelText('Category:');
    fireEvent.change(categorySelect, { target: { value: 'electronics' } });

    // Wait for the filter to apply and UI to update.
    await waitFor(() => {
      expect(screen.getByText('Product One')).toBeInTheDocument(); // Belongs to 'electronics'.
      expect(screen.queryByText('Product Two')).not.toBeInTheDocument(); // Does not.
    });
  });

  // Test case: Checks product sorting by price (ascending).
  it('allows sorting products by price', async () => {
    renderWithProvidersAndRouter(<div />);
    // Wait for initial products.
     await waitFor(() => {
        expect(screen.getByText('Product One')).toBeInTheDocument();
        expect(screen.getByText('Product Two')).toBeInTheDocument();
    });

    // Find the sort dropdown and change its value to sort by price ascending.
    const sortSelect = screen.getByLabelText('Sort by:');
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });

    // Wait for sorting to apply and product cards to re-order.
    await waitFor(() => {
      const productCards = screen.getAllByRole('article'); // Get all product cards.
      expect(productCards.length).toBe(2); // Ensure both products are still displayed.
      // "Product One" ($29.99) should appear before "Product Two" ($39.99).
      expect(productCards[0]).toHaveTextContent('Product One'); 
      expect(productCards[1]).toHaveTextContent('Product Two'); 
    });
  });

  // Test case: Validates adding a product to favorites and viewing it on the favorites page.
  it('allows adding and removing favorites', async () => {
    renderWithProvidersAndRouter(<div />);
    // Wait for "Product One" to be loaded on the product list.
     await waitFor(() => {
        expect(screen.getByText('Product One')).toBeInTheDocument();
    });

    // Find "Product One"'s card and its favorite button.
    const productOneCard = screen.getByText('Product One').closest('article');
    const favoriteButtonInCard = productOneCard.querySelector('button[aria-label="Add to favorites"]');
    expect(favoriteButtonInCard).toBeInTheDocument(); // Make sure the button is found.

    // Simulate clicking the favorite button.
    fireEvent.click(favoriteButtonInCard);

    // Wait for the favorites badge in the Navbar to update to "1".
    await waitFor(() => {
      const favoritesBadge = screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'span' && element.classList.contains('favorites-badge') && content === '1';
      });
      expect(favoritesBadge).toBeInTheDocument();
    });
    
    // Find the "Favorites" link in the Navbar and click it.
    const favoritesLink = screen.getByRole('link', { name: /Favorites/i });
    fireEvent.click(favoritesLink);

    // Now on the Favorites page, wait for its content to load.
    await waitFor(() => {
      expect(screen.getByText('Your Favorites')).toBeInTheDocument(); // Check page title.
      expect(screen.getByText('Product One')).toBeInTheDocument(); // The favorited product.
      expect(screen.queryByText('Product Two')).not.toBeInTheDocument(); // The other product shouldn't be here.
    });
  });

  // Test case: Checks navigation to a product's detail page.
  it('navigates to product detail page', async () => {
    renderWithProvidersAndRouter(<div />); // Start on ProductListing.
    // Wait for "Product One" to appear on the listing page.
    await waitFor(() => { 
      expect(screen.getByText('Product One')).toBeInTheDocument();
    });

    // Find the link for "Product One" (usually its title or card) and click it.
    const productLink = screen.getByText('Product One'); 
    fireEvent.click(productLink); 

    // Wait for the ProductDetail page to load and display its content.
    await waitFor(() => { 
      expect(api.fetchProductById).toHaveBeenCalledWith('1'); // Check if the correct API was called.
      // Assert that elements specific to the detail page are present.
      expect(screen.getByText((content, element) => content.startsWith('Product One') && element.tagName.toLowerCase() === 'h1')).toBeInTheDocument(); 
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('$29.99')).toBeInTheDocument();
    }, { timeout: 2000 }); // Slightly extended timeout for page transition and data loading.
  });

  // Test case: Verifies that the "empty favorites" state is shown correctly.
  it('shows empty state when no favorites', async () => {
    // Render the app. Since we create a new store for each test, favorites will be empty.
    renderWithProvidersAndRouter(<div />); 
    // Ensure the initial product listing page is stable before navigating.
    await waitFor(() => {
      expect(screen.getByText('Product One')).toBeInTheDocument();
    });

    // Click the "Favorites" link in the Navbar.
    const favoritesLink = screen.getByRole('link', { name: /Favorites/i });
    fireEvent.click(favoritesLink); 

    // Wait for the Favorites page to display the empty state message.
    await waitFor(() => { 
      expect(screen.getByText('No Favorites Yet')).toBeInTheDocument();
      expect(screen.getByText('Browse Products')).toBeInTheDocument(); // Link to browse.
      expect(screen.queryByRole('article')).not.toBeInTheDocument(); // No product cards should be rendered.
    });
  });
});