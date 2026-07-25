import { render, screen } from '@testing-library/react'
import { ProductOrbit } from './ProductOrbit'

describe('ProductOrbit', () => {
  it('renders a decorative AI product motion without interactive controls', () => {
    render(<ProductOrbit />)

    expect(screen.getByLabelText('AI PRODUCT 动效')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText('PRODUCT')).toBeInTheDocument()
  })
})
