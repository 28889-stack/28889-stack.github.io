import {
  Check,
  ChevronDown,
  Radio,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
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
    <article
      className={`project-case${index % 2 ? ' project-case--reverse' : ''}${
        isOpen ? ' is-open' : ''
      }`}
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
        <button
          type="button"
          className="project-case__toggle"
          aria-expanded={isOpen}
          aria-controls={`${project.id}-details`}
          aria-label={`${isOpen ? '收起' : '展开'}${project.title}详情`}
          onClick={onToggle}
        >
          {isOpen ? '收起技术说明' : '查看技术说明'}
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="runtime-console">
        <div className="runtime-console__bar">
          <span className="runtime-console__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>PROJECT RUN</span>
          <span className="runtime-console__status">
            <Radio size={10} aria-hidden="true" />
            READY
          </span>
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
          <div className="runtime-tools">
            <span>TOOL CALLS</span>
            <div>
              {project.runtime.tools.map((tool) => (
                <span key={tool}>
                  <Check size={10} strokeWidth={2.2} aria-hidden="true" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="runtime-guardrail">
            <ShieldCheck size={13} strokeWidth={1.8} aria-hidden="true" />
            <span>{project.runtime.guardrail}</span>
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

      {isOpen && (
        <div className="project-case__details" id={`${project.id}-details`}>
          <div className="project-case__details-title">
            <span>ARCHITECTURE NOTES</span>
            <h4>技术架构与产品决策</h4>
          </div>
          <div className="project-case__details-grid">
            {project.details.map((detail, detailIndex) => {
              const [label, content] = detail.split('：')
              return (
                <div key={detail}>
                  <span>0{detailIndex + 1}</span>
                  <strong>{label}</strong>
                  <p>{content ?? detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}
