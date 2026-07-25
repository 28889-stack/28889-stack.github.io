import { CompoundBackground } from './components/CompoundBackground'
import { ContactFooter } from './components/ContactFooter'
import { ExperienceSection } from './components/ExperienceSection'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'

export default function App() {
  return (
    <>
      <div className="page-grid" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CompoundBackground />
      </main>
      <ContactFooter />
    </>
  )
}
