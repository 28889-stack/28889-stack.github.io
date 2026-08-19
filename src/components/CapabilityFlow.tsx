import { useId } from 'react'
import type { CapabilityFlowNode } from '../types/portfolio'

const MONO = "ui-monospace, 'SFMono-Regular', Menlo, 'Cascadia Code', monospace"
const SERIF = "Georgia, 'Songti SC', 'STSong', serif"

const Y = 40
const XS = [44, 132, 220, 308]

export function CapabilityFlow({
  flow,
  loop,
}: {
  flow: CapabilityFlowNode[]
  loop: boolean
}) {
  const id = useId().replace(/:/g, '')
  const arrow = `cap-arrow-${id}`
  const arrowBack = `cap-arrow-back-${id}`

  return (
    <svg
      className="cap-flow"
      viewBox="0 0 352 84"
      role="img"
      aria-label={flow.map((n) => n.label).join(' → ')}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id={arrow} markerWidth={7} markerHeight={7} refX={5} refY={3} orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
        </marker>
        <marker id={arrowBack} markerWidth={7} markerHeight={7} refX={5} refY={3} orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* forward connectors */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={XS[i] + 11}
          y1={Y}
          x2={XS[i + 1] - 11}
          y2={Y}
          stroke="var(--line)"
          strokeWidth={1}
          markerEnd={`url(#${arrow})`}
        />
      ))}

      {/* optional feedback loop (closed-loop capabilities) */}
      {loop && (
        <path
          d={`M${XS[3]},${Y + 12} C${XS[3] + 10},${Y + 30} ${XS[0] - 10},${Y + 30} ${XS[0]},${Y + 12}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          strokeDasharray="2 4"
          opacity={0.6}
          markerEnd={`url(#${arrowBack})`}
        />
      )}

      {/* nodes */}
      {flow.map((node, i) => (
        <g key={node.label}>
          <rect
            x={XS[i] - 11}
            y={Y - 11}
            width={22}
            height={22}
            rx={3}
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth={1}
          />
          <rect x={XS[i] - 11} y={Y - 11} width={3} height={3} fill="var(--accent)" />
          <text
            x={XS[i]}
            y={20}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={8.5}
            letterSpacing="0.5"
            fill="var(--accent-deep)"
          >
            {node.label}
          </text>
          <text
            x={XS[i]}
            y={Y + 26}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize={8.5}
            fill="var(--muted)"
          >
            {node.sub}
          </text>
        </g>
      ))}
    </svg>
  )
}
