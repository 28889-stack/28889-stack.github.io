import type { CapabilityPhase } from '../types/portfolio'

const PHASE_LABELS: Record<CapabilityPhase, string> = {
  EVALUATE: '评测 · 验证 · 反馈',
  DESIGN: '设计 · 编排 · 路由',
  BUILD: '构建 · 检索 · 生成',
  ITERATE: '原型 · 部署 · 迭代',
}

const MONO = "ui-monospace, 'SFMono-Regular', Menlo, 'Cascadia Code', monospace"
const SERIF = "Georgia, 'Songti SC', 'STSong', serif"

// Center and orbit radius of the capability engine.
const CX = 250
const CY = 235
const R = 180

const NODES: { phase: CapabilityPhase; x: number; y: number; side: 'top' | 'right' | 'bottom' | 'left' }[] = [
  { phase: 'EVALUATE', x: CX, y: CY - R, side: 'top' },
  { phase: 'DESIGN', x: CX + R, y: CY, side: 'right' },
  { phase: 'BUILD', x: CX, y: CY + R, side: 'bottom' },
  { phase: 'ITERATE', x: CX - R, y: CY, side: 'left' },
]

const TICKS = [
  { x: CX + R * 0.707, y: CY + R * 0.707 },
  { x: CX - R * 0.707, y: CY + R * 0.707 },
  { x: CX - R * 0.707, y: CY - R * 0.707 },
  { x: CX + R * 0.707, y: CY - R * 0.707 },
]

export function CapabilitySystem() {
  return (
    <svg
      className="cap-sys"
      viewBox="0 0 500 470"
      role="img"
      aria-label="核心能力系统：EVALUATE、DESIGN、BUILD、ITERATE 四个阶段的闭环"
    >
      {/* faint technical crosshair guides */}
      <line x1={CX} y1={44} x2={CX} y2={426} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 5" opacity={0.5} />
      <line x1={44} y1={CY} x2={456} y2={CY} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 5" opacity={0.5} />

      {/* concentric guide rings */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--line)" strokeWidth={1} />
      <circle cx={CX} cy={CY} r={120} fill="none" stroke="var(--line)" strokeWidth={1} strokeDasharray="1 6" opacity={0.7} />
      <circle cx={CX} cy={CY} r={78} fill="none" stroke="var(--line)" strokeWidth={1} />

      {/* orbital loops — the one stronger terracotta layer + a pale companion */}
      <ellipse cx={CX} cy={CY} rx={R} ry={108} fill="none" stroke="var(--accent)" strokeWidth={1.3} strokeDasharray="5 6" transform={`rotate(-24 ${CX} ${CY})`} opacity={0.9} />
      <ellipse cx={CX} cy={CY} rx={R} ry={108} fill="none" stroke="var(--accent)" strokeWidth={1} strokeDasharray="2 7" transform={`rotate(26 ${CX} ${CY})`} opacity={0.32} />

      {/* anchor ticks */}
      {TICKS.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={1.6} fill="var(--line)" />
      ))}

      {/* center anchor */}
      <circle cx={CX} cy={CY} r={13} fill="none" stroke="var(--accent)" strokeWidth={1} opacity={0.5} />
      <circle cx={CX} cy={CY} r={4.5} fill="#231f1b" />
      <text x={CX} y={CY + 52} textAnchor="middle" fontFamily={SERIF} fontSize={13} fill="var(--text)" fontStyle="italic">
        AI 产品方法论
      </text>
      <text x={CX} y={CY + 68} textAnchor="middle" fontFamily={MONO} fontSize={9} letterSpacing="1.5" fill="var(--muted)">
        CAPABILITY ENGINE
      </text>

      {/* phase nodes + connected labels */}
      {NODES.map((n) => {
        const label = PHASE_LABELS[n.phase]
        const leader =
          n.side === 'top'
            ? `M${n.x},${n.y} L${n.x},${n.y - 15}`
            : n.side === 'bottom'
              ? `M${n.x},${n.y} L${n.x},${n.y + 15}`
              : n.side === 'right'
                ? `M${n.x},${n.y} L${n.x + 22},${n.y}`
                : `M${n.x},${n.y} L${n.x - 22},${n.y}`
        const anchor = n.side === 'left' || n.side === 'right' ? 'end' : 'middle'
        const lx = n.side === 'right' ? n.x + 22 : n.side === 'left' ? n.x - 22 : n.x
        const enY = n.side === 'top' ? n.y - 22 : n.side === 'bottom' ? n.y + 30 : n.y - 4
        const cnY = n.side === 'top' ? n.y - 8 : n.side === 'bottom' ? n.y + 44 : n.y + 10
        return (
          <g key={n.phase}>
            <path d={leader} fill="none" stroke="var(--line)" strokeWidth={1} />
            <circle cx={n.x} cy={n.y} r={9} fill="none" stroke="var(--accent)" strokeWidth={1} opacity={0.55} />
            <circle cx={n.x} cy={n.y} r={4} fill="var(--accent)" />
            <text x={lx} y={enY} textAnchor={anchor} fontFamily={MONO} fontSize={11} letterSpacing="1.5" fill="var(--accent-deep)">
              {n.phase}
            </text>
            <text x={lx} y={cnY} textAnchor={anchor} fontFamily={SERIF} fontSize={9.5} fill="var(--muted)">
              {label}
            </text>
          </g>
        )
      })}

      {/* micro-label */}
      <text x={14} y={462} fontFamily={MONO} fontSize={10} letterSpacing="1" fill="var(--muted)">
        // CAPABILITY SYSTEM
      </text>
    </svg>
  )
}
