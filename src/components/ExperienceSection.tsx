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
        <span className="section-index">01</span>
        <h2 id="experience-title">AI 产品实习</h2>
        <p>评测、工作流与产品落地</p>
      </div>
      <div className="section-content">
        <ExpandableCollection
          items={experiences}
          icons={icons}
          gridClassName="card-grid card-grid--three"
        />
      </div>
    </section>
  )
}
