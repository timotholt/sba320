const ErrorMessage = ({ error }) => {
  return (
    <div className="error-container">
      <span className="error-icon">!</span>
      <p className="error-message">{error}</p>
    </div>
  )
}

export default ErrorMessage
