import { ChevronDown, type LucideIcon } from 'lucide-react'
import type { ExpandableItem } from '../types/portfolio'

interface ExpandableCardProps {
  item: ExpandableItem
  isOpen: boolean
  onToggle: () => void
  icon: LucideIcon
}

export function ExpandableCard({
  item,
  isOpen,
  onToggle,
  icon: Icon,
}: ExpandableCardProps) {
  const panelId = `${item.id}-details`

  return (
    <article className={`expandable-card${isOpen ? ' is-open' : ''}`}>
      <button
        className="expandable-card__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${isOpen ? '收起' : '展开'}${item.title}详情`}
        onClick={onToggle}
      >
        <span className="expandable-card__icon" aria-hidden="true">
          <Icon size={20} strokeWidth={1.8} />
        </span>
        <span className="expandable-card__heading">
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </span>
        {item.period && <time>{item.period}</time>}
        <ChevronDown
          className="expandable-card__chevron"
          size={18}
          aria-hidden="true"
        />
      </button>

      <p className="expandable-card__summary">{item.summary}</p>

      <div className="tag-list" aria-label={`${item.title}相关能力`}>
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {isOpen && (
        <div className="expandable-card__details" id={panelId}>
          <ul>
            {item.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
