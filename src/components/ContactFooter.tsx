import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'

export function ContactFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container contact-block">
        <div>
          <h2>联系我</h2>
          <p>如果你正在寻找关注 AI 产品落地、评测与工作流设计的产品经理，欢迎联系。</p>
        </div>
        <a className="contact-link" href={`mailto:${profile.email}`}>
          <Mail size={20} aria-hidden="true" />
          {profile.email}
        </a>
      </div>

      <div className="container footer-meta">
        <span>© 2026 董羽舒</span>
        <a href="#about">
          返回顶部
          <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
