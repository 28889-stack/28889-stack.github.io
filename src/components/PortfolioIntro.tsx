import { Blocks, Sparkles } from 'lucide-react'
import { profile } from '../data/portfolio'

export function PortfolioIntro() {
  return (
    <section className="portfolio-intro" aria-labelledby="intro-title">
      <div className="eyebrow">
        <Sparkles size={15} strokeWidth={1.8} aria-hidden="true" />
        AI PRODUCT MANAGER
      </div>
      <h2 id="intro-title">{profile.headline}</h2>
      <p>{profile.summary}</p>
      <div className="focus-line">
        <Blocks size={17} strokeWidth={1.8} aria-hidden="true" />
        <span>将模型能力组织成可评测、可迭代、可落地的产品系统</span>
      </div>
    </section>
  )
}
