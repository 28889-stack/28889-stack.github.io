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
        <span className="section-index">03</span>
        <h2 id="domain-experience-title">法律 / 金融实践</h2>
        <p>垂类 Agent 的领域基础</p>
      </div>
      <div className="section-content">
        <ExpandableCollection
          items={domainExperiences}
          icons={icons}
          gridClassName="card-grid card-grid--two"
        />
      </div>
    </section>
  )
}
