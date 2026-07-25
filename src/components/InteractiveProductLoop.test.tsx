import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InteractiveProductLoop } from './InteractiveProductLoop'

describe('InteractiveProductLoop', () => {
  it('selects evidence with an accessible pressed state', async () => {
    const user = userEvent.setup()
    const onSelectEvidence = vi.fn()

    render(
      <InteractiveProductLoop
        activeEvidence="eval"
        selectedEvidence="eval"
        onSelectEvidence={onSelectEvidence}
        onPreviewEvidence={() => undefined}
      />,
    )

    const model = screen.getByRole('button', { name: /MODEL/ })
    expect(model).toHaveAttribute('aria-pressed', 'false')
    await user.click(model)
    expect(onSelectEvidence).toHaveBeenCalledWith('model')
  })

  it('previews evidence on focus and clears the preview on blur', async () => {
    const user = userEvent.setup()
    const onPreviewEvidence = vi.fn()

    render(
      <InteractiveProductLoop
        activeEvidence="eval"
        selectedEvidence="eval"
        onSelectEvidence={() => undefined}
        onPreviewEvidence={onPreviewEvidence}
      />,
    )

    const userNode = screen.getByRole('button', { name: /USER/ })
    await user.tab()
    expect(userNode).toHaveFocus()
    expect(onPreviewEvidence).toHaveBeenCalledWith('user')
    await user.tab()
    expect(onPreviewEvidence).toHaveBeenCalledWith(null)
  })
})
