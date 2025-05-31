// Custom debounce hook for search optimization
// This prevents too many API calls while user is typing
import { useEffect, useState } from 'react'

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    // Clean up the timeout if value changes before delay
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

// Alternative: Simple debounce function for non-hook usage
export const debounce = (func, delay) => {
  let timeoutId
  
  return (...args) => {
    // Clear previous timeout if it exists
    clearTimeout(timeoutId)
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}