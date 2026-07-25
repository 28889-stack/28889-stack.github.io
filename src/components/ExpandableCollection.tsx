import { type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import type { ExpandableItem } from '../types/portfolio'
import { ExpandableCard } from './ExpandableCard'

interface ExpandableCollectionProps {
  items: ExpandableItem[]
  icons: LucideIcon[]
  gridClassName: string
}

export function ExpandableCollection({
  items,
  icons,
  gridClassName,
}: ExpandableCollectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const activeItem = items.find((item) => item.id === openId)

  return (
    <>
      <div className={gridClassName}>
        {items.map((item, index) => (
          <ExpandableCard
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() =>
              setOpenId((current) => (current === item.id ? null : item.id))
            }
            icon={icons[index]}
          />
        ))}
      </div>

      {activeItem && (
        <div className="expanded-panel" id={`${activeItem.id}-details`}>
          <div className="expanded-panel__heading">
            <span>展开详情</span>
            <h3>{activeItem.title}</h3>
          </div>
          <ul>
            {activeItem.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
