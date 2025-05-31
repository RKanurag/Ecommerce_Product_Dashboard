import React from 'react'
import Navbar from '../Navbar'

// Layout wrapper component for consistent page structure
// This way we don't need to repeat navbar on every page
const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      {/* Footer could go here if needed */}
    </div>
  )
}

export default Layout