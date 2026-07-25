import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the AI product manager identity', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '董羽舒' })).toBeInTheDocument()
    expect(screen.getByText('AI 产品经理')).toBeInTheDocument()
  })
})
