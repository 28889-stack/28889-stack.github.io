# AI 产品经理个人主页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个可部署到 GitHub Pages 的中文 AI 产品经理单页主页，以可展开实习卡片为核心，展示两个代表项目、四项核心能力和精简的法律金融复合优势。

**Architecture:** 使用 Vite + React + TypeScript 构建纯静态单页应用。真实内容集中保存在 `src/data/portfolio.ts`，展示组件只消费类型化数据；通用 `ExpandableCard` 管理无障碍展开交互，父级 section 控制“一次只展开一项”。视觉采用 Charcoal Studio 暗色调、Geist 单字体、实体深色表面、1px 边框和克制动效，避免统计卡片、装饰性渐变、浮夸玻璃拟态与 Hover 位移动画。

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, Lucide React, CSS

## Global Constraints

- 页面为中文单页滚动站点，不设置 Tab 页面或客户端路由。
- 内容顺序固定为 Hero → 实习经历 → 代表项目 → 核心能力 → 法律 × 金融复合背景 → Contact / Footer。
- 实习经历是主内容；三张卡片横向排列，点击后跨网格展开，一次只展开一张。
- 项目使用相同展开模式，一次只展开一张。
- 只公开邮箱 `13133055568@163.com`，不渲染 GitHub、Twitter、LinkedIn、手机号或微信入口。
- 不使用“3 段实习”“2 个项目”等统计式首屏内容。
- 不虚构技术栈、文章、数据、指标或项目结果。
- 使用 Lucide React 图标，不使用 Emoji 或 Unicode 字符代替图标。
- 主色板使用 Charcoal Studio：背景 `#1c1c1e`、表面 `#2c2c2e`、主色 `#0a84ff`、次色 `#5e5ce6`、文字 `#f2f2f7`。
- 圆角范围为 6–10px；卡片 1px 实体边框；阴影不超过 `0 2px 8px rgba(0,0,0,.08)`；交互过渡为 100–200ms ease。
- 不使用装饰性渐变背景、彩色发光、浮动玻璃卡片、胶囊按钮、卡片 Hover 位移或缩放；玻璃效果仅限 sticky Header 的低强度背景模糊。
- 支持 `prefers-reduced-motion`、键盘展开、`aria-expanded`、44px 最小点击区域和 WCAG AA 文本对比。
- Vite 输出目录为 `dist/`；GitHub Actions 构建并上传 Pages artifact。

## File Structure

```text
.
├── .github/workflows/deploy.yml      # GitHub Pages 构建与部署
├── index.html                        # Vite HTML 入口与页面元数据
├── package.json                      # 脚本与依赖
├── tsconfig.app.json                 # 浏览器端 TypeScript 配置
├── tsconfig.json                     # TypeScript 项目引用
├── tsconfig.node.json                # Vite 配置 TypeScript 设置
├── vite.config.ts                    # React、Vitest 与 Pages base 配置
├── src/
│   ├── App.test.tsx                  # 整页内容边界与公开信息测试
│   ├── App.tsx                       # 页面区块编排
│   ├── main.tsx                      # React 入口
│   ├── styles.css                    # 视觉 tokens、布局与响应式规则
│   ├── components/
│   │   ├── CompoundBackground.tsx    # 垂类 Agent 复合优势
│   │   ├── ContactFooter.tsx         # 邮箱 CTA 与页脚
│   │   ├── ExpandableCard.test.tsx   # 通用展开卡片行为测试
│   │   ├── ExpandableCard.tsx        # 无障碍展开卡片
│   │   ├── Header.tsx                # Sticky 锚点导航
│   │   ├── Hero.tsx                  # 定位、CTA、动态抽象头像
│   │   ├── ProjectsSection.tsx       # 项目卡片与单项展开状态
│   │   ├── SkillsSection.tsx         # 四项能力与 Lucide 图标
│   │   └── ExperienceSection.tsx     # 实习卡片与单项展开状态
│   ├── data/
│   │   ├── portfolio.test.ts         # 内容完整性和禁止字段测试
│   │   └── portfolio.ts              # 真实履历与项目内容
│   ├── test/
│   │   └── setup.ts                  # jest-dom 设置
│   └── types/
│       └── portfolio.ts              # Experience、Project、Skill 类型
└── docs/superpowers/                 # 已确认规格与本计划
```

---

### Task 1: Bootstrap Vite、React 与测试运行时

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Produces: `npm run dev`, `npm test`, `npm run build`；默认导出 React 组件 `App`.

- [ ] **Step 1: 初始化依赖与脚本**

Run:

```bash
npm init -y
npm install react react-dom lucide-react
npm install -D vite @vitejs/plugin-react typescript @types/node @types/react @types/react-dom vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Then set the scripts and ESM mode in `package.json`:

```bash
npm pkg set private=true type=module
npm pkg set scripts.dev=vite
npm pkg set 'scripts.build=tsc -b && vite build'
npm pkg set 'scripts.preview=vite preview'
npm pkg set 'scripts.test=vitest run'
npm pkg set 'scripts.test:watch=vitest'
```

- [ ] **Step 2: 写入失败的 App 冒烟测试**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the AI product manager identity', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: '董羽舒' })).toBeInTheDocument()
    expect(screen.getByText('AI 产品经理')).toBeInTheDocument()
  })
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: 配置 Vitest 并验证 RED**

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

function pagesBase(repository?: string, githubActions = false) {
  if (!githubActions || !repository) return '/'
  const repo = repository.split('/')[1] ?? ''
  return repo.endsWith('.github.io') ? '/' : `/${repo}/`
}

export default defineConfig({
  base: pagesBase(process.env.GITHUB_REPOSITORY, process.env.GITHUB_ACTIONS === 'true'),
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
```

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because `src/App.tsx` does not exist.

- [ ] **Step 4: 创建最小应用入口并验证 GREEN**

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main>
      <h1>董羽舒</h1>
      <p>AI 产品经理</p>
    </main>
  )
}
```

Create `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="董羽舒的 AI 产品经理个人主页，展示 AI 产品实习、项目经历与法律金融复合背景。" />
    <title>董羽舒｜AI 产品经理</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

Create `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

Run:

```bash
npm test -- src/App.test.tsx
npm run build
```

Expected: 1 test passes; production build exits 0 and creates `dist/`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json index.html tsconfig*.json vite.config.ts src/main.tsx src/test/setup.ts src/App.test.tsx src/App.tsx
git commit -m "chore: bootstrap portfolio app"
```

---

### Task 2: 建立真实内容模型与数据边界

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolio.test.ts`
- Create: `src/data/portfolio.ts`

**Interfaces:**
- Produces: `experiences: Experience[]`, `projects: Project[]`, `skills: Skill[]`, `profile: Profile`.
- Consumes later: `ExperienceSection`, `ProjectsSection`, `SkillsSection`, `Hero`, `ContactFooter`.

- [ ] **Step 1: 定义内容类型**

Create `src/types/portfolio.ts`:

```ts
import type { LucideIcon } from 'lucide-react'

export interface Profile {
  name: string
  role: string
  headline: string
  summary: string
  email: string
}

export interface ExpandableItem {
  id: string
  title: string
  subtitle: string
  period?: string
  summary: string
  details: string[]
  tags: string[]
}

export type Experience = ExpandableItem
export type Project = ExpandableItem

export interface Skill {
  title: string
  description: string
  icon: LucideIcon
}
```

- [ ] **Step 2: 写入失败的内容完整性测试**

Create `src/data/portfolio.test.ts`:

```ts
import { experiences, profile, projects, skills } from './portfolio'

describe('portfolio content', () => {
  it('contains the approved primary content', () => {
    expect(experiences.map((item) => item.title)).toEqual(['腾讯', '同花顺', '易方达基金'])
    expect(projects.map((item) => item.title)).toEqual(['语音日程', 'Web Spider Skill'])
    expect(skills.map((item) => item.title)).toEqual([
      'AI 产品评测',
      'Agent 与工作流设计',
      'RAG 与数据闭环',
      'Vibe Coding 开发',
    ])
  })

  it('only exposes the approved email', () => {
    expect(profile.email).toBe('13133055568@163.com')
    expect(JSON.stringify({ profile, experiences, projects, skills })).not.toMatch(
      /github|twitter|linkedin|微信|13133055568(?!@)/i,
    )
  })

  it('keeps every expandable item complete', () => {
    for (const item of [...experiences, ...projects]) {
      expect(item.summary.length).toBeGreaterThan(12)
      expect(item.details.length).toBeGreaterThanOrEqual(4)
      expect(item.tags.length).toBeGreaterThanOrEqual(4)
    }
  })
})
```

Run:

```bash
npm test -- src/data/portfolio.test.ts
```

Expected: FAIL because `src/data/portfolio.ts` does not exist.

- [ ] **Step 3: 写入最小的真实内容数据**

Create `src/data/portfolio.ts`:

```ts
import { Database, Gauge, Terminal, Workflow } from 'lucide-react'
import type { Experience, Profile, Project, Skill } from '../types/portfolio'

export const profile: Profile = {
  name: '董羽舒',
  role: 'AI 产品经理',
  headline: '把复杂的 AI 能力，转化为清晰、可用的产品体验。',
  summary: '关注生成式 AI、Agent 工作流、模型评测与复杂业务场景产品化，具备法律与金融复合背景。',
  email: '13133055568@163.com',
}

export const experiences: Experience[] = [
  {
    id: 'tencent',
    title: '腾讯',
    subtitle: 'AI 产品经理实习生｜微信事业部',
    period: '2026.02—2026.06',
    summary: '负责文字整理、意图识别 Benchmark、自动化评测与用户反馈闭环，并参与跨设备文件功能设计。',
    details: [
      '建设“文字整理”训练集与 Benchmark，参与用户表达分类、数据标注规范和评测标准设计。',
      '设计意图识别 Benchmark 与自动化评测 Pipeline，推动人机评估对齐度超过 85%。',
      '建立用户反馈分类、周期报告与 P0 问题汇报机制。',
      '参与跨设备文件功能的产品架构、交互流程与异常处理设计。',
    ],
    tags: ['Benchmark', '自动化评测', 'ASR', '意图识别', '用户反馈'],
  },
  {
    id: 'ths',
    title: '同花顺',
    subtitle: 'AI 产品经理实习生｜数智产品部',
    period: '2025.10—2026.02',
    summary: '搭建 Agent 端到端评测体系，参与 SFT 数据建设与智能金融问答工作流设计。',
    details: [
      '搭建 Agent 端到端评测体系，拆分端到端效果、RAG 质量与双轨并行评测链路。',
      '建立常态化 Badcase 归因机制，形成“发现问题—定位原因—算法迭代”的闭环。',
      '围绕业务逻辑设计 SFT 数据规范并合成评测数据。',
      '设计六级前端意图路由，支持问答分流、数据库挂载和多轮对话工作流。',
    ],
    tags: ['Agent', 'RAG', 'SFT', 'Badcase', 'Intent Router'],
  },
  {
    id: 'efund',
    title: '易方达基金',
    subtitle: 'AI 应用实习生',
    period: '2026.06—2026.07',
    summary: '参与多模态材料解析与合规审核产品链路设计。',
    details: [
      '面向扫描件、图片、PDF 等非结构化材料，参与合规审核产品链路设计。',
      '设计文件分类、OCR 与多模态识别、事件理解和规则校验流程。',
      '使用轻量 Graph-RAG 建立材料间关联，提升复杂事件理解与结果追溯能力。',
      '通过规则匹配输出初步合规结论，迭代后运行速度提升 50%。',
    ],
    tags: ['多模态理解', 'OCR', 'Graph-RAG', '合规审核', '规则引擎'],
  },
]

export const projects: Project[] = [
  {
    id: 'voice-schedule',
    title: '语音日程',
    subtitle: '自然语言驱动的动态日程产品',
    summary: '用自然语言完成日程的新建、修改与删除，让日程随突发变化动态重组。',
    details: [
      '问题：传统日程修改摩擦大，复杂计划容易在突发事件后失效。',
      '方案：语音输入 → LLM 意图解析 → 动态调整。',
      '产品设计：全局快捷键、常驻监听、新建/修改/删除意图识别、复杂日程动态重组。',
      '个人角色：需求调研、产品定位、核心链路与功能规划。',
    ],
    tags: ['语音交互', 'LLM', '意图识别', '动态日程'],
  },
  {
    id: 'web-spider',
    title: 'Web Spider Skill',
    subtitle: '结构化爬虫生产工作流',
    summary: '将爬虫生产拆解为可澄清、可规划、可执行、可审计的结构化工作流。',
    details: [
      '问题：不同站点差异大，抓取流程碎片化，执行风险和知识复用成本高。',
      '方案：需求澄清 → 站点观测 → 计划组装 → 执行与证据 → 脱敏学习。',
      '产品设计：以 Toolpack、Recipe、Domain Profile、Factory 和 Runner 划分能力边界。',
      '安全机制：声明式计划、执行授权、运行证据、敏感信息脱敏和候选审核。',
    ],
    tags: ['Skill', 'Workflow', 'CDP', 'Recipe', '安全边界'],
  },
]

export const skills: Skill[] = [
  { title: 'AI 产品评测', description: '设计 Benchmark、评测指标、自动化 Pipeline 与 Badcase 归因机制。', icon: Gauge },
  { title: 'Agent 与工作流设计', description: '围绕用户意图、任务路由、工具调用和多轮交互设计 AI 产品链路。', icon: Workflow },
  { title: 'RAG 与数据闭环', description: '参与 RAG、Graph-RAG、SFT 数据集和合成评测数据建设。', icon: Database },
  { title: 'Vibe Coding 开发', description: '使用 Codex、Claude Code 等工具，将产品构想实现为 Skill、RAG Workflow 和轻量 Agent 原型。', icon: Terminal },
]
```

- [ ] **Step 4: 验证 GREEN**

Run:

```bash
npm test -- src/data/portfolio.test.ts
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/types/portfolio.ts src/data/portfolio.ts src/data/portfolio.test.ts
git commit -m "feat: add approved portfolio content"
```

---

### Task 3: 用 TDD 实现可展开卡片

**Files:**
- Create: `src/components/ExpandableCard.test.tsx`
- Create: `src/components/ExpandableCard.tsx`

**Interfaces:**
- Consumes: `ExpandableItem` from `src/types/portfolio.ts`.
- Produces: `ExpandableCard({ item, isOpen, onToggle, icon })`.

- [ ] **Step 1: 写入失败的展开与无障碍测试**

Create `src/components/ExpandableCard.test.tsx`:

```tsx
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
  details: ['第一项具体工作', '第二项具体工作', '第三项具体工作', '第四项具体工作'],
  tags: ['Agent', 'RAG', '评测', '产品设计'],
}

describe('ExpandableCard', () => {
  it('exposes a keyboard-accessible toggle', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ExpandableCard item={item} isOpen={false} onToggle={onToggle} icon={Briefcase} />)

    const button = screen.getByRole('button', { name: /展开示例公司详情/ })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('renders details only while open', () => {
    const { rerender } = render(
      <ExpandableCard item={item} isOpen={false} onToggle={() => undefined} icon={Briefcase} />,
    )
    expect(screen.queryByText('第一项具体工作')).not.toBeInTheDocument()
    rerender(<ExpandableCard item={item} isOpen onToggle={() => undefined} icon={Briefcase} />)
    expect(screen.getByText('第一项具体工作')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /收起示例公司详情/ })).toHaveAttribute('aria-expanded', 'true')
  })
})
```

Run:

```bash
npm test -- src/components/ExpandableCard.test.tsx
```

Expected: FAIL because `ExpandableCard.tsx` does not exist.

- [ ] **Step 2: 实现最小组件**

Create `src/components/ExpandableCard.tsx`:

```tsx
import { ChevronDown, type LucideIcon } from 'lucide-react'
import type { ExpandableItem } from '../types/portfolio'

interface ExpandableCardProps {
  item: ExpandableItem
  isOpen: boolean
  onToggle: () => void
  icon: LucideIcon
}

export function ExpandableCard({ item, isOpen, onToggle, icon: Icon }: ExpandableCardProps) {
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
        <span className="expandable-card__icon" aria-hidden="true"><Icon size={20} /></span>
        <span className="expandable-card__heading">
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </span>
        {item.period && <time>{item.period}</time>}
        <ChevronDown className="expandable-card__chevron" size={18} aria-hidden="true" />
      </button>
      <p className="expandable-card__summary">{item.summary}</p>
      <div className="tag-list" aria-label={`${item.title}相关能力`}>
        {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      {isOpen && (
        <div className="expandable-card__details" id={panelId}>
          <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </div>
      )}
    </article>
  )
}
```

- [ ] **Step 3: 验证 GREEN**

Run:

```bash
npm test -- src/components/ExpandableCard.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 4: 增加父级单项展开测试**

Extend `src/App.test.tsx` after sections exist in Task 4:

```tsx
it('keeps only one experience expanded', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: '展开腾讯详情' }))
  expect(screen.getByText(/建设“文字整理”训练集/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: '展开同花顺详情' }))
  expect(screen.queryByText(/建设“文字整理”训练集/)).not.toBeInTheDocument()
  expect(screen.getByText(/搭建 Agent 端到端评测体系/)).toBeInTheDocument()
})
```

Expected before Task 4 implementation: FAIL because `App` does not render experience cards.

- [ ] **Step 5: Commit**

```bash
git add src/components/ExpandableCard.tsx src/components/ExpandableCard.test.tsx src/App.test.tsx
git commit -m "feat: add accessible expandable cards"
```

---

### Task 4: 组装内容区块与一次单项展开状态

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/ExperienceSection.tsx`
- Create: `src/components/ProjectsSection.tsx`
- Create: `src/components/SkillsSection.tsx`
- Create: `src/components/CompoundBackground.tsx`
- Create: `src/components/ContactFooter.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: all exports from `src/data/portfolio.ts`.
- Produces: semantic section IDs `about`, `experience`, `projects`, `skills`, `contact`.

- [ ] **Step 1: 写入失败的整页内容边界测试**

Replace the smoke-only suite in `src/App.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the approved sections in document order', () => {
    render(<App />)
    const headings = screen.getAllByRole('heading').map((heading) => heading.textContent)
    expect(headings).toEqual(expect.arrayContaining([
      '董羽舒',
      '实习经历',
      '代表项目',
      '核心能力',
      '法律 × 金融复合背景',
      '联系我',
    ]))
  })

  it('only exposes email contact links', () => {
    render(<App />)
    const links = screen.getAllByRole('link')
    expect(links.some((link) => link.getAttribute('href') === 'mailto:13133055568@163.com')).toBe(true)
    expect(document.body.textContent).not.toMatch(/GitHub|Twitter|LinkedIn|微信/)
  })

  it('keeps only one experience expanded', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: '展开腾讯详情' }))
    expect(screen.getByText(/建设“文字整理”训练集/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '展开同花顺详情' }))
    expect(screen.queryByText(/建设“文字整理”训练集/)).not.toBeInTheDocument()
    expect(screen.getByText(/拆分端到端效果/)).toBeInTheDocument()
  })
})
```

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because approved sections are missing.

- [ ] **Step 2: 实现 Section 组件**

Use this state pattern in `ExperienceSection.tsx` and `ProjectsSection.tsx`:

```tsx
const [openId, setOpenId] = useState<string | null>(null)
const toggle = (id: string) => setOpenId((current) => current === id ? null : id)
```

Render each item with:

```tsx
<ExpandableCard
  key={item.id}
  item={item}
  isOpen={openId === item.id}
  onToggle={() => toggle(item.id)}
  icon={Briefcase}
/>
```

`Hero.tsx` must render the approved `profile` content, an anchor to `#experience`, a mail link, and the decorative avatar with `aria-hidden="true"`.

`SkillsSection.tsx` must render each Lucide icon from `skills`, its title and description.

`CompoundBackground.tsx` must render exactly:

```tsx
<section className="section compound-background" aria-labelledby="background-title">
  <div className="compound-background__icons" aria-hidden="true">
    <Scale size={22} />
    <Landmark size={22} />
  </div>
  <div>
    <h2 id="background-title">法律 × 金融复合背景</h2>
    <p>法学硕士、金融学辅修，具备法律职业资格和基金从业资格，为法律、金融等高专业门槛的垂类 Agent 产品提供更扎实的业务理解与合规判断。</p>
    <span>华泰联合证券投资银行部 · 深圳证券交易所</span>
  </div>
</section>
```

`Header.tsx` must use plain anchors and a solid mail button:

```tsx
const nav = [
  ['关于我', '#about'],
  ['实习经历', '#experience'],
  ['项目经历', '#projects'],
  ['核心能力', '#skills'],
] as const
```

`ContactFooter.tsx` must render only `mailto:${profile.email}` as the external action.

- [ ] **Step 3: 编排 App**

Update `src/App.tsx`:

```tsx
import { CompoundBackground } from './components/CompoundBackground'
import { ContactFooter } from './components/ContactFooter'
import { ExperienceSection } from './components/ExperienceSection'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CompoundBackground />
      </main>
      <ContactFooter />
    </>
  )
}
```

- [ ] **Step 4: 验证 GREEN**

Run:

```bash
npm test -- src/App.test.tsx src/components/ExpandableCard.test.tsx src/data/portfolio.test.ts
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/components
git commit -m "feat: assemble portfolio sections"
```

---

### Task 5: 实施暗黑极简视觉与响应式布局

**Files:**
- Create: `src/styles.css`
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: class names already rendered by all components.
- Produces: shared layout container, three/two/four-column grids, responsive breakpoints, reduced-motion behavior.

- [ ] **Step 1: 写入全局 tokens 与基础规则**

Create `src/styles.css` beginning with:

```css
:root {
  font-family: Geist, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  color: #f2f2f7;
  background: #1c1c1e;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  --background: #1c1c1e;
  --surface: #2c2c2e;
  --surface-muted: #232325;
  --border: rgba(242, 242, 247, 0.12);
  --text: #f2f2f7;
  --muted: #a1a1aa;
  --primary: #0a84ff;
  --secondary: #5e5ce6;
  --ring: #0a84ff;
  --radius: 8px;
  --container: 1200px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
body { margin: 0; min-width: 320px; background: var(--background); color: var(--text); }
button, a { font: inherit; }
a { color: inherit; }
button:focus-visible, a:focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }
.container { width: min(calc(100% - 48px), var(--container)); margin-inline: auto; }
.section { padding-block: 88px; border-top: 1px solid var(--border); }
.section-heading { margin: 0 0 32px; font-size: clamp(28px, 4vw, 48px); letter-spacing: -.04em; }
.site-header { background: rgba(28, 28, 30, .86); border-bottom: 1px solid var(--border); backdrop-filter: blur(12px); }
.page-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .12;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23f2f2f7'/%3E%3C/svg%3E");
}
```

- [ ] **Step 2: 实现实习、项目和能力网格**

Add:

```css
.experience-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.projects-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.skills-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.expandable-card { border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); }
.expandable-card.is-open { grid-column: 1 / -1; border-color: rgba(10, 132, 255, .55); }
.expandable-card__trigger {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 56px;
  padding: 18px;
  border: 0;
  color: var(--text);
  background: transparent;
  text-align: left;
  cursor: pointer;
}
.expandable-card__trigger:hover { background: rgba(255,255,255,.025); }
.expandable-card__summary, .tag-list, .expandable-card__details { margin-inline: 18px; }
.expandable-card__details { padding: 20px 0 24px; border-top: 1px solid var(--border); }
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; padding-bottom: 18px; }
.tag-list span { padding: 4px 8px; border: 1px solid var(--border); border-radius: 6px; color: var(--muted); font-size: 12px; }
```

- [ ] **Step 3: 实现 Hero 与克制的动态头像**

The avatar must be a semantic-free element containing three grid lines and three nodes. Use opacity-only animation:

```css
.hero-avatar { position: relative; aspect-ratio: 1; max-width: 360px; border: 1px solid var(--border); background: var(--surface-muted); overflow: hidden; }
.hero-avatar__grid { position: absolute; inset: 24px; border: 1px solid var(--border); }
.hero-avatar__node { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: var(--primary); animation: node-pulse 4s ease infinite; }
@keyframes node-pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
```

Do not use gradient fills or glow. Stagger nodes using inline `animationDelay` values in `Hero.tsx`.

- [ ] **Step 4: 添加响应式与减少动态效果**

Add:

```css
@media (max-width: 900px) {
  .experience-grid, .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hero-layout { grid-template-columns: 1fr 280px; }
}

@media (max-width: 640px) {
  .container { width: min(calc(100% - 32px), var(--container)); }
  .section { padding-block: 64px; }
  .experience-grid, .projects-grid, .skills-grid, .hero-layout { grid-template-columns: 1fr; }
  .header__nav { display: none; }
  .hero-avatar { max-width: none; }
  .expandable-card__trigger { grid-template-columns: auto 1fr auto; }
  .expandable-card__trigger time { grid-column: 2; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 5: 启动本地预览并做视觉检查**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Inspect at 1440×900, 1024×768, 390×844 and verify:

- all section content shares the same left and right container edges;
- expanded cards span their complete grid width;
- no horizontal overflow;
- no metric cards, decorative gradients, glow, floating glass panels or hover transforms; the only glass treatment is the sticky Header;
- mobile cards are single-column and buttons remain at least 44px high.

- [ ] **Step 6: Commit**

```bash
git add src/styles.css src/components/Hero.tsx
git commit -m "feat: apply dark portfolio visual system"
```

---

### Task 6: 配置 GitHub Pages 自动部署

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `vite.config.ts`
- Create: `src/config/basePath.test.ts`
- Create: `src/config/basePath.ts`

**Interfaces:**
- Produces: `pagesBase(repository, githubActions): string`.
- GitHub Actions builds `dist/`, uploads a Pages artifact and deploys the saved artifact.

- [ ] **Step 1: 把 Pages base 逻辑提取为可测试函数**

Create `src/config/basePath.test.ts`:

```ts
import { pagesBase } from './basePath'

describe('pagesBase', () => {
  it('uses root locally and for user pages repositories', () => {
    expect(pagesBase(undefined, false)).toBe('/')
    expect(pagesBase('owner/owner.github.io', true)).toBe('/')
  })

  it('uses the repository subpath for project pages', () => {
    expect(pagesBase('owner/portfolio', true)).toBe('/portfolio/')
  })
})
```

Run:

```bash
npm test -- src/config/basePath.test.ts
```

Expected: FAIL because `basePath.ts` does not exist.

- [ ] **Step 2: 实现 Pages base**

Create `src/config/basePath.ts`:

```ts
export function pagesBase(repository?: string, githubActions = false) {
  if (!githubActions || !repository) return '/'
  const repo = repository.split('/')[1] ?? ''
  return repo.endsWith('.github.io') ? '/' : `/${repo}/`
}
```

Update `vite.config.ts` to import `pagesBase` and remove the local function.

Run:

```bash
npm test -- src/config/basePath.test.ts
```

Expected: 2 tests pass.

- [ ] **Step 3: 创建官方 Pages artifact workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7
      - name: Set up Node
        uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Test
        run: npm test
      - name: Build
        run: npm run build
      - name: Configure Pages
        uses: actions/configure-pages@v6
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: ./dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 4: 验证本地 Pages 构建路径**

Run:

```bash
GITHUB_ACTIONS=true GITHUB_REPOSITORY=owner/portfolio npm run build
rg -n '/portfolio/assets/' dist/index.html
```

Expected: build exits 0 and `dist/index.html` references `/portfolio/assets/`.

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts src/config .github/workflows/deploy.yml
git commit -m "ci: deploy portfolio to GitHub Pages"
```

---

### Task 7: 最终回归、内容审计与交付

**Files:**
- Modify only if checks expose a defect.

**Interfaces:**
- Verifies all deliverables from Tasks 1–6.

- [ ] **Step 1: 运行完整测试**

Run:

```bash
npm test
```

Expected: all test files pass with zero failures.

- [ ] **Step 2: 运行生产构建**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite exit 0; `dist/` contains `index.html` and bundled assets.

- [ ] **Step 3: 审计禁止内容**

Run:

```bash
rg -ni 'github|twitter|linkedin|微信|3 段实习|2 个项目' src index.html
```

Expected: no output.

Run:

```bash
rg -ni 'linear-gradient|radial-gradient|box-shadow:.*(1[0-9]|[2-9][0-9])px|transform:.*(scale|translate)' src/styles.css
```

Expected: no decorative gradients, dramatic shadows or Hover transforms. The dot grid is an SVG data URI and must not introduce CSS gradients.

- [ ] **Step 4: 检查 Git 工作区**

Run:

```bash
git status --short
git log --oneline -7
```

Expected: clean worktree and separate commits for bootstrap, content, interaction, sections, visual system and deployment.

- [ ] **Step 5: 人工验收**

Verify in the browser:

- Header anchors reach the correct sections.
- “查看实习经历” reaches `#experience`.
- Every experience and project card expands and collapses.
- Opening a second card in one section closes the first.
- Email buttons open `mailto:13133055568@163.com`.
- Desktop 1440×900, tablet 1024×768 and mobile 390×844 align cleanly.
- Keyboard focus is visible.
- Reduced-motion mode stops the avatar pulse.

- [ ] **Step 6: Final commit if verification required fixes**

```bash
git add -A
git commit -m "fix: address portfolio verification findings"
```

Skip this commit only when Step 1–5 required no source changes.
