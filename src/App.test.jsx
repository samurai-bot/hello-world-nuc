import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders hello world heading', () => {
    render(<App />)
    expect(screen.getByText(/Hello World!/i)).toBeInTheDocument()
  })

  it('renders initial count as 0', () => {
    render(<App />)
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()
  })

  it('increments counter when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /increment counter/i })
    await user.click(button)

    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()
  })

  it('resets counter when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Increment counter first
    const incrementButton = screen.getByRole('button', { name: /increment counter/i })
    await user.click(incrementButton)
    await user.click(incrementButton)

    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument()

    // Then reset
    const resetButton = screen.getByRole('button', { name: /reset counter/i })
    await user.click(resetButton)

    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()
  })

  it('disables reset button when count is 0', () => {
    render(<App />)
    const resetButton = screen.getByRole('button', { name: /reset counter/i })
    expect(resetButton).toBeDisabled()
  })

  it('enables reset button when count is greater than 0', async () => {
    const user = userEvent.setup()
    render(<App />)

    const resetButton = screen.getByRole('button', { name: /reset counter/i })
    const incrementButton = screen.getByRole('button', { name: /increment counter/i })

    expect(resetButton).toBeDisabled()

    await user.click(incrementButton)

    expect(resetButton).toBeEnabled()
  })

  it('displays version information', () => {
    render(<App />)
    expect(screen.getByText(/Version:/i)).toBeInTheDocument()
  })

  it('displays server information', () => {
    render(<App />)
    expect(screen.getByText(/Server: NUC \(local network\)/i)).toBeInTheDocument()
  })
})
