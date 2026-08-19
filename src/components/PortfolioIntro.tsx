import { education, profile } from '../data/portfolio'
import { HomeSystem } from './HomeSystem'
import { Portrait } from './Portrait'

const NAV = [
  { href: '#skills', index: '01', en: 'Core Capabilities', cn: '核心能力' },
  { href: '#experience', index: '02', en: 'Experience', cn: '经历' },
  { href: '#projects', index: '03', en: 'Projects', cn: '项目' },
]

export function PortfolioIntro() {
  return (
    <section className="intro" id="top" aria-labelledby="intro-name">
      <div className="intro__viz" aria-hidden="false">
        <HomeSystem />
      </div>

      <div className="intro__stage">
        <Portrait />
      </div>

      <div className="intro__head">
        <span className="intro__kicker">AI Product Portfolio · System/00</span>
        <h1 id="intro-name" className="intro__name">
          {profile.name}
        </h1>
        <p className="intro__role">
          {profile.role} · {profile.headline}
        </p>
      </div>

      <div className="intro__state">
        <div className="intro__edu-row">
          <span>
            <strong>{education[0].school}</strong> {education[0].degree}
          </span>
          <span className="intro__sep" aria-hidden="true">·</span>
          <span>
            <strong>{education[1].school}</strong> {education[1].degree}
          </span>
          <span className="intro__sep" aria-hidden="true">·</span>
          <a className="intro__contact" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <p className="intro__statement-bold">{profile.summary}</p>
        <p className="intro__statement-body">{profile.summaryDetail}</p>
        <p className="intro__statement-seeking">
          <span className="intro__seeking-highlight">{profile.seeking.title}</span>
          <span className="intro__seeking-tail">{profile.seeking.description}</span>
        </p>
      </div>

      <nav className="intro__nav" aria-label="章节导航">
        {NAV.map((item) => (
          <a key={item.href} className="intro__nav-item" href={item.href}>
            <span className="intro__nav-index">{item.index}</span>
            <span className="intro__nav-en">{item.en}</span>
            <span className="intro__nav-cn">{item.cn}</span>
            <span className="intro__nav-arrow" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </nav>
    </section>
  )
}