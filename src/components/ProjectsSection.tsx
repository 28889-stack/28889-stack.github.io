import { CalendarClock, Waypoints } from 'lucide-react'
import { projects } from '../data/portfolio'
import { ExpandableCollection } from './ExpandableCollection'

const icons = [CalendarClock, Waypoints]

export function ProjectsSection() {
  return (
    <section
      className="content-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-intro">
        <span className="section-index">02</span>
        <h2 id="projects-title">代表项目</h2>
        <p>独立产品与 Skill 实践</p>
      </div>
      <div className="section-content">
        <ExpandableCollection
          items={projects}
          icons={icons}
          gridClassName="card-grid card-grid--two"
        />
      </div>
    </section>
  )
}
