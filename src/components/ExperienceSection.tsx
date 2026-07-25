import { ChartNoAxesCombined, MessageSquareMore, ScanSearch } from 'lucide-react'
import { useState } from 'react'
import { experiences } from '../data/portfolio'
import { ExpandableCard } from './ExpandableCard'

const icons = [MessageSquareMore, ChartNoAxesCombined, ScanSearch]

export function ExperienceSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section
      className="section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <div className="section-intro">
          <div>
            <h2 className="section-heading" id="experience-title">
              实习经历
            </h2>
            <p>围绕 AI 产品评测、工作流设计与复杂功能落地的实践。</p>
          </div>
          <span>点击卡片查看详情</span>
        </div>

        <div className="experience-grid">
          {experiences.map((experience, index) => (
            <ExpandableCard
              key={experience.id}
              item={experience}
              isOpen={openId === experience.id}
              onToggle={() => toggle(experience.id)}
              icon={icons[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
