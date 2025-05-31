import React from 'react'

// Error message component for handling error states gracefully
const ErrorMessage = ({ error, retry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-message">{error || 'An unexpected error occurred'}</p>
      {retry && (
        <button onClick={retry} className="btn btn-primary">
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage