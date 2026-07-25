import { render, screen } from '@testing-library/react'
import { ProductOrbit } from './ProductOrbit'

describe('ProductOrbit', () => {
  it('renders USER, MODEL, and EVAL as non-interactive product layers', () => {
    render(<ProductOrbit />)

    expect(screen.getByLabelText('AI PRODUCT 动效')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText('PRODUCT')).toBeInTheDocument()
    expect(screen.getByText('USER')).toBeInTheDocument()
    expect(screen.getByText('MODEL')).toBeInTheDocument()
    expect(screen.getByText('EVAL')).toBeInTheDocument()
  })
})
