import type { LucideIcon } from 'lucide-react'

export interface Profile {
  name: string
  role: string
  location: string
  headline: string
  summary: string
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

export type Experience = ExpandableItem
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

export interface Project extends ExpandableItem {
  architecture: ArchitectureNode[]
  runtime: ProjectRuntime
}

export interface Skill {
  title: string
  description: string
  icon: LucideIcon
}

export type EvidenceKey = 'user' | 'model' | 'eval'

export interface EvidenceDefinition {
  key: EvidenceKey
  label: string
  proof: string
  experienceIds: string[]
  tagMatches: string[]
}
