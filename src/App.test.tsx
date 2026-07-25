import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the approved sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '董羽舒' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '实习经历' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '代表项目' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '核心能力' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '法律 × 金融复合背景' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '联系我' }),
    ).toBeInTheDocument()
  })

  it('only exposes email contact links', () => {
    render(<App />)

    const links = screen.getAllByRole('link')
    expect(
      links.some(
        (link) =>
          link.getAttribute('href') === 'mailto:13133055568@163.com',
      ),
    ).toBe(true)
    expect(document.body.textContent).not.toMatch(/GitHub|Twitter|LinkedIn/)
  })

  it('keeps only one experience expanded', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: '展开腾讯详情' }),
    )
    expect(
      screen.getByText(/建设“文字整理”训练集/),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: '展开同花顺详情' }),
    )
    expect(
      screen.queryByText(/建设“文字整理”训练集/),
    ).not.toBeInTheDocument()
    expect(screen.getByText(/拆分端到端效果/)).toBeInTheDocument()
  })
})
