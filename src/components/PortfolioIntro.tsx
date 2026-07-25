import { profile } from '../data/portfolio'

export function PortfolioIntro() {
  return (
    <section className="portfolio-intro" aria-labelledby="intro-title">
      <div className="intro-copy">
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
      </div>

      <div className="product-system" aria-hidden="true">
        <span className="product-system__grid" />
        <span className="product-system__orbit product-system__orbit--one" />
        <span className="product-system__orbit product-system__orbit--two" />
        <span className="product-system__core">
          <strong>AI</strong>
          <small>PRODUCT</small>
        </span>
        <span className="product-system__node product-system__node--user">
          USER
        </span>
        <span className="product-system__node product-system__node--model">
          MODEL
        </span>
        <span className="product-system__node product-system__node--eval">
          EVAL
        </span>
      </div>
    </section>
  )
}
