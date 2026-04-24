import { render, screen } from '@testing-library/react'
import { StatsDisplay } from './StatsDisplay'
import type { TextStats } from '../../types/index'

// sample stats object used across tests
const mockStats: TextStats = {
  characterCount: 100,
  wordCount: 20,
  readingTime: 0.1  // 20 words / 200 = 0.1 minutes = 0:06
}

describe('StatsDisplay', () => {

  // Test 1 - renders character and word counts
  it('renders character count and word count', () => {
    render(<StatsDisplay stats={mockStats} />)

    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  // Test 2 - renders reading time by default
  it('renders reading time when showReadingTime is true', () => {
    render(<StatsDisplay stats={mockStats} showReadingTime={true} />)

    expect(screen.getByText('Reading Time')).toBeInTheDocument()
    expect(screen.getByText('0:06')).toBeInTheDocument()
  })

  // Test 3 - hides reading time when showReadingTime is false
  it('hides reading time when showReadingTime is false', () => {
    render(<StatsDisplay stats={mockStats} showReadingTime={false} />)

    expect(screen.queryByText('Reading Time')).not.toBeInTheDocument()
  })

})