import { Award, GraduationCap, Mail, MapPin } from 'lucide-react'
import { education, profile, qualifications } from '../data/portfolio'

export function ProfileSidebar() {
  return (
    <aside className="profile-sidebar" aria-labelledby="profile-name">
      <div className="avatar-system" aria-hidden="true">
        <span className="avatar-system__glow" />
        <span className="avatar-system__beam" />
        <span className="avatar-system__ring avatar-system__ring--outer" />
        <span className="avatar-system__ring avatar-system__ring--inner" />
        <span className="avatar-system__satellite avatar-system__satellite--one" />
        <span className="avatar-system__satellite avatar-system__satellite--two" />
        <span className="avatar-system__satellite avatar-system__satellite--three" />
        <div className="profile-avatar">
          <img src="/assets/ai-avatar.png" alt="" />
          <span className="profile-avatar__scan" />
        </div>
      </div>

      <div className="profile-identity">
        <h1 id="profile-name">{profile.name}</h1>
        <p>{profile.role}</p>
        <span>
          <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
          {profile.location}
        </span>
      </div>

      <div className="sidebar-divider" />

      <section className="sidebar-section" aria-labelledby="education-title">
        <div className="sidebar-section__title">
          <GraduationCap size={17} strokeWidth={1.8} aria-hidden="true" />
          <h2 id="education-title">教育背景</h2>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <article key={item.school}>
              <strong>{item.school}</strong>
              <p>{item.degree}</p>
              <time>{item.period}</time>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="sidebar-section" aria-labelledby="qualification-title">
        <div className="sidebar-section__title">
          <Award size={17} strokeWidth={1.8} aria-hidden="true" />
          <h2 id="qualification-title">专业资格</h2>
        </div>
        <ul className="qualification-list">
          {qualifications.map((qualification) => (
            <li key={qualification}>{qualification}</li>
          ))}
        </ul>
      </section>

      <div className="sidebar-email">
        <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
    </aside>
  )
}
