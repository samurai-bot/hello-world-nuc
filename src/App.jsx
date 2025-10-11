import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => setCount(count + 1)
  const handleReset = () => setCount(0)

  return (
    <div className="container">
      <div className="card">
        <h1>👋 Hello World!</h1>
        <p className="subtitle">
          Built with Claude & deployed to my NUC
        </p>

        <div className="counter-section">
          <div className="button-group">
            <button
              onClick={handleIncrement}
              className="counter-button"
              aria-label="Increment counter"
            >
              Click me! 🚀
            </button>
            <button
              onClick={handleReset}
              className="counter-button reset-button"
              aria-label="Reset counter"
              disabled={count === 0}
            >
              Reset
            </button>
          </div>
          <p className="count" role="status" aria-live="polite">
            Count: {count}
          </p>
        </div>

        <hr className="divider" />

        <div className="info">
          <p>Served from: <code>/</code></p>
          <p>Server: NUC (local network)</p>
          <p>Version: <code>{import.meta.env.VITE_APP_VERSION || '1.0.0'}</code></p>
        </div>
      </div>
    </div>
  )
}

export default App
