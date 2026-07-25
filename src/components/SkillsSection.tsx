import { skills } from '../data/portfolio'

export function SkillsSection() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-intro">
          <div>
            <h2 className="section-heading" id="skills-title">
              核心能力
            </h2>
            <p>能力来自具体产品工作，不使用脱离经历的泛化标签。</p>
          </div>
        </div>

        <div className="skills-grid">
          {skills.map(({ title, description, icon: Icon }) => (
            <article className="skill-card" key={title}>
              <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
