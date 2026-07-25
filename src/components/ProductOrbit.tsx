const particles = [
  [11, 24, 6, 0],
  [26, 14, 4, 70],
  [74, 18, 5, 130],
  [90, 35, 7, 210],
  [83, 73, 4, 300],
  [61, 84, 6, 380],
  [31, 79, 5, 460],
  [9, 63, 4, 540],
] as const

export function ProductOrbit() {
  return (
    <div className="product-orbit" role="img" aria-label="AI PRODUCT 动效">
      <span className="product-orbit__grid" aria-hidden="true" />
      <span className="product-orbit__ring product-orbit__ring--outer" aria-hidden="true" />
      <span className="product-orbit__ring product-orbit__ring--inner" aria-hidden="true" />
      <span className="product-orbit__core" aria-hidden="true">
        <strong>AI</strong>
        <small>PRODUCT</small>
      </span>
      {particles.map(([left, top, size, delay]) => (
        <span
          className="product-orbit__particle"
          key={`${left}-${top}`}
          style={{
            '--delay': `${delay}ms`,
            '--left': `${left}%`,
            '--size': `${size}px`,
            '--top': `${top}%`,
          } as CSSProperties}
          aria-hidden="true"
        />
      ))}
      <span className="product-orbit__caption" aria-hidden="true">
        <i />
        <small>IDEA → SYSTEM → EXPERIENCE</small>
      </span>
    </div>
  )
}
import type { CSSProperties } from 'react'
