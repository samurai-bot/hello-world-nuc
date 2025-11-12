import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset all mocks
    vi.clearAllMocks()
  })

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

  it('decrements counter when decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment counter/i })
    const decrementButton = screen.getByRole('button', { name: /decrement counter/i })

    // Increment to 3
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    expect(screen.getByText(/Count: 3/i)).toBeInTheDocument()

    // Decrement to 2
    await user.click(decrementButton)
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument()
  })

  it('does not decrement below 0', () => {
    render(<App />)

    const decrementButton = screen.getByRole('button', { name: /decrement counter/i })

    // Try to decrement when count is 0
    expect(decrementButton).toBeDisabled()
  })

  it('disables decrement button when count is 0', () => {
    render(<App />)
    const decrementButton = screen.getByRole('button', { name: /decrement counter/i })
    expect(decrementButton).toBeDisabled()
  })

  it('enables decrement button when count is greater than 0', async () => {
    const user = userEvent.setup()
    render(<App />)

    const decrementButton = screen.getByRole('button', { name: /decrement counter/i })
    const incrementButton = screen.getByRole('button', { name: /increment counter/i })

    expect(decrementButton).toBeDisabled()

    await user.click(incrementButton)

    expect(decrementButton).toBeEnabled()
  })

  it('increments counter with arrow up key', () => {
    render(<App />)

    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'ArrowUp' })

    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()
  })

  it('increments counter with + key', () => {
    render(<App />)

    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()

    fireEvent.keyDown(window, { key: '+' })

    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()
  })

  it('decrements counter with arrow down key', () => {
    render(<App />)

    // First increment
    fireEvent.keyDown(window, { key: 'ArrowUp' })
    fireEvent.keyDown(window, { key: 'ArrowUp' })
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument()

    // Then decrement
    fireEvent.keyDown(window, { key: 'ArrowDown' })
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()
  })

  it('decrements counter with - key', () => {
    render(<App />)

    // First increment
    fireEvent.keyDown(window, { key: '+' })
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()

    // Then decrement
    fireEvent.keyDown(window, { key: '-' })
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()
  })

  it('resets counter with r key', () => {
    render(<App />)

    // Increment counter
    fireEvent.keyDown(window, { key: '+' })
    fireEvent.keyDown(window, { key: '+' })
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument()

    // Reset with 'r'
    fireEvent.keyDown(window, { key: 'r' })
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()
  })

  it('resets counter with R key (uppercase)', () => {
    render(<App />)

    // Increment counter
    fireEvent.keyDown(window, { key: '+' })
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument()

    // Reset with 'R'
    fireEvent.keyDown(window, { key: 'R' })
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument()
  })

  it('displays keyboard shortcut hint', () => {
    render(<App />)
    expect(screen.getByText(/Tip: Use/i)).toBeInTheDocument()
  })

  it('saves count to localStorage when count changes', async () => {
    const user = userEvent.setup()
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment counter/i })
    await user.click(incrementButton)

    expect(setItemSpy).toHaveBeenCalledWith('hello-world-counter', '1')
  })

  it('loads count from localStorage on mount', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('5')

    render(<App />)

    expect(getItemSpy).toHaveBeenCalledWith('hello-world-counter')
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument()
  })
})
