import { evidenceDefinitions } from '../data/portfolio'
import type { EvidenceKey } from '../types/portfolio'

interface InteractiveProductLoopProps {
  activeEvidence: EvidenceKey
  selectedEvidence: EvidenceKey
  onSelectEvidence: (key: EvidenceKey) => void
  onPreviewEvidence: (key: EvidenceKey | null) => void
}

const evidenceKeys: EvidenceKey[] = ['user', 'model', 'eval']

export function InteractiveProductLoop({
  activeEvidence,
  selectedEvidence,
  onSelectEvidence,
  onPreviewEvidence,
}: InteractiveProductLoopProps) {
  const active = evidenceDefinitions[activeEvidence]

  return (
    <div className="product-loop" aria-label="AI 产品闭环">
      <svg
        className="product-loop__lines"
        viewBox="0 0 200 150"
        aria-hidden="true"
      >
        <path
          className={activeEvidence === 'user' ? 'is-active' : ''}
          d="M100 68 L28 28"
        />
        <path
          className={activeEvidence === 'model' ? 'is-active' : ''}
          d="M100 68 L172 30"
        />
        <path
          className={activeEvidence === 'eval' ? 'is-active' : ''}
          d="M100 68 L166 112"
        />
      </svg>

      <span className="product-loop__core" aria-hidden="true">
        <strong>AI</strong>
        <small>PRODUCT</small>
      </span>

      {evidenceKeys.map((key) => {
        const definition = evidenceDefinitions[key]

        return (
          <button
            type="button"
            key={key}
            className={`product-loop__node product-loop__node--${key}${
              activeEvidence === key ? ' is-active' : ''
            }`}
            aria-label={`${definition.label}：${definition.proof}`}
            aria-pressed={selectedEvidence === key}
            onClick={() => onSelectEvidence(key)}
            onMouseEnter={() => onPreviewEvidence(key)}
            onMouseLeave={() => onPreviewEvidence(null)}
            onFocus={() => onPreviewEvidence(key)}
            onBlur={() => onPreviewEvidence(null)}
          >
            {definition.label}
          </button>
        )
      })}

      <p className="product-loop__proof" aria-live="polite">
        <span>{active.label}</span>
        {active.proof}
      </p>
    </div>
  )
}
