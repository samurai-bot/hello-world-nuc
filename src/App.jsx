import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'hello-world-counter'

function App() {
  // Load initial count from localStorage
  const [count, setCount] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved !== null ? parseInt(saved, 10) : 0
    } catch (error) {
      console.error('Failed to load count from localStorage:', error)
      return 0
    }
  })

  // Save count to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, count.toString())
    } catch (error) {
      console.error('Failed to save count to localStorage:', error)
    }
  }, [count])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      switch (e.key) {
        case 'ArrowUp':
        case '+':
          e.preventDefault()
          setCount(c => c + 1)
          break
        case 'ArrowDown':
        case '-':
          e.preventDefault()
          setCount(c => Math.max(0, c - 1))
          break
        case 'r':
        case 'R':
          e.preventDefault()
          setCount(0)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleIncrement = () => setCount(count + 1)
  const handleDecrement = () => setCount(Math.max(0, count - 1))
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
              onClick={handleDecrement}
              className="counter-button decrement-button"
              aria-label="Decrement counter"
              disabled={count === 0}
            >
              - Decrement
            </button>
            <button
              onClick={handleIncrement}
              className="counter-button"
              aria-label="Increment counter"
            >
              + Increment
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
          <p className="keyboard-hint">
            Tip: Use ↑/+ to increment, ↓/- to decrement, R to reset
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
