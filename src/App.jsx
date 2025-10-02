import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <div className="card">
        <h1>👋 Hello World!</h1>
        <p className="subtitle">
          Built with Claude & deployed to my NUC
        </p>
        
        <div className="counter-section">
          <button 
            onClick={() => setCount(count + 1)}
            className="counter-button"
          >
            Click me! 🚀
          </button>
          <p className="count">Count: {count}</p>
        </div>

        <hr className="divider" />
        
        <div className="info">
          <p>Served from: <code>/</code></p>
          <p>Server: NUC (local network)</p>
          <p>Version: 1.0.0</p>
        </div>
      </div>
    </div>
  )
}

export default App
