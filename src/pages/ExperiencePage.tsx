import { useEffect, useRef, useState } from 'react'
import {
  FileSearch,
  MessageSquareText,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { domainExperiences, experiences, profile } from '../data/portfolio'
import '../experience-page.css'

const icons: Record<string, LucideIcon> = {
  tencent: MessageSquareText,
  ths: Workflow,
  efund: FileSearch,
}

function splitRoleDept(subtitle: string): { role: string; dept: string } {
  const [role = subtitle, dept = ''] = subtitle.split('｜')
  return { role: role.trim(), dept: dept.trim() }
}

function startYear(period: string): string {
  return period.split(/[.\-—]/)[0] || ''
}

export function ExperiencePage() {
  const columnRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const column = columnRef.current
    if (!column) return
    const sections = Array.from(
      column.querySelectorAll<HTMLElement>('.exp-detail'),
    )

    if (!('IntersectionObserver' in window)) {
      setActive(0)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index ?? '0',
            )
            setActive(index)
          }
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (index: number) => {
    const column = columnRef.current
    const target = column?.querySelectorAll<HTMLElement>('.exp-detail')[index]
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article className="exp-page" id="experience">
      <span className="exp-page__rule" aria-hidden="true" />

      <header className="exp-hero">
        <div className="exp-hero__text">
          <span className="exp-hero__index">02</span>
          <h1 className="exp-hero__title">经历</h1>
          <p className="exp-hero__subtitle">Experience</p>
          <p className="exp-hero__lead">{profile.summary}</p>
        </div>

        <div className="exp-hero__art" aria-hidden="true">
          <svg viewBox="0 0 240 240" role="presentation">
            <circle
              cx="120"
              cy="120"
              r="92"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
            <circle
              cx="120"
              cy="120"
              r="60"
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            <circle
              cx="120"
              cy="120"
              r="30"
              fill="none"
              stroke="var(--accent-soft)"
              strokeWidth="1"
            />
            <circle cx="120" cy="120" r="5" fill="var(--accent)" />
            <circle cx="212" cy="120" r="3" fill="var(--accent)" />
            <circle cx="120" cy="28" r="2.5" fill="var(--subtle)" />
            <circle cx="44" cy="120" r="2.5" fill="var(--subtle)" />
          </svg>
        </div>
      </header>

      {/* ---------- Chapter 01 · AI Product Experience (primary) ---------- */}
      <section className="exp-chapter" aria-label="AI 产品经历">
        <header className="exp-chapter__head">
          <div className="exp-chapter__kicker">
            <span className="exp-chapter__num">01</span>
            <h2 className="exp-chapter__title">AI 产品经历</h2>
            <span className="exp-chapter__en">AI Product Experience</span>
          </div>
          <p className="exp-chapter__note">
            围绕模型评测、Agent 工作流与垂类应用，呈现从意图识别、自动化评测到产品实现的完整实践。
          </p>
        </header>

        <section className="exp-overview" aria-label="实习概览">
          {experiences.map((experience) => {
            const { role, dept } = splitRoleDept(experience.subtitle)
            return (
              <article className="exp-overview__item" key={`ov-${experience.id}`}>
                <h3 className="exp-overview__org">{experience.title}</h3>
                <p className="exp-overview__role">{role}</p>
                {dept && <p className="exp-overview__dept">{dept}</p>}
                <time className="exp-overview__period">{experience.period}</time>
                <ul className="exp-overview__tags">
                  {experience.tags.slice(0, 3).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </section>

        <section className="exp-split">
          <aside className="exp-index" aria-label="实习索引">
            <ol className="exp-index__list">
              {experiences.map((experience, index) => {
                const { role } = splitRoleDept(experience.subtitle)
                return (
                  <li
                    className="exp-index__item"
                    key={`idx-${experience.id}`}
                    data-active={active === index}
                  >
                    <button
                      type="button"
                      className="exp-index__btn"
                      onClick={() => scrollTo(index)}
                      aria-current={active === index}
                    >
                      <span className="exp-index__marker" aria-hidden="true" />
                      <span className="exp-index__body">
                        <span className="exp-index__year">
                          {startYear(experience.period)}
                        </span>
                        <span className="exp-index__org">{experience.title}</span>
                        <span className="exp-index__role">{role}</span>
                        <span className="exp-index__date">
                          {experience.period}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </aside>

          <div className="exp-detail-col" ref={columnRef}>
            {experiences.map((experience, index) => {
              const Icon = icons[experience.id] ?? MessageSquareText
              const { role, dept } = splitRoleDept(experience.subtitle)

              return (
                <section
                  className="exp-detail"
                  key={experience.id}
                  data-index={index}
                  aria-labelledby={`exp-headline-${experience.id}`}
                >
                  <header className="exp-detail__head">
                    <span className="exp-detail__index">
                      {String(index + 1).padStart(2, '0')}
                      <span className="exp-detail__index-total">
                        / {String(experiences.length).padStart(2, '0')}
                      </span>
                    </span>
                    <div className="exp-detail__identity">
                      <h3 className="exp-detail__org">{experience.title}</h3>
                      <p className="exp-detail__meta">
                        {role}
                        {dept && (
                          <span className="exp-detail__dept"> · {dept}</span>
                        )}
                        <time className="exp-detail__period">
                          {' '}
                          · {experience.period}
                        </time>
                      </p>
                    </div>
                    <span className="exp-detail__icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                  </header>

                  <h4
                    className="exp-detail__headline"
                    id={`exp-headline-${experience.id}`}
                  >
                    {experience.headline}
                  </h4>

                  <p className="exp-detail__lead">{experience.summary}</p>

                  <ul className="exp-detail__tags">
                    {experience.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <div className="exp-detail__grid">
                    {experience.achievements.map((achievement, aIndex) => (
                      <article className="exp-ach" key={achievement.title}>
                        <span className="exp-ach__num">
                          {String(aIndex + 1).padStart(2, '0')}
                        </span>
                        <h5 className="exp-ach__title">{achievement.title}</h5>
                        <p className="exp-ach__body">{achievement.body}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </section>
      </section>

      {/* ---------- Transition · Chapter 02 ---------- */}
      <section className="exp-transition" aria-label="第二章 法律 / 金融实践">
        <span className="exp-transition__num">02</span>
        <h2 className="exp-transition__title">法律 / 金融实践</h2>
        <p className="exp-transition__en">Legal &amp; Finance Practice</p>
        <p className="exp-transition__note">
          补充性的专业背景，支撑对资本市场、法律研究与金融分析的更宽理解。
        </p>
      </section>

      {/* ---------- Chapter 02 · Legal & Finance Practice (secondary) ---------- */}
      <section className="exp-practice" aria-label="法律 / 金融实践">
        {domainExperiences.map((experience) => (
          <article className="exp-practice__row" key={experience.id}>
            <div className="exp-practice__id">
              <h3 className="exp-practice__org">{experience.title}</h3>
              <p className="exp-practice__role">{experience.subtitle}</p>
            </div>
            <p className="exp-practice__summary">{experience.summary}</p>
            <div className="exp-practice__meta">
              <time className="exp-practice__date">{experience.period}</time>
              <ul className="exp-practice__tags">
                {experience.tags.slice(0, 4).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <nav className="exp-footnav" aria-label="页脚导航">
        <a className="exp-footnav__back" href="#top">
          ← 返回首页
        </a>
        <span className="exp-footnav__sign">董羽舒 · 2026</span>
      </nav>
    </article>
  )
}
