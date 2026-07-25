import { ChevronDown, type LucideIcon } from 'lucide-react'
import type { Project } from '../types/portfolio'

interface ProjectCaseStudyProps {
  project: Project
  index: number
  icon: LucideIcon
  isOpen: boolean
  onToggle: () => void
}

export function ProjectCaseStudy({
  project,
  index,
  icon: Icon,
  isOpen,
  onToggle,
}: ProjectCaseStudyProps) {
  return (
    <article className={`project-case${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="project-case__trigger"
        aria-expanded={isOpen}
        aria-controls={`${project.id}-project-details`}
        aria-label={`${isOpen ? '收起' : '展开'}${project.title}项目`}
        onClick={onToggle}
      >
        <span className="project-case__number">
          PROJECT / {String(index + 1).padStart(2, '0')}
        </span>
        <span className="project-case__icon" aria-hidden="true">
          <Icon size={20} strokeWidth={1.6} />
        </span>
        <span className="project-case__heading">
          <strong>{project.title}</strong>
          <small>{project.subtitle}</small>
        </span>
        <span className="project-case__summary">{project.summary}</span>
        <span className="project-case__tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
        <span
          className="project-preview-flow"
          aria-label={`${project.title}结构预览`}
        >
          {project.architecture.slice(0, 3).map((node, nodeIndex) => (
            <span className="project-preview-flow__step" key={node.label}>
              <strong>{node.label}</strong>
              {nodeIndex < 2 && <i aria-hidden="true" />}
            </span>
          ))}
        </span>
        <ChevronDown
          className="project-case__chevron"
          size={17}
          aria-hidden="true"
        />
      </button>
    </article>
  )
}
