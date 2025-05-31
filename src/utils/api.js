import axios from 'axios'

// Base URL for the Fake Store API
const API_BASE_URL = 'https://fakestoreapi.com'

// Creating an axios instance with default config
// This makes it easy to add auth headers or interceptors later if needed
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
})

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    // Better error handling for network issues
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products. Please check your connection.')
  }
}

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw new Error('Failed to fetch product details.')
  }
}

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories.')
  }
}

// Fetch products by category (not used in current implementation but good to have)
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    throw new Error('Failed to fetch products by category.')
  }
}