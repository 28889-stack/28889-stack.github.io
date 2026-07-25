import { act, render, screen } from '@testing-library/react'
import { OpeningSequence } from './OpeningSequence'

describe('OpeningSequence', () => {
  it('finishes the opening sequence after its configured duration', () => {
    vi.useFakeTimers()
    const onComplete = vi.fn()
    render(<OpeningSequence onComplete={onComplete} />)

    expect(screen.getByLabelText('页面开场动画')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1050))
    expect(onComplete).toHaveBeenCalledOnce()

    vi.useRealTimers()
  })
})
