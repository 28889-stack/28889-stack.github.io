import { skills } from '../data/portfolio'

export function SkillsSection() {
  return (
    <section
      className="content-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-intro">
        <div>
          <span className="section-kicker">CAPABILITIES</span>
          <h2 id="skills-title">核心能力</h2>
          <p>从产品定义、效果评测到原型落地的完整能力链路。</p>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map(({ title, description, icon: Icon }) => (
          <article className="skill-card" key={title}>
            <span className="skill-card__icon">
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
