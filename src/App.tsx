import { useState } from 'react'
import { DomainExperienceSection } from './components/DomainExperienceSection'
import { ExperienceSection } from './components/ExperienceSection'
import { PortfolioIntro } from './components/PortfolioIntro'
import { ProfileSidebar } from './components/ProfileSidebar'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { OpeningSequence } from './components/OpeningSequence'
import { useSectionProgress } from './hooks/useSectionProgress'

export default function App() {
  const [isOpening, setIsOpening] = useState(true)
  const activeSection = useSectionProgress([
    'experience',
    'projects',
    'domain-experience',
    'skills',
  ])

  return (
    <>
      {isOpening && <OpeningSequence onComplete={() => setIsOpening(false)} />}
      <div className={`portfolio-shell${isOpening ? ' is-intro-pending' : ''}`}>
        <ProfileSidebar />
        <main
          className="portfolio-main"
          data-active-section={activeSection}
        >
          <PortfolioIntro />
          <ExperienceSection />
          <ProjectsSection />
          <DomainExperienceSection />
          <SkillsSection />
          <footer className="simple-footer">© 2026 董羽舒</footer>
        </main>
      </div>
    </>
  )
}
