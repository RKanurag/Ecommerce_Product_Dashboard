# Product Dashboard

A modern, responsive product dashboard built with React, Redux Toolkit, and Vite. This application demonstrates best practices in frontend development with a focus on clean code, testing, and user experience.

## ✨ Features

-   **Product Listing**: Browse products in a responsive grid layout
-   **Search**: Real-time search with debouncing for optimal performance
-   **Filtering**: Filter products by category
-   **Sorting**: Sort products by price (ascending/descending)
-   **Favorites**: Add/remove products to favorites with persistent state
-   **Product Details**: View detailed information about each product
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
-   **Modern UI**: Clean, modern interface with smooth animations
-   **Testing**: Comprehensive unit and integration tests with good coverage

## 🛠️ Technologies Used

-   **React 18**: Modern React with hooks and functional components
-   **Redux Toolkit**: State management with modern Redux patterns
-   **React Router v6**: Client-side routing
-   **Vite**: Lightning-fast build tool
-   **Vitest**: Fast unit testing framework
-   **Testing Library**: For robust component and integration testing
-   **Axios**: HTTP client for API calls
-   **CSS3**: Modern styling with CSS variables and animations (No external UI libraries like Tailwind or Styled Components were used, focusing on pure CSS for styling control)

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd product-dashboard
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

    The application will typically open at `http://localhost:3000` (or the next available port).

## 🧪 Testing

This project includes a comprehensive suite of unit and integration tests.

1.  **Run all tests in watch mode:**
    ```bash
    npm test
    ```

2.  **Run tests with a graphical UI (opens in browser):**
    ```bash
    npm run test:ui
    ```

3.  **Run tests once and generate a coverage report:**
    ```bash
    npm run test:coverage
    ```
    After running this command, a `coverage` folder will be generated in the project root.

4.  **View the HTML Coverage Report:**
    To view a detailed, interactive HTML report of your test coverage:
    *   Navigate to the `coverage` folder.
    *   Open the `index.html` file within the `coverage` folder in your web browser.
        *   You can often do this by right-clicking the `index.html` file in your file explorer and selecting "Open with" your preferred browser.
        *   Alternatively, if you have a simple HTTP server installed (like `serve` or Python's built-in server), you can serve the `coverage` directory and navigate to `index.html`. For example, using `npx serve ./coverage`.

    This report will show you line-by-line coverage for your files, helping to identify which parts of your code are exercised by your tests.

## 🏗️ Build

1.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create an optimized `dist` folder.

2.  **Preview production build locally:**
    ```bash
    npm run preview
    ```

## 📁 Project Structure
Use code with caution.
Markdown
product-dashboard/
├── index.html # Main HTML entry point (moved to root for Vite)
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── common/ # Common shared components (Layout, LoadingSpinner, ErrorMessage)
│ │ ├── ProductCard.jsx # Individual product display card
│ │ ├── ProductCard.css
│ │ ├── ProductGrid.jsx # Grid container for product cards
│ │ ├── ProductGrid.css
│ │ ├── SearchBar.jsx # Search input component
│ │ ├── SearchBar.css
│ │ ├── FilterBar.jsx # Category and sort filter controls
│ │ ├── FilterBar.css
│ │ ├── Navbar.jsx # Main navigation bar
│ │ └── Navbar.css
│ ├── pages/ # Page-level components
│ │ ├── ProductListing.jsx
│ │ ├── ProductListing.css
│ │ ├── ProductDetail.jsx
│ │ ├── ProductDetail.css
│ │ ├── Favorites.jsx
│ │ └── Favorites.css
│ ├── redux/ # Redux store configuration and state slices
│ │ ├── store.js # Redux store setup
│ │ ├── slices/ # Individual state slices (products, favorites, filters)
│ │ │ ├── productsSlice.js
│ │ │ ├── favoritesSlice.js
│ │ │ └── filtersSlice.js
│ │ └── selectors/ # Memoized selectors for deriving data from the store
│ │ └── productSelectors.js
│ ├── utils/ # Utility functions and helpers
│ │ ├── api.js # Axios API client for Fake Store API
│ │ └── debounce.js # Custom debounce hook and utility
│ ├── styles/ # Global styles
│ │ └── globals.css
│ ├── tests/ # Test files, mirroring src structure
│ │ ├── components/
│ │ │ └── ProductCard.test.jsx
│ │ ├── redux/
│ │ │ └── productsSlice.test.js
│ │ └── integration/
│ │ └── ProductFlow.test.jsx
│ ├── App.jsx # Root React component with routing setup
│ ├── App.css
│ ├── index.jsx # React application entry point (renders App)
│ └── setupTests.js # Vitest setup file (e.g., for jest-dom matchers)
├── package.json
├── vite.config.js # Vite build and development server configuration
├── README.md
└── .gitignore
## 🎨 Design Decisions

1.  **Redux Toolkit**: Chosen for its efficient and modern approach to Redux, significantly reducing boilerplate and simplifying state management logic.
2.  **Functional Components & Hooks**: All components are functional, leveraging React Hooks for state, lifecycle management, and side effects, leading to cleaner and more composable code.
3.  **CSS Variables**: Utilized for theming (colors, spacing, shadows) and maintaining consistency across the application, making style adjustments easier.
4.  **Debounced Search**: Implemented to optimize performance by delaying search API calls (or filtering logic) until the user has stopped typing, preventing excessive re-renders or requests.
5.  **Responsive Grid**: CSS Grid is used for the product listing, allowing for a flexible and adaptive layout that adjusts to different screen sizes.
6.  **Lazy Loading**: Native HTML `loading="lazy"` attribute is used for product images to improve initial page load performance by deferring the loading of off-screen images.
7.  **Test-Driven Approach**: Prioritized writing comprehensive unit and integration tests to ensure application stability and correctness.

## 🔧 Configuration

The project is configured with:
-   **Vite**: For a fast development experience and optimized production builds.
-   **Vitest**: As the testing framework, offering a Jest-compatible API and fast execution.
-   **Testing Library (React)**: For writing tests that interact with components in a user-centric way.
-   **ESLint**: For static code analysis and enforcing code style (can be further customized via `.eslintrc` if needed).

## 🚀 Deployment

The application is a static build and can be deployed to any static hosting service. The build output is in the `dist` folder.

### Vercel
1.  Ensure your project is connected to a Git repository (e.g., GitHub).
2.  Import your project into Vercel.
3.  Configure build settings (usually auto-detected for Vite):
    *   Build command: `npm run build`
    *   Output directory: `dist`
4.  Deploy.

### Netlify
1.  Ensure your project is connected to a Git repository.
2.  Create a new site from Git in Netlify.
3.  Configure build settings:
    *   Build command: `npm run build`
    *   Publish directory: `dist`
4.  Deploy.

### GitHub Pages
1.  Build the application:
    ```bash
    npm run build
    ```
2.  Deploy the contents of the `dist` folder to your `gh-pages` branch or configure GitHub Actions for automated deployment. (Refer to Vite's documentation for specific GitHub Pages deployment steps).

## 📝 API

This application uses the [Fake Store API](https://fakestoreapi.com) for product data:
-   `GET /products` - Fetch all products
-   `GET /products/:id` - Fetch a single product by its ID
-   `GET /products/categories` - Fetch all available product categories

## 🤝 Contributing

Contributions are welcome!

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/YourAmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/YourAmazingFeature`).
5.  Open a Pull Request.

## 📜 Copyright and License

This project is open source and generally available under the MIT License (see below).

**Copyright © 2024 [Your Name or Your GitHub Username]. All Rights Reserved.**

The content of this repository, including all source code, documentation, and assets, is the intellectual property of [Your Name or Your GitHub Username].

**Usage Restrictions:**
This project is provided for demonstration, educational, and personal portfolio purposes. **No part of this project may be used for commercial purposes, incorporated into any business offerings, or otherwise exploited for financial gain without the express written consent of the copyright owner.**

Unauthorized commercial use, reproduction, or distribution of this project or any part thereof may result in legal action.

## 📄 License
Refer to the License File

## 🙏 Acknowledgments

-   [Fake Store API](https://fakestoreapi.com) for providing the sample product data.
-   The teams behind React, Redux Toolkit, Vite, and Vitest for their incredible tools and frameworks.

--------------------------------------------------------------Thank You----------------------------------------------------------

Built with ❤️ by Anurag using modern web technologies.
