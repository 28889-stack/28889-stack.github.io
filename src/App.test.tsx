import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the approved light two-column content structure', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '董羽舒' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'AI 产品经理｜Agent、评测与工作流',
      }),
    ).toBeInTheDocument()
    expect(document.body.textContent).not.toContain(
      '把复杂的 AI 能力，转化为清晰、可用的产品体验。',
    )
    expect(
      screen.getByRole('heading', { name: 'AI 产品实习' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '代表项目' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '法律 / 金融实践' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '核心能力' }),
    ).toBeInTheDocument()
  })

  it('shows education, qualifications and only the email contact', () => {
    render(<App />)

    expect(document.querySelector('.profile-avatar img')).toHaveAttribute(
      'src',
      '/assets/ai-avatar.png',
    )
    expect(screen.getByText('中山大学')).toBeInTheDocument()
    expect(screen.getByText('西南政法大学')).toBeInTheDocument()
    expect(screen.getByText('法律职业资格 A 证')).toBeInTheDocument()
    expect(screen.getByText('基金从业资格')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '13133055568@163.com' }),
    ).toHaveAttribute('href', 'mailto:13133055568@163.com')
    expect(document.body.textContent).not.toMatch(
      /联系我|发送邮件|Get in touch|GitHub|Twitter|LinkedIn/,
    )
  })

  it('keeps Huatai and SZSE visible as separate domain experiences', () => {
    render(<App />)

    expect(
      screen.getByRole('button', { name: '展开华泰联合证券详情' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '展开深圳证券交易所详情' }),
    ).toBeInTheDocument()
  })

  it('keeps summary cards aligned while switching the detail panel', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: '展开腾讯详情' }),
    )
    expect(
      screen.getByText(/建设“文字整理”训练集/),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '收起腾讯详情' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '展开易方达基金详情' }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: '展开同花顺详情' }),
    )
    expect(
      screen.queryByText(/建设“文字整理”训练集/),
    ).not.toBeInTheDocument()
    expect(screen.getByText(/拆分端到端效果/)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '展开腾讯详情' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '收起同花顺详情' }),
    ).toBeInTheDocument()
  })
})
