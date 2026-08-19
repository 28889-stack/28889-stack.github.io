const CORE = { cx: 180, cy: 165 }

const MONO = "ui-monospace, 'SFMono-Regular', Menlo, 'Cascadia Code', monospace"
const SERIF = "Georgia, 'Songti SC', 'Noto Serif SC', 'STSong', serif"

function LabelBox({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth={1}
      />
      <rect x={x} y={y} width={3} height={3} fill="var(--accent)" />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={11}
        letterSpacing="1.4"
        fill="var(--accent-deep)"
      >
        {label}
      </text>
    </g>
  )
}

export function HomeSystem() {
  return (
    <svg
      className="intro__sys"
      viewBox="0 0 480 360"
      role="img"
      aria-label="AI 产品系统：核心 AI PRODUCT 外层环绕 USER / MODEL / EVAL 与反馈闭环"
    >
      {/* faint large background arc on the right */}
      <circle
        cx={560}
        cy={180}
        r={300}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1}
        opacity={0.45}
      />

      {/* orbiting group — spins continuously around the core.
          Rotates via CSS transform (GPU-composited) instead of SMIL
          animateTransform, which ran on the main thread and caused scroll jank. */}
      <g className="intro__sys-orbit">
        <ellipse
          cx={CORE.cx}
          cy={CORE.cy}
          rx={115}
          ry={50}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.2}
          opacity={0.85}
        />
        <ellipse
          cx={CORE.cx}
          cy={CORE.cy}
          rx={148}
          ry={68}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1}
          strokeDasharray="3 4"
          opacity={0.75}
        />
        {/* travelling satellites — sit on the orbit tips and revolve */}
        <circle cx={CORE.cx + 115} cy={CORE.cy} r={3.6} fill="var(--accent)" />
        <circle cx={CORE.cx - 148} cy={CORE.cy} r={3.2} fill="var(--status)" />
      </g>

      {/* central AI / PRODUCT core */}
      <circle
        cx={CORE.cx}
        cy={CORE.cy}
        r={44}
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth={1.5}
      />
      <text
        x={CORE.cx}
        y={CORE.cy + 6}
        textAnchor="middle"
        fontFamily={SERIF}
        fontSize={28}
        fontWeight={600}
        fill="var(--accent-deep)"
      >
        AI
      </text>
      <text
        x={CORE.cx}
        y={CORE.cy + 24}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={8.5}
        letterSpacing="2"
        fill="var(--muted)"
      >
        PRODUCT
      </text>

      {/* labeled nodes — fixed around the orbit */}
      <LabelBox x={36} y={56} w={74} h={30} label="USER" />
      <LabelBox x={300} y={118} w={82} h={30} label="MODEL" />
      <LabelBox x={52} y={248} w={74} h={30} label="EVAL" />

      {/* feedback loop label */}
      <line
        x1={210}
        y1={306}
        x2={236}
        y2={306}
        stroke="var(--accent)"
        strokeWidth={1.4}
      />
      <text
        x={244}
        y={310}
        fontFamily={MONO}
        fontSize={9}
        letterSpacing="1.4"
        fill="var(--muted)"
      >
        FEEDBACK LOOP
      </text>

      {/* micro caption */}
      <text
        x={12}
        y={352}
        fontFamily={MONO}
        fontSize={8.5}
        letterSpacing="1"
        fill="var(--subtle)"
      >
        // AI PRODUCT SYSTEM
      </text>
    </svg>
  )
}