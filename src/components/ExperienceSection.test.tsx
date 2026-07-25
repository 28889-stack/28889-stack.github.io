import { render, screen } from '@testing-library/react'
import { ExperienceSection } from './ExperienceSection'

describe('ExperienceSection evidence rail', () => {
  it('highlights the companies and tags mapped to the active evidence', () => {
    const { rerender } = render(<ExperienceSection activeEvidence="user" />)

    expect(screen.getByTestId('experience-tencent')).toHaveClass('is-evidence')
    expect(screen.getByTestId('experience-ths')).not.toHaveClass('is-evidence')

    rerender(<ExperienceSection activeEvidence="eval" />)
    expect(screen.getByTestId('experience-tencent')).toHaveClass('is-evidence')
    expect(screen.getByTestId('experience-ths')).toHaveClass('is-evidence')
    expect(screen.getByText('Badcase')).toHaveClass('is-evidence-tag')
  })
})
