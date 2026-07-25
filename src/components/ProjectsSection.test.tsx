import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsSection } from './ProjectsSection'

describe('ProjectsSection', () => {
  it('keeps runtime details hidden until a project is opened', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    expect(screen.queryByText('SIMULATED RUN')).not.toBeInTheDocument()
    const voice = screen.getByRole('button', { name: '展开语音日程项目' })
    expect(voice).toHaveAttribute('aria-expanded', 'false')

    await user.click(voice)
    expect(screen.getByText('SIMULATED RUN')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '收起语音日程项目' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('allows only one project detail panel at a time', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    await user.click(
      screen.getByRole('button', { name: '展开语音日程项目' }),
    )
    expect(screen.getByText(/把下午三点的访谈/)).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: '展开Web Spider Skill项目',
      }),
    )
    expect(screen.queryByText(/把下午三点的访谈/)).not.toBeInTheDocument()
    expect(screen.getByText(/提取目标站点公开页面/)).toBeInTheDocument()
  })
})
