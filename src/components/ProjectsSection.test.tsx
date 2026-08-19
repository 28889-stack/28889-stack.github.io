import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsSection } from './ProjectsSection'

describe('ProjectsSection split-screen', () => {
  it('shows the selected project stage immediately (no expand-below-grid)', () => {
    render(<ProjectsSection />)

    // default selection = first project (xianyue): architecture + example visible
    expect(screen.getByText('系统架构')).toBeInTheDocument()
    expect(screen.getByText(/对某公司进行个股深度研究/)).toBeInTheDocument()
    // exactly one stage is rendered
    expect(screen.getAllByText('系统架构')).toHaveLength(1)
  })

  it('switches the right-hand stage when an index item is selected', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    await user.click(
      screen.getByRole('button', { name: /语音日程/ }),
    )

    // voice-schedule's stage swaps in after the slide transition
    await waitFor(() =>
      expect(screen.getByText(/把下午三点的访谈/)).toBeInTheDocument(),
    )
    expect(screen.getAllByText('语音日程').length).toBeGreaterThan(0)

    // previously selected project content is gone
    await waitFor(() =>
      expect(
        screen.queryByText(/对某公司进行个股深度研究/),
      ).not.toBeInTheDocument(),
    )
  })
})
