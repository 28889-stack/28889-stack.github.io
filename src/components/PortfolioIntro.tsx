import { profile } from '../data/portfolio'
import type { EvidenceKey } from '../types/portfolio'
import { InteractiveProductLoop } from './InteractiveProductLoop'

interface PortfolioIntroProps {
  activeEvidence: EvidenceKey
  selectedEvidence: EvidenceKey
  onSelectEvidence: (key: EvidenceKey) => void
  onPreviewEvidence: (key: EvidenceKey | null) => void
}

export function PortfolioIntro({
  activeEvidence,
  selectedEvidence,
  onSelectEvidence,
  onPreviewEvidence,
}: PortfolioIntroProps) {
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

      <InteractiveProductLoop
        activeEvidence={activeEvidence}
        selectedEvidence={selectedEvidence}
        onSelectEvidence={onSelectEvidence}
        onPreviewEvidence={onPreviewEvidence}
      />
    </section>
  )
}
