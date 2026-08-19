import { skills } from '../data/portfolio'
import type { CapabilityPhase } from '../types/portfolio'
import { CapabilitySystem } from './CapabilitySystem'
import { CapabilityFlow } from './CapabilityFlow'
import '../core-capabilities.css'

const PHASE_CN: Record<CapabilityPhase, string> = {
  EVALUATE: '评测',
  DESIGN: '设计',
  BUILD: '构建',
  ITERATE: '迭代',
}

const METHOD: CapabilityPhase[] = ['EVALUATE', 'DESIGN', 'BUILD', 'ITERATE']

export function SkillsSection() {
  return (
    <section className="core-cap" id="skills" aria-labelledby="skills-title">
      <header className="cap-hero">
        <div className="cap-hero__main">
          <span className="cap-hero__index">01</span>
          <h2 id="skills-title" className="cap-hero__title">
            核心能力
          </h2>
          <p className="cap-hero__sub">
            CORE CAPABILITIES
            <span>AI 产品方法论与系统构建能力</span>
          </p>
          <p className="cap-hero__lead">
            从问题定义到原型落地，围绕评测、Agent 工作流、RAG 数据闭环与
            Vibe Coding 四条主线，把模型能力转化为可验证、可迭代的产品系统。
          </p>
          <div className="cap-method" aria-label="方法论：EVALUATE → DESIGN → BUILD → ITERATE">
            {METHOD.map((phase, i) => (
              <span key={phase} className="cap-method__step">
                {i > 0 && <span className="cap-method__sep" aria-hidden="true">→</span>}
                <span className="cap-method__node" aria-hidden="true" />
                <span className="cap-method__label">{phase}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="cap-hero__viz">
          <CapabilitySystem />
        </div>
      </header>

      <div className="cap-rows">
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <article key={skill.title} className="cap-row">
              <div className="cap-row__index">{String(index + 1).padStart(2, '0')}</div>

              <div className="cap-row__id">
                <span className="cap-row__phase">
                  {skill.phase} · {PHASE_CN[skill.phase]}
                </span>
                <span className="cap-row__icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <div className="cap-row__text">
                  <h3 className="cap-row__title">{skill.title}</h3>
                  <p className="cap-row__desc">{skill.description}</p>
                </div>
              </div>

              <div className="cap-row__flow">
                <CapabilityFlow flow={skill.flow} loop={skill.variant === 'loop'} />
              </div>

              <ul className="cap-row__kw">
                {skill.keywords.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>

              <span className="cap-row__plus" aria-hidden="true">
                +
              </span>
            </article>
          )
        })}
      </div>

      <footer className="cap-foot">
        <span className="cap-foot__item">CAPABILITY SYSTEM</span>
        <span className="cap-foot__item">04 MODULES</span>
        <span className="cap-foot__item cap-foot__status">
          STATUS <i className="cap-foot__dot" /> ACTIVE
        </span>
        <span className="cap-foot__item">MODEL → PRODUCT</span>
        <span className="cap-foot__item cap-foot__end">© 2026</span>
      </footer>
    </section>
  )
}
