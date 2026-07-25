import { skills } from '../data/portfolio'

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
        <div className="skills-grid">
          {skills.map(({ title, description, icon: Icon }) => (
            <article className="skill-card" key={title}>
              <span className="skill-card__icon">
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
