import { ArrowDown, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'

export function Hero() {
  return (
    <section className="hero" id="about" aria-labelledby="profile-name">
      <div className="container hero__layout">
        <div className="hero__content">
          <div className="hero__identity">
            <h1 id="profile-name">{profile.name}</h1>
            <span>{profile.role}</span>
          </div>

          <h2 aria-label={profile.headline}>
            把复杂的 AI 能力，转化为清晰、可用的 <span>产品体验。</span>
          </h2>
          <p>{profile.summary}</p>

          <div className="hero__actions">
            <a className="button" href="#experience">
              查看实习经历
              <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href={`mailto:${profile.email}`}>
              <Mail size={17} aria-hidden="true" />
              发送邮件
            </a>
          </div>
        </div>

        <div className="hero-avatar" aria-hidden="true">
          <div className="hero-avatar__frame" />
          <span className="hero-avatar__node hero-avatar__node--one" />
          <span className="hero-avatar__node hero-avatar__node--two" />
          <span className="hero-avatar__node hero-avatar__node--three" />
          <div className="hero-avatar__label">
            <span>PRODUCT</span>
            <span>MODEL</span>
            <span>USER</span>
          </div>
        </div>
      </div>
    </section>
  )
}
