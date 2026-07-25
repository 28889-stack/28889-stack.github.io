import { act, render, screen } from '@testing-library/react'
import { useSectionProgress } from './useSectionProgress'

let observerCallback: IntersectionObserverCallback

class ObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = []
  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn(() => [])
  unobserve = vi.fn()

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback
  }
}

function Harness() {
  const active = useSectionProgress(['experience', 'projects'])

  return (
    <>
      <section id="experience" />
      <section id="projects" />
      <output>{active}</output>
    </>
  )
}

describe('useSectionProgress', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('tracks the strongest visible section and reveals it once', () => {
    vi.stubGlobal('IntersectionObserver', ObserverMock)
    render(<Harness />)
    expect(screen.getByText('experience')).toBeInTheDocument()

    const projects = document.getElementById('projects')!
    act(() => {
      observerCallback(
        [
          {
            target: projects,
            isIntersecting: true,
            intersectionRatio: 0.7,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      )
    })

    expect(screen.getByText('projects')).toBeInTheDocument()
    expect(projects).toHaveClass('is-revealed')

    act(() => {
      observerCallback(
        [
          {
            target: projects,
            isIntersecting: false,
            intersectionRatio: 0,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      )
    })
    expect(projects).toHaveClass('is-revealed')
  })
})
