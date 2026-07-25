# Portfolio Interaction Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a meaningful interactive AI product loop, internship evidence linkage, compact expandable project cards, and restrained section progress to the existing light two-column portfolio.

**Architecture:** Keep all portfolio copy and mappings in `src/data/portfolio.ts`. `App` owns the currently committed and temporarily previewed evidence key so the Hero and internship list can react together. Project expansion stays local to `ProjectsSection`, while a small observer hook updates the active section without adding visible navigation.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, Lucide React, CSS/SVG, native `IntersectionObserver`

## Global Constraints

- Preserve the current warm white, dark brown, and terracotta visual system.
- AI product internships remain the dominant content immediately after the Hero.
- Projects are compact by default and show `INPUT / ROUTE / OUTPUT` plus the full architecture only after activation.
- Do not add dark panels, Canvas/WebGL shaders, particle backgrounds, cursor trails, magnetic cards, 3D tilt, tabs, or scroll hijacking.
- Do not add a heavyweight UI or animation library.
- All pointer interactions must have keyboard and touch equivalents.
- Honor `prefers-reduced-motion: reduce`.
- Keep GitHub Pages compatibility and introduce no server dependency.

---

### Task 1: Define the evidence-linking contract and shared page state

**Files:**
- Modify: `src/types/portfolio.ts:1-54`
- Modify: `src/data/portfolio.ts:1-204`
- Modify: `src/data/portfolio.test.ts`
- Modify: `src/App.tsx:1-22`

**Interfaces:**
- Produces: `EvidenceKey = 'user' | 'model' | 'eval'`
- Produces: `EvidenceDefinition { key, label, proof, experienceIds, tagMatches }`
- Produces: `evidenceDefinitions: Record<EvidenceKey, EvidenceDefinition>`
- Produces: `PortfolioIntroProps` callbacks consumed by Task 2
- Produces: `ExperienceSectionProps.activeEvidence` consumed by Task 3

- [ ] **Step 1: Write the failing data-contract test**

Add to `src/data/portfolio.test.ts`:

```ts
import { evidenceDefinitions, experiences } from './portfolio'

it('maps every Hero evidence node to real internship content', () => {
  expect(Object.keys(evidenceDefinitions)).toEqual(['user', 'model', 'eval'])

  const experienceIds = new Set(experiences.map(({ id }) => id))
  Object.values(evidenceDefinitions).forEach((definition) => {
    expect(definition.proof.length).toBeGreaterThan(10)
    expect(definition.experienceIds.length).toBeGreaterThan(0)
    definition.experienceIds.forEach((id) => {
      expect(experienceIds.has(id)).toBe(true)
    })
  })
})
```

- [ ] **Step 2: Run the focused test and verify the missing export**

Run:

```bash
npm test -- --run src/data/portfolio.test.ts
```

Expected: FAIL because `evidenceDefinitions` is not exported.

- [ ] **Step 3: Add the evidence types and real-content mapping**

Append to `src/types/portfolio.ts`:

```ts
export type EvidenceKey = 'user' | 'model' | 'eval'

export interface EvidenceDefinition {
  key: EvidenceKey
  label: string
  proof: string
  experienceIds: string[]
  tagMatches: string[]
}
```

Import the two new types in `src/data/portfolio.ts`, then add after `qualifications`:

```ts
export const evidenceDefinitions: Record<EvidenceKey, EvidenceDefinition> = {
  user: {
    key: 'user',
    label: 'USER',
    proof: '腾讯：建立用户反馈分类、周期报告与 P0 问题闭环。',
    experienceIds: ['tencent'],
    tagMatches: ['用户反馈'],
  },
  model: {
    key: 'model',
    label: 'MODEL',
    proof: '同花顺与易方达：设计 Agent、RAG 与多模态理解工作流。',
    experienceIds: ['ths', 'efund'],
    tagMatches: ['Agent', 'RAG', '多模态理解', 'Graph-RAG'],
  },
  eval: {
    key: 'eval',
    label: 'EVAL',
    proof: '腾讯与同花顺：建设 Benchmark、自动化评测和 Badcase 归因机制。',
    experienceIds: ['tencent', 'ths'],
    tagMatches: ['Benchmark', '自动化评测', 'Badcase'],
  },
}
```

- [ ] **Step 4: Lift committed and preview evidence state into `App`**

Replace `src/App.tsx` with:

```tsx
import { useState } from 'react'
import { DomainExperienceSection } from './components/DomainExperienceSection'
import { ExperienceSection } from './components/ExperienceSection'
import { PortfolioIntro } from './components/PortfolioIntro'
import { ProfileSidebar } from './components/ProfileSidebar'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import type { EvidenceKey } from './types/portfolio'

export default function App() {
  const [selectedEvidence, setSelectedEvidence] =
    useState<EvidenceKey>('eval')
  const [previewEvidence, setPreviewEvidence] =
    useState<EvidenceKey | null>(null)
  const activeEvidence = previewEvidence ?? selectedEvidence

  return (
    <div className="portfolio-shell">
      <ProfileSidebar />
      <main className="portfolio-main">
        <PortfolioIntro
          activeEvidence={activeEvidence}
          selectedEvidence={selectedEvidence}
          onSelectEvidence={setSelectedEvidence}
          onPreviewEvidence={setPreviewEvidence}
        />
        <ExperienceSection activeEvidence={activeEvidence} />
        <ProjectsSection />
        <DomainExperienceSection />
        <SkillsSection />
        <footer className="simple-footer">© 2026 董羽舒</footer>
      </main>
    </div>
  )
}
```

Add these required signatures while leaving the current markup unchanged until Tasks 2 and 3:

```tsx
// PortfolioIntro.tsx
interface PortfolioIntroProps {
  activeEvidence: EvidenceKey
  selectedEvidence: EvidenceKey
  onSelectEvidence: (key: EvidenceKey) => void
  onPreviewEvidence: (key: EvidenceKey | null) => void
}

export function PortfolioIntro(props: PortfolioIntroProps) {
  void props
  // existing return block
}

// ExperienceSection.tsx
interface ExperienceSectionProps {
  activeEvidence: EvidenceKey
}

export function ExperienceSection({ activeEvidence }: ExperienceSectionProps) {
  void activeEvidence
  // existing openId state and return block
}
```

- [ ] **Step 5: Run the focused test and build**

Run:

```bash
npm test -- --run src/data/portfolio.test.ts
npm run build
```

Expected: data tests PASS and production build PASS.

- [ ] **Step 6: Commit the evidence contract**

```bash
git add src/types/portfolio.ts src/data/portfolio.ts src/data/portfolio.test.ts src/App.tsx src/components/PortfolioIntro.tsx src/components/ExperienceSection.tsx
git commit -m "feat: define portfolio evidence links"
```

---

### Task 2: Build the interactive Hero product loop

**Files:**
- Create: `src/components/InteractiveProductLoop.tsx`
- Create: `src/components/InteractiveProductLoop.test.tsx`
- Modify: `src/components/PortfolioIntro.tsx:1-41`
- Modify: `src/styles.css:449-647`

**Interfaces:**
- Consumes: `EvidenceKey` and `evidenceDefinitions` from Task 1
- Produces: `InteractiveProductLoopProps { activeEvidence, selectedEvidence, onSelectEvidence, onPreviewEvidence }`

- [ ] **Step 1: Write failing interaction and accessibility tests**

Create `src/components/InteractiveProductLoop.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InteractiveProductLoop } from './InteractiveProductLoop'

describe('InteractiveProductLoop', () => {
  it('selects evidence with an accessible pressed state', async () => {
    const user = userEvent.setup()
    const onSelectEvidence = vi.fn()
    render(
      <InteractiveProductLoop
        activeEvidence="eval"
        selectedEvidence="eval"
        onSelectEvidence={onSelectEvidence}
        onPreviewEvidence={() => undefined}
      />,
    )

    const model = screen.getByRole('button', { name: /MODEL/ })
    expect(model).toHaveAttribute('aria-pressed', 'false')
    await user.click(model)
    expect(onSelectEvidence).toHaveBeenCalledWith('model')
  })

  it('previews evidence on focus and clears the preview on blur', async () => {
    const user = userEvent.setup()
    const onPreviewEvidence = vi.fn()
    render(
      <InteractiveProductLoop
        activeEvidence="eval"
        selectedEvidence="eval"
        onSelectEvidence={() => undefined}
        onPreviewEvidence={onPreviewEvidence}
      />,
    )

    const userNode = screen.getByRole('button', { name: /USER/ })
    await user.tab()
    expect(userNode).toHaveFocus()
    expect(onPreviewEvidence).toHaveBeenCalledWith('user')
    await user.tab()
    expect(onPreviewEvidence).toHaveBeenCalledWith(null)
  })
})
```

- [ ] **Step 2: Run the test and verify the component is missing**

Run:

```bash
npm test -- --run src/components/InteractiveProductLoop.test.tsx
```

Expected: FAIL because `InteractiveProductLoop` does not exist.

- [ ] **Step 3: Implement the semantic loop**

Create `src/components/InteractiveProductLoop.tsx`:

```tsx
import { evidenceDefinitions } from '../data/portfolio'
import type { EvidenceKey } from '../types/portfolio'

interface InteractiveProductLoopProps {
  activeEvidence: EvidenceKey
  selectedEvidence: EvidenceKey
  onSelectEvidence: (key: EvidenceKey) => void
  onPreviewEvidence: (key: EvidenceKey | null) => void
}

const keys: EvidenceKey[] = ['user', 'model', 'eval']

export function InteractiveProductLoop({
  activeEvidence,
  selectedEvidence,
  onSelectEvidence,
  onPreviewEvidence,
}: InteractiveProductLoopProps) {
  const active = evidenceDefinitions[activeEvidence]

  return (
    <div className="product-loop" aria-label="AI 产品闭环">
      <svg className="product-loop__lines" viewBox="0 0 200 150" aria-hidden="true">
        <path className={activeEvidence === 'user' ? 'is-active' : ''} d="M100 75 L28 28" />
        <path className={activeEvidence === 'model' ? 'is-active' : ''} d="M100 75 L172 30" />
        <path className={activeEvidence === 'eval' ? 'is-active' : ''} d="M100 75 L166 122" />
      </svg>
      <span className="product-loop__core">
        <strong>AI</strong>
        <small>PRODUCT</small>
      </span>
      {keys.map((key) => {
        const definition = evidenceDefinitions[key]
        return (
          <button
            type="button"
            key={key}
            className={`product-loop__node product-loop__node--${key}${activeEvidence === key ? ' is-active' : ''}`}
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
```

- [ ] **Step 4: Integrate it into `PortfolioIntro`**

Give `PortfolioIntro` the same four props and replace the old `.product-system` block with:

```tsx
<InteractiveProductLoop
  activeEvidence={activeEvidence}
  selectedEvidence={selectedEvidence}
  onSelectEvidence={onSelectEvidence}
  onPreviewEvidence={onPreviewEvidence}
/>
```

Remove the old `aria-hidden` product-system markup.

- [ ] **Step 5: Replace the old orbit CSS with restrained SVG interaction CSS**

In `src/styles.css`, replace selectors from `.product-system` through `@keyframes node-hover` with styles for `.product-loop`, `.product-loop__lines`, `.product-loop__core`, `.product-loop__node`, `.product-loop__proof`, active/focus states, and the three fixed node positions. Use:

- `width: 198px; min-height: 166px`
- warm surface and 1px border
- `stroke-dasharray`/`stroke-dashoffset` only for the active SVG path
- 44px minimum node hit targets
- no node auto-floating animation
- proof text at 10–11px with a two-line maximum

Also remove the `title-dot` animation and leave the title dot static.

- [ ] **Step 6: Run the component test, app test, and build**

Run:

```bash
npm test -- --run src/components/InteractiveProductLoop.test.tsx src/App.test.tsx
npm run build
```

Expected: all selected tests PASS and build PASS.

- [ ] **Step 7: Commit the Hero interaction**

```bash
git add src/components/InteractiveProductLoop.tsx src/components/InteractiveProductLoop.test.tsx src/components/PortfolioIntro.tsx src/styles.css
git commit -m "feat: add interactive AI product loop"
```

---

### Task 3: Add the internship evidence rail and synchronized highlighting

**Files:**
- Create: `src/components/ExperienceSection.test.tsx`
- Modify: `src/components/ExperienceSection.tsx:1-89`
- Modify: `src/styles.css:950-1076,1725-1761`

**Interfaces:**
- Consumes: `ExperienceSectionProps { activeEvidence: EvidenceKey }`
- Consumes: `evidenceDefinitions[activeEvidence].experienceIds` and `.tagMatches`

- [ ] **Step 1: Write the failing evidence-rail test**

Create `src/components/ExperienceSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { ExperienceSection } from './ExperienceSection'

describe('ExperienceSection evidence rail', () => {
  it('highlights the companies and tags mapped to the active evidence', () => {
    const { rerender } = render(<ExperienceSection activeEvidence="user" />)
    expect(screen.getByTestId('experience-tencent')).toHaveClass('is-evidence')
    expect(screen.getByTestId('experience-ths')).not.toHaveClass('is-evidence')

    rerender(<ExperienceSection activeEvidence="eval" />)
    expect(screen.getByTestId('experience-tencent')).toHaveClass('is-evidence')
    expect(screen.getByTestId('experience-ths')).toHaveClass('is-evidence')
    expect(screen.getByText('Badcase')).toHaveClass('is-evidence-tag')
  })
})
```

- [ ] **Step 2: Run it and verify the prop/classes are absent**

Run:

```bash
npm test -- --run src/components/ExperienceSection.test.tsx
```

Expected: FAIL because the evidence classes are not rendered.

- [ ] **Step 3: Implement the evidence mapping in `ExperienceSection`**

Add the prop and mapping:

```tsx
interface ExperienceSectionProps {
  activeEvidence: EvidenceKey
}

export function ExperienceSection({ activeEvidence }: ExperienceSectionProps) {
  const evidence = evidenceDefinitions[activeEvidence]
  // keep the existing openId state
```

For each experience calculate:

```tsx
const isEvidence = evidence.experienceIds.includes(experience.id)
```

Render `data-testid={`experience-${experience.id}`}` and append `is-evidence` to the article class. Add an accessible decorative rail before the trigger:

```tsx
<span className="experience-row__rail" aria-hidden="true">
  <i />
</span>
```

For each visible tag append `is-evidence-tag` when `evidence.tagMatches.includes(tag)`.

- [ ] **Step 4: Add the rail and synchronized highlight styles**

In `src/styles.css`:

- reserve 18px on the left of `.experience-list`
- connect rows with one continuous 1px pseudo-element
- use an 8px circular `.experience-row__rail i`
- use `box-shadow` and border/color changes for `.is-evidence`
- animate only opacity, color, border-color, and the node fill for 220ms
- keep `.is-open` visually distinct from `.is-evidence`
- ensure the rail does not reduce 44px trigger targets

- [ ] **Step 5: Run evidence, app, and build checks**

Run:

```bash
npm test -- --run src/components/ExperienceSection.test.tsx src/App.test.tsx
npm run build
```

Expected: selected tests PASS and build PASS.

- [ ] **Step 6: Commit the evidence rail**

```bash
git add src/components/ExperienceSection.tsx src/components/ExperienceSection.test.tsx src/styles.css
git commit -m "feat: link hero evidence to internships"
```

---

### Task 4: Convert projects to compact expandable cards

**Files:**
- Create: `src/components/ProjectsSection.test.tsx`
- Create: `src/components/ProjectDetailPanel.tsx`
- Modify: `src/components/ProjectsSection.tsx:1-33`
- Modify: `src/components/ProjectCaseStudy.tsx:1-75`
- Modify: `src/styles.css:1078-1385,1763-1934,2106-2108,2234-2265`

**Interfaces:**
- Produces: `ProjectCaseStudyProps { project, index, icon, isOpen, onToggle }`
- Produces: `ProjectDetailPanelProps { project, panelId }`
- `ProjectsSection` owns `openId: string | null`

- [ ] **Step 1: Write failing project expansion tests**

Create `src/components/ProjectsSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsSection } from './ProjectsSection'

describe('ProjectsSection', () => {
  it('keeps runtime details hidden until a project is opened', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    expect(screen.queryByText('SIMULATED RUN')).not.toBeInTheDocument()
    const voice = screen.getByRole('button', { name: '展开语音日程项目' })
    expect(voice).toHaveAttribute('aria-expanded', 'false')

    await user.click(voice)
    expect(screen.getByText('SIMULATED RUN')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '收起语音日程项目' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('allows only one project detail panel at a time', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    await user.click(screen.getByRole('button', { name: '展开语音日程项目' }))
    expect(screen.getByText(/把下午三点的访谈/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '展开Web Spider Skill项目' }))
    expect(screen.queryByText(/把下午三点的访谈/)).not.toBeInTheDocument()
    expect(screen.getByText(/提取目标站点公开页面/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the tests and verify runtime is currently always visible**

Run:

```bash
npm test -- --run src/components/ProjectsSection.test.tsx
```

Expected: FAIL because `SIMULATED RUN` is visible before interaction and no project toggle exists.

- [ ] **Step 3: Reduce `ProjectCaseStudy` to a semantic summary trigger**

Replace the current project article with a button-based summary. It must render:

- project number and icon
- title and subtitle
- `project.tags.slice(0, 3)`
- `project.architecture.slice(0, 3)` as `.project-preview-flow`
- a decorative `ChevronDown`
- `aria-expanded`, `aria-controls={`${project.id}-project-details`}`, and the exact labels used by the tests

Do not render `.runtime-console` or the full `.architecture-flow` from this component.

- [ ] **Step 4: Move expanded content into `ProjectDetailPanel`**

Create `src/components/ProjectDetailPanel.tsx` with:

```tsx
import type { Project } from '../types/portfolio'

interface ProjectDetailPanelProps {
  project: Project
  panelId: string
}

export function ProjectDetailPanel({
  project,
  panelId,
}: ProjectDetailPanelProps) {
  return (
    <article className="project-detail-panel" id={panelId}>
      <div className="runtime-console">
        <div className="runtime-console__bar">
          <span>SIMULATED RUN</span>
          <span>结构演示</span>
        </div>
        <div className="runtime-console__body">
          <div className="runtime-line"><span>INPUT</span><p>{project.runtime.input}</p></div>
          <div className="runtime-line runtime-line--route"><span>ROUTE</span><code>{project.runtime.route}</code></div>
          <div className="runtime-output"><span>OUTPUT</span><p>{project.runtime.output}</p></div>
        </div>
      </div>
      <div className="architecture-flow" aria-label={`${project.title}项目结构`}>
        {project.architecture.map((node, index) => (
          <div className="architecture-flow__step" key={node.label}>
            <span className="architecture-flow__node">
              <strong>{node.label}</strong>
              <small>{node.description}</small>
            </span>
            {index < project.architecture.length - 1 && (
              <span className="architecture-flow__beam" aria-hidden="true"><i /></span>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}
```

- [ ] **Step 5: Manage single-open state in `ProjectsSection`**

Add `useState<string | null>(null)`. Render both summary cards in `.project-showcase`, then render exactly one `ProjectDetailPanel` after the summary grid when `openId` is non-null. Toggle the current id back to `null` on a second click.

For mobile ordering, use CSS `display: contents` only if it preserves semantics in the target browsers; otherwise keep the shared panel below both summaries. Do not duplicate panel DOM.

- [ ] **Step 6: Replace the project layout styles**

Update the project CSS so:

- `.project-showcase` remains a two-column grid at desktop widths
- `.project-case` default height is approximately 145–170px
- `.project-case__trigger` fills the card and has no browser-default button styles
- `.project-preview-flow` contains three compact nodes and two lines
- `.project-detail-panel` spans the entire section content width
- `.runtime-console` remains warm `#f5eee7`
- no project detail selector uses a black or near-black background
- at `max-width: 1080px` and `620px`, summaries and detail panel are one column with no overflow

Delete obsolete `.project-case--reverse`, `.project-case__details`, `.runtime-tools`, `.runtime-guardrail`, and dark runtime overrides that are no longer rendered.

- [ ] **Step 7: Run project, app, and build checks**

Run:

```bash
npm test -- --run src/components/ProjectsSection.test.tsx src/App.test.tsx
npm run build
```

Expected: selected tests PASS and build PASS.

- [ ] **Step 8: Commit compact projects**

```bash
git add src/components/ProjectsSection.tsx src/components/ProjectsSection.test.tsx src/components/ProjectCaseStudy.tsx src/components/ProjectDetailPanel.tsx src/styles.css
git commit -m "feat: make project cards compact and expandable"
```

---

### Task 5: Add chapter progress and remove competing decorative motion

**Files:**
- Create: `src/hooks/useSectionProgress.ts`
- Create: `src/hooks/useSectionProgress.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css:91-175,420-447,649-675,1725-2017,2299-2308`

**Interfaces:**
- Produces: `useSectionProgress(sectionIds: string[]): string`
- `App` renders `data-active-section={activeSection}` on `.portfolio-main`

- [ ] **Step 1: Write the failing observer-hook test**

Create `src/hooks/useSectionProgress.test.tsx`:

```tsx
import { act, render, screen } from '@testing-library/react'
import { useSectionProgress } from './useSectionProgress'

let observerCallback: IntersectionObserverCallback

class ObserverMock {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback
  }
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds = []
}

function Harness() {
  const active = useSectionProgress(['experience', 'projects'])
  return (
    <>
      <section id="experience" />
      <section id="projects" />
      <output>{active}</output>
    </>
  )
}

it('tracks the strongest visible section and reveals it once', () => {
  vi.stubGlobal('IntersectionObserver', ObserverMock)
  render(<Harness />)
  expect(screen.getByText('experience')).toBeInTheDocument()

  const projects = document.getElementById('projects')!
  act(() => {
    observerCallback(
      [{
        target: projects,
        isIntersecting: true,
        intersectionRatio: 0.7,
      } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )
  })

  expect(screen.getByText('projects')).toBeInTheDocument()
  expect(projects).toHaveClass('is-revealed')

  act(() => {
    observerCallback(
      [{
        target: projects,
        isIntersecting: false,
        intersectionRatio: 0,
      } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )
  })
  expect(projects).toHaveClass('is-revealed')
})
```

Assert that:

1. the initial value is `experience`;
2. invoking the observer callback with `projects` at `intersectionRatio: 0.7` changes the output to `projects`;
3. the visible section receives the `is-revealed` class once and keeps it after leaving the viewport.

- [ ] **Step 2: Run the focused test and verify the hook is missing**

Run:

```bash
npm test -- --run src/hooks/useSectionProgress.test.tsx
```

Expected: FAIL because `useSectionProgress` does not exist.

- [ ] **Step 3: Implement the observer hook**

Create `src/hooks/useSectionProgress.ts`:

```ts
import { useEffect, useState } from 'react'

export function useSectionProgress(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')
  const sectionKey = sectionIds.join('|')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          }
        })

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: '-18% 0px -52%', threshold: [0.2, 0.45, 0.7] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionKey])

  return activeSection
}
```

- [ ] **Step 4: Connect active section state in `App`**

Call:

```tsx
const activeSection = useSectionProgress([
  'experience',
  'projects',
  'domain-experience',
  'skills',
])
```

Add `data-active-section={activeSection}` to `.portfolio-main`. `DomainExperienceSection` already uses `id="domain-experience"` and `SkillsSection` already uses `id="skills"`, so no section-id rewrite is required.

- [ ] **Step 5: Implement restrained progress and reveal CSS**

In `src/styles.css`:

- remove the existing automatic `.content-section` load animation and `nth-of-type` delays
- default `.content-section` to `opacity: 0; transform: translateY(8px)`
- `.content-section.is-revealed` restores opacity/transform once
- add a thin line beside `.section-index`
- select the active section using `.portfolio-main[data-active-section="experience"] #experience`, and equivalent selectors for all four ids
- remove the animated top beam and make any remaining line static
- reduce the avatar to one slow outer ring, hiding extra satellites/beam on small screens
- keep hover changes on capability cards but remove vertical lift and sweep effects
- under `prefers-reduced-motion`, force all sections visible and remove SVG stroke animation

- [ ] **Step 6: Run the complete automated suite**

Run:

```bash
npm test -- --run
npm run build
git diff --check
```

Expected: all tests PASS, build PASS, and `git diff --check` prints nothing.

- [ ] **Step 7: Commit chapter progress and motion cleanup**

```bash
git add src/hooks/useSectionProgress.ts src/hooks/useSectionProgress.test.tsx src/App.tsx src/styles.css
git commit -m "feat: add restrained section progress"
```

---

### Task 6: Perform visual, responsive, and interaction verification

**Files:**
- Modify if required by findings: `src/styles.css`
- Modify if required by findings: relevant component test

**Interfaces:**
- Consumes: completed Tasks 1–5
- Produces: verified desktop/mobile preview with no deployment

- [ ] **Step 1: Verify the clean desktop state**

Open `http://127.0.0.1:5173/` at 1280px width and confirm:

- Hero loop is the only strong first-screen interaction
- internships are visible immediately after Hero
- project summaries fit in approximately 145–170px height
- project details are absent by default
- no dark project block appears
- all right-column section boundaries align

- [ ] **Step 2: Verify all interactive paths**

Use pointer and keyboard:

- preview and select USER, MODEL, and EVAL
- verify each proof sentence and internship highlight
- expand each internship and confirm only one is open
- expand each project and confirm only one detail panel is open
- collapse the active project
- tab through every interactive target and confirm visible focus

- [ ] **Step 3: Verify responsive behavior**

At 390px width confirm:

- no horizontal overflow
- Hero nodes remain available as 44px controls
- project summaries are single-column
- expanded architecture scrolls only inside its flow if necessary
- chapter progress adds no fixed mobile control

- [ ] **Step 4: Verify reduced motion and runtime health**

Emulate `prefers-reduced-motion: reduce` and confirm:

- no orbit, path-drawing, section-rise, scan, or pulse motion continues
- every section is visible immediately
- evidence and expansion state changes remain understandable
- the browser console has no errors

- [ ] **Step 5: Fix only verification findings and rerun checks**

For each visual or accessibility finding, add or adjust the narrowest relevant assertion, apply the smallest scoped fix, then run:

```bash
npm test -- --run
npm run build
git diff --check
```

Expected: all tests PASS, build PASS, and no whitespace errors.

- [ ] **Step 6: Commit verification fixes**

If files changed:

```bash
git add src
git commit -m "fix: polish portfolio interaction details"
```

If no files changed, do not create an empty commit.
