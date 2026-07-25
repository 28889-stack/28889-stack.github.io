import { useEffect, type CSSProperties } from 'react'

interface OpeningSequenceProps {
  onComplete: () => void
}

const particles = Array.from({ length: 38 }, (_, index) => ({
  delay: (index % 9) * 52,
  left: (index * 29) % 100,
  size: 3 + (index % 4) * 2,
  top: (index * 17) % 94,
}))

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const timeout = window.setTimeout(onComplete, reducedMotion ? 0 : 1050)

    return () => window.clearTimeout(timeout)
  }, [onComplete])

  return (
    <div className="opening-sequence" aria-label="页面开场动画" role="status">
      <div className="opening-sequence__particles" aria-hidden="true">
        {particles.map((particle, index) => (
          <i
            key={index}
            style={{
              '--delay': `${particle.delay}ms`,
              '--left': `${particle.left}%`,
              '--size': `${particle.size}px`,
              '--top': `${particle.top}%`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="opening-sequence__mark" aria-hidden="true">
        <span>Welcome！</span>
        <i />
        <small>PRODUCT PORTFOLIO</small>
      </div>
    </div>
  )
}
