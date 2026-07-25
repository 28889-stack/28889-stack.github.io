import { ChartNoAxesCombined, MessageSquareMore, ScanSearch } from 'lucide-react'
import { experiences } from '../data/portfolio'
import { ExpandableCollection } from './ExpandableCollection'

const icons = [MessageSquareMore, ChartNoAxesCombined, ScanSearch]

export function ExperienceSection() {
  return (
    <section
      className="content-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-intro">
        <div>
          <span className="section-kicker">EXPERIENCE</span>
          <h2 id="experience-title">AI 产品实习</h2>
          <p>围绕 AI 产品评测、工作流设计与复杂功能落地的实践。</p>
        </div>
        <span>点击卡片查看详情</span>
      </div>
      <ExpandableCollection
        items={experiences}
        icons={icons}
        gridClassName="card-grid card-grid--three"
      />
    </section>
  )
}
