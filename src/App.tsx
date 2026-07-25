import { useState } from 'react'
import { DomainExperienceSection } from './components/DomainExperienceSection'
import { ExperienceSection } from './components/ExperienceSection'
import { PortfolioIntro } from './components/PortfolioIntro'
import { ProfileSidebar } from './components/ProfileSidebar'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import type { EvidenceKey } from './types/portfolio'

export default function App() {
  const [selectedEvidence, setSelectedEvidence] =
    useState<EvidenceKey>('eval')
  const [previewEvidence, setPreviewEvidence] =
    useState<EvidenceKey | null>(null)
  const activeEvidence = previewEvidence ?? selectedEvidence

  return (
    <div className="portfolio-shell">
      <ProfileSidebar />
      <main className="portfolio-main">
        <PortfolioIntro
          activeEvidence={activeEvidence}
          selectedEvidence={selectedEvidence}
          onSelectEvidence={setSelectedEvidence}
          onPreviewEvidence={setPreviewEvidence}
        />
        <ExperienceSection activeEvidence={activeEvidence} />
        <ProjectsSection />
        <DomainExperienceSection />
        <SkillsSection />
        <footer className="simple-footer">© 2026 董羽舒</footer>
      </main>
    </div>
  )
}
