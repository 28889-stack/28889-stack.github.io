import { CalendarClock, Waypoints } from 'lucide-react'
import { useState } from 'react'
import { projects } from '../data/portfolio'
import { ExpandableCard } from './ExpandableCard'

const icons = [CalendarClock, Waypoints]

export function ProjectsSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section
      className="section section--muted"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="section-intro">
          <div>
            <h2 className="section-heading" id="projects-title">
              代表项目
            </h2>
            <p>从问题定义、产品链路到可运行方案的独立实践。</p>
          </div>
          <span>点击卡片查看详情</span>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ExpandableCard
              key={project.id}
              item={project}
              isOpen={openId === project.id}
              onToggle={() => toggle(project.id)}
              icon={icons[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
