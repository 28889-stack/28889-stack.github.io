import {
  ChartNoAxesCombined,
  ChevronDown,
  MessageSquareMore,
  ScanSearch,
} from 'lucide-react'
import { useState } from 'react'
import { experiences } from '../data/portfolio'

const icons = [MessageSquareMore, ChartNoAxesCombined, ScanSearch]

export function ExperienceSection() {
  const [openId, setOpenId] = useState<string | null>(null)

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
        <div className="experience-list">
          {experiences.map((experience, index) => {
            const Icon = icons[index]
            const isOpen = openId === experience.id

            return (
              <article
                className={`experience-row${isOpen ? ' is-open' : ''}`}
                key={experience.id}
              >
                <button
                  type="button"
                  className="experience-row__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`${experience.id}-details`}
                  aria-label={`${isOpen ? '收起' : '展开'}${experience.title}详情`}
                  onClick={() =>
                    setOpenId((current) =>
                      current === experience.id ? null : experience.id,
                    )
                  }
                >
                  <span className="experience-row__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <span className="experience-row__identity">
                    <strong>{experience.title}</strong>
                    <small>{experience.subtitle}</small>
                  </span>
                  <time>{experience.period}</time>
                  <span className="experience-row__summary">
                    {experience.summary}
                  </span>
                  <span className="experience-row__tags">
                    {experience.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                  <ChevronDown
                    className="experience-row__chevron"
                    size={17}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    className="experience-row__details"
                    id={`${experience.id}-details`}
                  >
                    {experience.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
