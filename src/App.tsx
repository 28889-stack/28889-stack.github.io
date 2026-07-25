import { DomainExperienceSection } from './components/DomainExperienceSection'
import { ExperienceSection } from './components/ExperienceSection'
import { PortfolioIntro } from './components/PortfolioIntro'
import { ProfileSidebar } from './components/ProfileSidebar'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'

export default function App() {
  return (
    <div className="portfolio-shell">
      <ProfileSidebar />
      <main className="portfolio-main">
        <PortfolioIntro />
        <ExperienceSection />
        <ProjectsSection />
        <DomainExperienceSection />
        <SkillsSection />
        <footer className="simple-footer">© 2026 董羽舒</footer>
      </main>
    </div>
  )
}
