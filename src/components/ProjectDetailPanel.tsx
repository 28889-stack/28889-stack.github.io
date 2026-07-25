import type { Project } from '../types/portfolio'

interface ProjectDetailPanelProps {
  project: Project
  panelId: string
}

export function ProjectDetailPanel({
  project,
  panelId,
}: ProjectDetailPanelProps) {
  return (
    <article className="project-detail-panel" id={panelId}>
      <div className="runtime-console">
        <div className="runtime-console__bar">
          <span>SIMULATED RUN</span>
          <span>{project.title} · 结构演示</span>
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

      <div
        className="architecture-flow"
        aria-label={`${project.title}项目结构`}
      >
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
