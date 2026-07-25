import { SkillToolPanel } from './SkillToolPanel'

export function SkillsSection() {
  return (
    <section
      className="content-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-intro">
        <span className="section-index">04</span>
        <h2 id="skills-title">核心能力</h2>
        <p>从定义到原型落地</p>
      </div>

      <div className="section-content">
        <SkillToolPanel />
      </div>
    </section>
  )
}
