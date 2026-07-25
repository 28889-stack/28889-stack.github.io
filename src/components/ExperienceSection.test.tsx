import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExperienceSection } from './ExperienceSection'

describe('ExperienceSection evidence rail', () => {
  it('lights the selected sequence step before revealing its details', async () => {
    const user = userEvent.setup()
    render(<ExperienceSection />)

    const tencent = screen.getByTestId('experience-tencent')
    expect(tencent).not.toHaveClass('is-open')

    await user.click(screen.getByRole('button', { name: '展开腾讯详情' }))
    expect(tencent).toHaveClass('is-open')
    expect(tencent.querySelector('.experience-row__rail')).toHaveAttribute(
      'data-state',
      'active',
    )
    expect(screen.getByText(/建设“文字整理”训练集/)).toBeInTheDocument()
  })
})
