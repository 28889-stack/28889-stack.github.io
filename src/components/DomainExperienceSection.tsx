import { Landmark, Scale } from 'lucide-react'
import { domainExperiences } from '../data/portfolio'
import { ExpandableCollection } from './ExpandableCollection'

const icons = [Landmark, Scale]

export function DomainExperienceSection() {
  return (
    <section
      className="content-section"
      id="domain-experience"
      aria-labelledby="domain-experience-title"
    >
      <div className="section-intro">
        <div>
          <span className="section-kicker">DOMAIN EXPERIENCE</span>
          <h2 id="domain-experience-title">法律 / 金融实践</h2>
          <p>为金融、合规等高专业度垂类 Agent 提供领域理解基础。</p>
        </div>
        <span>点击卡片查看详情</span>
      </div>
      <ExpandableCollection
        items={domainExperiences}
        icons={icons}
        gridClassName="card-grid card-grid--two"
      />
    </section>
  )
}
