import { Fragment, useState } from 'react'
import type { Project } from '../types/portfolio'

interface ProjectStageProps {
  project: Project
  panelId: string
  index: number
  transition?: 'in' | 'out'
}

export function ProjectStage({ project, panelId, index, transition = 'in' }: ProjectStageProps) {
  const framework = project.framework
  const primaryStack = project.runtime.tools[0]
  const [activeReport, setActiveReport] = useState<'technical' | 'fundamental' | null>(null)

  return (
    <article
      className={`project-stage ${transition === 'out' ? 'is-leaving' : 'is-entering'}`}
      id={panelId}
    >
      <header className="stage-head">
        <span className="stage-head__index">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="stage-head__main">
          <h3 className="stage-head__title">{project.title}</h3>
          <p className="stage-head__sub">{project.subtitle}</p>
        </div>
        <span className="stage-head__tag">{primaryStack}</span>
      </header>

      {project.link && (
        <a className="stage-visit" href={project.link} target="_blank" rel="noreferrer">
          <strong>访问链接</strong>
          <span className="stage-visit__arrow" aria-hidden="true">↗</span>
        </a>
      )}
      {project.inviteCode && (
        <span className="stage-invite">邀请码 {project.inviteCode}</span>
      )}
      {project.reports && (
        <section className="stage-report" aria-label="报告示例">
          <div className="report-head"><i>报告示例</i></div>
          <div className="report-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeReport === 'technical'}
              className={`report-tab ${activeReport === 'technical' ? 'is-active' : ''}`}
              onClick={() => setActiveReport(activeReport === 'technical' ? null : 'technical')}
            >
              技术面
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeReport === 'fundamental'}
              className={`report-tab ${activeReport === 'fundamental' ? 'is-active' : ''}`}
              onClick={() => setActiveReport(activeReport === 'fundamental' ? null : 'fundamental')}
            >
              基本面
            </button>
            {activeReport && (
              <a
                className="report-open"
                href={project.reports[activeReport]}
                target="_blank"
                rel="noreferrer"
              >
                新标签打开 ↗
              </a>
            )}
          </div>
          {activeReport && (
            <iframe
              className="report-frame"
              src={project.reports[activeReport]}
              title={`${project.title}报告 - ${activeReport === 'technical' ? '技术面' : '基本面'}`}
            />
          )}
        </section>
      )}

      <section className="stage-section stage-section--arch" aria-label={`${project.title}系统架构`}>
        <div className="canvas-label">
          <span>01</span>
          <em>Architecture</em>
          <i>系统架构</i>
        </div>

        {framework ? (
          <div className="framework-diagram">
            <div className="framework-stage">
              <div className="framework-orch">
                <span className="framework-orch__node">
                  {framework.orchestrator}
                </span>
              </div>
              <span className="framework-feed" aria-hidden="true" />

              <div className="framework-branches">
                {framework.branches.map((branch, branchIndex) => (
                  <Fragment key={branch.title}>
                    <div className="framework-branch">
                      <div className="framework-branch__head">
                        {branch.title}
                      </div>
                      <div className="framework-branch__chain">
                        {branch.steps.map((step, stepIndex) => (
                          <div
                            className="framework-step-wrap"
                            key={step.label}
                          >
                            <span className="framework-step">
                              <strong>{step.label}</strong>
                              {step.description && (
                                <small>{step.description}</small>
                              )}
                            </span>
                            {stepIndex < branch.steps.length - 1 && (
                              <span
                                className="framework-chain-beam"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    {branchIndex < framework.branches.length - 1 && (
                      <span
                        className={
                          framework.mode === 'parallel'
                            ? 'framework-parallel'
                            : 'framework-or'
                        }
                        aria-hidden="true"
                      >
                        {framework.mode === 'parallel' ? '＋' : '或'}
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>

              <span className="framework-feed" aria-hidden="true" />
              <div className="framework-converge">
                <span className="framework-converge__node">
                  {framework.convergence}
                </span>
              </div>

              <span className="framework-feed" aria-hidden="true" />
              <div className="framework-downstream">
                {framework.downstream.map((step, stepIndex) => (
                  <Fragment key={step.label}>
                    <span className="framework-step">
                      <strong>{step.label}</strong>
                      {step.description && <small>{step.description}</small>}
                    </span>
                    {stepIndex < framework.downstream.length - 1 && (
                      <span className="framework-beam-h" aria-hidden="true" />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="canvas-arch" aria-label={`${project.title}系统架构`}>
            {project.architecture.map((node, nodeIndex) => (
              <Fragment key={node.label}>
                <div className="canvas-arch__node">
                  <strong>{node.label}</strong>
                  <small>{node.description}</small>
                </div>
                {nodeIndex < project.architecture.length - 1 && (
                  <span className="canvas-arch__beam" aria-hidden="true" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </section>

      <section className="stage-section" aria-label="使用示例">
        <div className="canvas-label">
          <span>02</span>
          <em>Example</em>
          <i>使用示例</i>
        </div>
        <div className="canvas-usage">
          <div className="canvas-usage__step">
            <span>USER INPUT</span>
            <p>{project.runtime.input}</p>
          </div>
          <span className="canvas-usage__beam" aria-hidden="true" />
          <div className="canvas-usage__step">
            <span>INTERPRETATION</span>
            <p>
              <code>{project.runtime.route}</code>
            </p>
          </div>
          <span className="canvas-usage__beam" aria-hidden="true" />
          <div className="canvas-usage__step canvas-usage__step--output">
            <span>OUTPUT</span>
            <p>{project.runtime.output}</p>
          </div>
        </div>
      </section>

      <section className="stage-section stage-section--last" aria-label="系统组件">
        <div className="canvas-label">
          <span>03</span>
          <em>Components</em>
          <i>系统组件</i>
        </div>
        <div className="canvas-components">
          {project.components.slice(0, 4).map((component, ci) => (
            <div className="canvas-comp" key={component.label}>
              <span className="canvas-comp__num">
                {String(ci + 1).padStart(2, '0')}
              </span>
              <strong className="canvas-comp__label">
                {component.label}
              </strong>
              <p className="canvas-comp__desc">{component.description}</p>
            </div>
          ))}
        </div>
      </section>

    </article>
  )
}
