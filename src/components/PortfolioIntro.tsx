import { profile } from '../data/portfolio'

export function PortfolioIntro() {
  return (
    <section className="portfolio-intro" aria-labelledby="intro-title">
      <div className="intro-meta">
        <span>AI PRODUCT MANAGER</span>
        <span>PORTFOLIO · 2026</span>
      </div>
      <h2
        id="intro-title"
        aria-label={`AI 产品经理｜${profile.headline}`}
      >
        <span>AI 产品经理</span>
        {profile.headline}
      </h2>
      <p>{profile.summary}</p>
    </section>
  )
}
