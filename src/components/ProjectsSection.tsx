import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/portfolio'
import { ProjectStage } from './ProjectStage'

const SWAP_MS = 240

export function ProjectsSection() {
  const [selectedId, setSelectedId] = useState(projects[0].id)
  const [displayId, setDisplayId] = useState(projects[0].id)
  const [leaving, setLeaving] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleSelect = (id: string) => {
    if (id === selectedId) return
    setSelectedId(id)
    setLeaving(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setDisplayId(id)
      setLeaving(false)
    }, SWAP_MS)
  }

  const display = projects.find((p) => p.id === displayId) ?? projects[0]

  return (
    <section
      className="projects"
      id="projects"
      aria-labelledby="projects-title"
    >
      <header className="pf-sec-head">
        <div className="pf-sec-head__top">
          <span className="pf-sec-head__index">03</span>
          <span className="pf-sec-head__en">Projects</span>
        </div>
        <h2 id="projects-title" className="pf-sec-head__title">
          代表项目
        </h2>
        <p className="pf-sec-head__lead">
          四个独立产品与 Skill 实践，覆盖多 Agent 投研、内容增长 Agent 平台、语音日程与结构化爬虫。左侧为项目索引，点选后在右侧查看其系统架构、使用示例与核心模块。
        </p>
      </header>

      <div className="projects-split">
        <nav className="projects-index" aria-label="项目索引">
          {projects.map((project, index) => {
            const active = selectedId === project.id
            return (
              <button
                type="button"
                key={project.id}
                className={`project-index-item${active ? ' is-active' : ''}`}
                aria-current={active ? 'true' : undefined}
                aria-label={`查看${project.title}`}
                onClick={() => handleSelect(project.id)}
              >
                <span className="project-index-item__num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="project-index-item__body">
                  <span className="project-index-item__title">
                    {project.title}
                  </span>
                  <span className="project-index-item__sub">
                    {project.subtitle}
                  </span>
                </span>
              </button>
            )
          })}
        </nav>

        <div className="project-stage-wrap">
          <ProjectStage
            key={display.id}
            project={display}
            panelId={`${display.id}-stage`}
            index={projects.findIndex((p) => p.id === display.id)}
            transition={leaving ? 'out' : 'in'}
          />
        </div>
      </div>
    </section>
  )
}
