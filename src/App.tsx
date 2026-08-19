import { useCallback, useState } from 'react'
import { ExperiencePage } from './pages/ExperiencePage'
import { PortfolioIntro } from './components/PortfolioIntro'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { TopNav } from './components/TopNav'
import { OpeningSequence } from './components/OpeningSequence'

// One continuous document: the nav highlights the active section via scroll-spy
// and anchor links scroll smoothly. The user stays in control — no full-page
// wheel hijacking, no one-wheel-step = one-page flipping.
//
// On first load the OpeningSequence plays a short "refresh" sweep; while it runs
// the content sits blurred (`.is-intro-pending`) and sharpens in once it ends.
// The overlay is unmounted on completion so it never blocks the page.
export default function App() {
  const [showOpening, setShowOpening] = useState(true)
  const [introPending, setIntroPending] = useState(true)

  const handleOpeningComplete = useCallback(() => {
    setShowOpening(false)
    setIntroPending(false)
  }, [])

  return (
    <>
      {showOpening && <OpeningSequence onComplete={handleOpeningComplete} />}
      <TopNav />
      <div className={`portfolio-shell${introPending ? ' is-intro-pending' : ''}`}>
        <main className="pf-main">
          <PortfolioIntro />
          <SkillsSection />
          <ExperiencePage />
          <ProjectsSection />
        </main>
      </div>
    </>
  )
}
