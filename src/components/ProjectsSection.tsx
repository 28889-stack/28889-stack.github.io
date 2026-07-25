import { CalendarClock, Waypoints } from 'lucide-react'
import { projects } from '../data/portfolio'
import { ProjectCaseStudy } from './ProjectCaseStudy'

const icons = [CalendarClock, Waypoints]

export function ProjectsSection() {
  return (
    <section
      className="content-section projects-showcase-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-intro">
        <span className="section-index">02</span>
        <h2 id="projects-title">代表项目</h2>
        <p>独立产品与 Skill 实践</p>
      </div>
      <div className="section-content">
        <div className="project-showcase">
          {projects.map((project, index) => (
            <ProjectCaseStudy
              key={project.id}
              project={project}
              index={index}
              icon={icons[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
