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
        <div>
          <span className="section-kicker">SELECTED PROJECTS</span>
          <h2 id="projects-title">代表项目</h2>
          <p>从问题定义、产品链路到可运行方案的独立实践。</p>
        </div>
        <span>点击卡片查看详情</span>
      </div>
      <ExpandableCollection
        items={projects}
        icons={icons}
        gridClassName="card-grid card-grid--two"
      />
    </section>
  )
}
