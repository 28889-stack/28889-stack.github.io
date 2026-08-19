import type { LucideIcon } from 'lucide-react'

export interface Seeking {
  title: string
  description: string
}

export interface Profile {
  name: string
  role: string
  location: string
  headline: string
  summary: string
  summaryDetail: string
  seeking: Seeking
  email: string
}

export interface Education {
  school: string
  degree: string
  period: string
  detail: string
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

export interface Achievement {
  title: string
  body: string
}

export interface Experience {
  id: string
  title: string
  subtitle: string
  period: string
  summary: string
  headline: string
  achievements: Achievement[]
  tags: string[]
}

export type DomainExperience = ExpandableItem

export interface ArchitectureNode {
  label: string
  description: string
}

export interface ProjectRuntime {
  input: string
  route: string
  tools: string[]
  guardrail: string
  output: string
}

export interface SystemComponent {
  label: string
  description: string
}

export type ProjectVizKind = 'pipeline' | 'nodegraph' | 'branch' | 'loop'

export interface Project extends ExpandableItem {
  viz: ProjectVizKind
  architecture: ArchitectureNode[]
  runtime: ProjectRuntime
  framework?: Framework
  components: SystemComponent[]
}

export interface FrameworkNode {
  label: string
  description?: string
}

export interface FrameworkBranch {
  title: string
  kind?: string
  steps: FrameworkNode[]
}

export interface Framework {
  mode: 'alternative' | 'parallel'
  orchestrator: string
  branches: FrameworkBranch[]
  convergence: string
  downstream: FrameworkNode[]
}

export type CapabilityPhase = 'EVALUATE' | 'DESIGN' | 'BUILD' | 'ITERATE'

export interface CapabilityFlowNode {
  label: string
  sub?: string
}

export interface Skill {
  title: string
  description: string
  icon: LucideIcon
  phase: CapabilityPhase
  variant: 'loop' | 'pipeline'
  flow: CapabilityFlowNode[]
  keywords: string[]
}
