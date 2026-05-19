import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/common/ErrorBoundary'
import './index.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
  // If root element is missing, log and create a fallback mount
  console.error('Root element not found: #root')
} else {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
}
