import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextInput } from './TextInput'

// TextInput test suite
describe('TextInput', () => {

  // Test 1 - renders with placeholder text
  it('renders with placeholder text', () => {
    const mockOnTextChange = vi.fn()
    render(
      <TextInput
        onTextChange={mockOnTextChange}
        placeholder="Type something here"
      />
    )
    expect(
      screen.getByPlaceholderText('Type something here')
    ).toBeInTheDocument()
  })

  // Test 2 - calls onTextChange when user types
  it('calls onTextChange when user types', async () => {
    const mockOnTextChange = vi.fn()
    render(<TextInput onTextChange={mockOnTextChange} />)

    const textarea = screen.getByRole('textbox')
    await userEvent.type(textarea, 'hello')

    // onTextChange should have been called once per character
    expect(mockOnTextChange).toHaveBeenCalledTimes(5)
    // last call should have been with the full word
    expect(mockOnTextChange).toHaveBeenLastCalledWith('hello')
  })

})