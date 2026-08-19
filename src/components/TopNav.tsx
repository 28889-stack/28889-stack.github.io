import { useEffect, useState } from 'react'
import '../top-nav.css'

const links = [
  { id: 'top', href: '#top', label: '首页' },
  { id: 'skills', href: '#skills', label: '核心能力' },
  { id: 'experience', href: '#experience', label: '经历' },
  { id: 'projects', href: '#projects', label: '项目' },
]

export function TopNav() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null)

    if (!('IntersectionObserver' in window) || sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="top-nav" aria-label="页面导航">
      {links.map((link) => {
        const isActive = active === link.id
        return (
          <a
            key={link.id}
            className={isActive ? 'is-active' : undefined}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.label}
          </a>
        )
      })}
    </nav>
  )
}
