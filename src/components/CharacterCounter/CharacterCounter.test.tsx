import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CharacterCounter } from './CharacterCounter'

describe('CharacterCounter', () => {

  // Test 1 - renders with heading
  it('renders the Character Counter heading', () => {
    render(<CharacterCounter />)
    expect(screen.getByText('Character Counter')).toBeInTheDocument()
  })

  // Test 2 - renders textarea and initial stats of zero
  it('renders textarea and initial stats of zero', () => {
    render(<CharacterCounter />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    const zeros = screen.getAllByText('0')
    expect(zeros).toHaveLength(2)
  })

  // Test 3 - updates stats when user types
  it('updates character and word count when user types', async () => {
    render(<CharacterCounter />)
    const textarea = screen.getByRole('textbox')
    await userEvent.type(textarea, 'hello world')
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  // Test 4 - shows min words indicator when minWords prop provided
  it('shows min words indicator when minWords prop is provided', () => {
    render(<CharacterCounter minWords={10} />)
    expect(screen.getByText(/Min: 10 words/)).toBeInTheDocument()
  })

  // Test 5 - shows max words indicator when maxWords prop provided
  it('shows max words indicator when maxWords prop is provided', () => {
    render(<CharacterCounter maxWords={100} />)
    expect(screen.getByText(/Max: 100 words/)).toBeInTheDocument()
  })

})