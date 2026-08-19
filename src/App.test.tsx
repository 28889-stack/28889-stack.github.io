import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the home hero with identity, education and email', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: '董羽舒' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (content, el) =>
          content.startsWith('AI 产品经理') &&
          (el?.className ?? '').includes('intro__role'),
      ),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/中山大学/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/西南政法大学/).length).toBeGreaterThan(0)
    expect(
      screen.getByRole('link', { name: '13133055568@163.com' }),
    ).toHaveAttribute('href', 'mailto:13133055568@163.com')
    // no social links in the portfolio
    expect(document.body.textContent).not.toMatch(/GitHub|Twitter|LinkedIn/)
  })

  it('combines AI product and legal / finance experience in one document', () => {
    render(<App />)

    // each company appears in both the overview and the detail block
    expect(screen.getAllByText('腾讯').length).toBeGreaterThan(0)
    expect(screen.getAllByText('同花顺').length).toBeGreaterThan(0)
    expect(screen.getAllByText('易方达基金').length).toBeGreaterThan(0)
    expect(screen.getByText('华泰联合证券')).toBeInTheDocument()
    expect(screen.getByText('深圳证券交易所')).toBeInTheDocument()
  })

  it('renders all four sections in a single continuous document', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: '核心能力' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '经历' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '代表项目' }),
    ).toBeInTheDocument()
  })

  it('exposes section navigation with four anchors', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: '页面导航' })
    const links = nav.querySelectorAll('a')
    expect(links.length).toBe(4)
    expect(links[0]).toHaveAttribute('href', '#top')
    expect(links[3]).toHaveAttribute('href', '#projects')
  })
})
