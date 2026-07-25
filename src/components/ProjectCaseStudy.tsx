import { type LucideIcon } from 'lucide-react'
import type { Project } from '../types/portfolio'

interface ProjectCaseStudyProps {
  project: Project
  index: number
  icon: LucideIcon
}

export function ProjectCaseStudy({
  project,
  index,
  icon: Icon,
}: ProjectCaseStudyProps) {
  return (
    <article
      className={`project-case${index % 2 ? ' project-case--reverse' : ''}`}
    >
      <div className="project-case__story">
        <div className="project-case__number">
          PROJECT / {String(index + 1).padStart(2, '0')}
        </div>
        <span className="project-case__icon" aria-hidden="true">
          <Icon size={21} strokeWidth={1.6} />
        </span>
        <h3>{project.title}</h3>
        <p className="project-case__subtitle">{project.subtitle}</p>
        <p className="project-case__summary">{project.summary}</p>
        <div className="project-case__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="runtime-console">
        <div className="runtime-console__bar">
          <span>SIMULATED RUN</span>
          <span>结构演示</span>
        </div>

        <div className="runtime-console__body">
          <div className="runtime-line">
            <span>INPUT</span>
            <p>{project.runtime.input}</p>
          </div>
          <div className="runtime-line runtime-line--route">
            <span>ROUTE</span>
            <code>{project.runtime.route}</code>
          </div>
          <div className="runtime-output">
            <span>OUTPUT</span>
            <p>{project.runtime.output}</p>
          </div>
        </div>
      </div>

      <div className="architecture-flow" aria-label={`${project.title}技术架构`}>
        {project.architecture.map((node, nodeIndex) => (
          <div className="architecture-flow__step" key={node.label}>
            <span className="architecture-flow__node">
              <strong>{node.label}</strong>
              <small>{node.description}</small>
            </span>
            {nodeIndex < project.architecture.length - 1 && (
              <span className="architecture-flow__beam" aria-hidden="true">
                <i />
              </span>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}
