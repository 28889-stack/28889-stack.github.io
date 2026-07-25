import { Mail } from 'lucide-react'
import { profile } from '../data/portfolio'

const navItems = [
  ['关于我', '#about'],
  ['实习经历', '#experience'],
  ['项目经历', '#projects'],
  ['核心能力', '#skills'],
] as const

export function Header() {
  return (
    <header className="site-header">
      <div className="container header__inner">
        <a className="brand" href="#about" aria-label="返回首页">
          董羽舒
        </a>

        <nav className="header__nav" aria-label="主导航">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="button button--small" href={`mailto:${profile.email}`}>
          <Mail size={16} aria-hidden="true" />
          发送邮件
        </a>
      </div>
    </header>
  )
}
