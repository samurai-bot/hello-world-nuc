import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [theme, setTheme] = useState('theme-purple')
  const [showGame, setShowGame] = useState(false)
  const [activeGame, setActiveGame] = useState('speed')

  // Click Speed Game State
  const [speedClicks, setSpeedClicks] = useState(0)
  const [speedGameActive, setSpeedGameActive] = useState(false)
  const [speedTime, setSpeedTime] = useState(0)
  const [speedBestTime, setSpeedBestTime] = useState(null)

  // Number Guessing Game State
  const [targetNumber, setTargetNumber] = useState(null)
  const [guessInput, setGuessInput] = useState('')
  const [guessAttempts, setGuessAttempts] = useState(0)
  const [guessHint, setGuessHint] = useState('')
  const [guessWon, setGuessWon] = useState(false)

  // Apply dark mode and theme to body
  useEffect(() => {
    const body = document.body
    if (isDarkMode) {
      body.classList.add('dark-mode')
    } else {
      body.classList.remove('dark-mode')
    }

    // Remove all theme classes
    body.classList.remove('theme-purple', 'theme-ocean', 'theme-sunset', 'theme-forest', 'theme-minimal')
    body.classList.add(theme)
  }, [isDarkMode, theme])

  // Speed Game Timer
  useEffect(() => {
    let interval
    if (speedGameActive) {
      interval = setInterval(() => {
        setSpeedTime(prev => prev + 10)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [speedGameActive])

  // Speed Game Logic
  useEffect(() => {
    if (speedClicks >= 10 && speedGameActive) {
      setSpeedGameActive(false)
      if (!speedBestTime || speedTime < speedBestTime) {
        setSpeedBestTime(speedTime)
      }
    }
  }, [speedClicks, speedGameActive, speedTime, speedBestTime])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value)
  }

  const startSpeedGame = () => {
    setSpeedClicks(0)
    setSpeedTime(0)
    setSpeedGameActive(true)
  }

  const handleSpeedClick = () => {
    if (speedGameActive) {
      setSpeedClicks(prev => prev + 1)
    }
  }

  const startGuessGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuessInput('')
    setGuessAttempts(0)
    setGuessHint('I\'m thinking of a number between 1 and 100...')
    setGuessWon(false)
  }

  const handleGuess = () => {
    const guess = parseInt(guessInput)
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setGuessHint('Please enter a valid number between 1 and 100')
      return
    }

    const newAttempts = guessAttempts + 1
    setGuessAttempts(newAttempts)

    if (guess === targetNumber) {
      setGuessHint(`Correct! You got it in ${newAttempts} attempt${newAttempts > 1 ? 's' : ''}!`)
      setGuessWon(true)
    } else if (guess < targetNumber) {
      setGuessHint('Too low! Try a higher number.')
    } else {
      setGuessHint('Too high! Try a lower number.')
    }
    setGuessInput('')
  }

  const handleIncrement = () => setCount(count + 1)
  const handleReset = () => setCount(0)

  return (
    <div className="container">
      <div className="card">
        <div className="controls">
          <button
            onClick={toggleDarkMode}
            className="dark-mode-toggle"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <select
            value={theme}
            onChange={handleThemeChange}
            className="theme-selector"
          >
            <option value="theme-purple">Purple</option>
            <option value="theme-ocean">Ocean</option>
            <option value="theme-sunset">Sunset</option>
            <option value="theme-forest">Forest</option>
            <option value="theme-minimal">Minimal</option>
          </select>
        </div>

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

        <button
          onClick={() => setShowGame(true)}
          className="game-button"
        >
          Play Mini Games 🎮
        </button>

        <hr className="divider" />

        <div className="info">
          <p>Served from: <code>/</code></p>
          <p>Server: NUC (local network)</p>
          <p>Version: <code>{import.meta.env.VITE_APP_VERSION || '1.0.0'}</code></p>
        </div>
      </div>

      {showGame && (
        <div className="game-modal" onClick={() => setShowGame(false)}>
          <div className="game-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="game-close"
              onClick={() => setShowGame(false)}
            >
              ×
            </button>

            <div className="game-tabs">
              <button
                className={`game-tab ${activeGame === 'speed' ? 'active' : ''}`}
                onClick={() => setActiveGame('speed')}
              >
                Click Speed
              </button>
              <button
                className={`game-tab ${activeGame === 'guess' ? 'active' : ''}`}
                onClick={() => setActiveGame('guess')}
              >
                Number Guess
              </button>
            </div>

            {activeGame === 'speed' && (
              <div className="game-area">
                <h2>Click Speed Challenge</h2>
                <p>Click the button 10 times as fast as you can!</p>

                <div className="score">
                  {speedClicks}/10 clicks
                </div>

                {speedGameActive ? (
                  <>
                    <p>Time: {(speedTime / 1000).toFixed(2)}s</p>
                    <button onClick={handleSpeedClick}>
                      CLICK ME! 🚀
                    </button>
                  </>
                ) : (
                  <>
                    {speedClicks === 10 && (
                      <p>Completed in: {(speedTime / 1000).toFixed(2)}s</p>
                    )}
                    {speedBestTime && (
                      <p>Best Time: {(speedBestTime / 1000).toFixed(2)}s</p>
                    )}
                    <button onClick={startSpeedGame}>
                      Start Game
                    </button>
                  </>
                )}
              </div>
            )}

            {activeGame === 'guess' && (
              <div className="game-area">
                <h2>Number Guessing Game</h2>

                {!targetNumber ? (
                  <>
                    <p>Try to guess the secret number between 1 and 100!</p>
                    <button onClick={startGuessGame}>
                      Start Game
                    </button>
                  </>
                ) : (
                  <>
                    <p className="hint">{guessHint}</p>
                    <p>Attempts: {guessAttempts}</p>

                    {!guessWon && (
                      <>
                        <input
                          type="number"
                          value={guessInput}
                          onChange={(e) => setGuessInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                          placeholder="Enter guess"
                          min="1"
                          max="100"
                        />
                        <button onClick={handleGuess}>
                          Guess
                        </button>
                      </>
                    )}

                    <button onClick={startGuessGame}>
                      {guessWon ? 'Play Again' : 'New Game'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
