import {
  domainExperiences,
  education,
  experiences,
  profile,
  projects,
  qualifications,
  skills,
} from './portfolio'

describe('portfolio content', () => {
  it('contains the approved primary content', () => {
    expect(experiences.map((item) => item.title)).toEqual([
      '腾讯',
      '同花顺',
      '易方达基金',
    ])
    expect(projects.map((item) => item.title)).toEqual([
      '语音日程',
      'Web Spider Skill',
    ])
    expect(skills.map((item) => item.title)).toEqual([
      'AI 产品评测',
      'Agent 与工作流设计',
      'RAG 与数据闭环',
      'Vibe Coding 开发',
    ])
  })

  it('only exposes the approved email', () => {
    expect(profile.email).toBe('13133055568@163.com')
    expect(Object.keys(profile)).toEqual([
      'name',
      'role',
      'location',
      'headline',
      'summary',
      'email',
    ])
    expect(
      JSON.stringify({ profile, experiences, projects, skills }),
    ).not.toMatch(/"github"|"twitter"|"linkedin"|"wechat"|"phone"/i)
  })

  it('contains the approved education and professional qualifications', () => {
    expect(education.map((item) => item.school)).toEqual([
      '中山大学',
      '西南政法大学',
    ])
    expect(qualifications).toEqual([
      '法律职业资格 A 证',
      '基金从业资格',
    ])
  })

  it('restores the legal and financial internships', () => {
    expect(domainExperiences.map((item) => item.title)).toEqual([
      '华泰联合证券',
      '深圳证券交易所',
    ])
    expect(domainExperiences.every((item) => item.details.length === 4)).toBe(
      true,
    )
  })

  it('keeps every expandable item complete', () => {
    for (const item of [
      ...experiences,
      ...projects,
      ...domainExperiences,
    ]) {
      expect(item.summary.length).toBeGreaterThan(12)
      expect(item.details.length).toBeGreaterThanOrEqual(4)
      expect(item.tags.length).toBeGreaterThanOrEqual(4)
    }
  })
})
