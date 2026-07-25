import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SkillToolPanel } from './SkillToolPanel'

describe('SkillToolPanel', () => {
  it('switches the simulated tool call', async () => {
    const user = userEvent.setup()
    render(<SkillToolPanel />)

    expect(screen.getByText('evaluate_ai_product()')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /Vibe Coding 开发/ }),
    )

    expect(screen.getByText('prototype_with_code()')).toBeInTheDocument()
    expect(screen.getByText('working prototype')).toBeInTheDocument()
  })
})
