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
        <div className="capability-editorial">
          {skills.map(({ title, description, icon: Icon }, index) => (
            <article key={title}>
              <span className="capability-editorial__index">
                0{index + 1}
              </span>
              <span className="capability-editorial__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.7} />
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
