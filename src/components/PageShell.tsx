import type { ReactNode } from 'react'
import '../page.css'

export function PageShell({
  children,
  wide = false,
}: {
  children: ReactNode
  wide?: boolean
}) {
  return (
    <article className={wide ? 'page page--wide' : 'page'}>
      <span className="page__rule" aria-hidden="true" />
      <div className="page__inner">{children}</div>
    </article>
  )
}
