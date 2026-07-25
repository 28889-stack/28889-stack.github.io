import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Briefcase } from 'lucide-react'
import { ExpandableCard } from './ExpandableCard'

const item = {
  id: 'example',
  title: '示例公司',
  subtitle: 'AI 产品经理实习生',
  period: '2026',
  summary: '负责示例产品的需求分析与评测。',
  details: [
    '第一项具体工作',
    '第二项具体工作',
    '第三项具体工作',
    '第四项具体工作',
  ],
  tags: ['Agent', 'RAG', '评测', '产品设计'],
}

describe('ExpandableCard', () => {
  it('exposes a keyboard-accessible toggle', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <ExpandableCard
        item={item}
        isOpen={false}
        onToggle={onToggle}
        icon={Briefcase}
      />,
    )

    const button = screen.getByRole('button', {
      name: /展开示例公司详情/,
    })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('leaves details to a separate collection panel', () => {
    const { rerender } = render(
      <ExpandableCard
        item={item}
        isOpen={false}
        onToggle={() => undefined}
        icon={Briefcase}
      />,
    )
    expect(screen.queryByText('第一项具体工作')).not.toBeInTheDocument()

    rerender(
      <ExpandableCard
        item={item}
        isOpen
        onToggle={() => undefined}
        icon={Briefcase}
      />,
    )
    expect(screen.queryByText('第一项具体工作')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /收起示例公司详情/ }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('button', { name: /收起示例公司详情/ }),
    ).toHaveAttribute('aria-controls', 'example-details')
  })
})
