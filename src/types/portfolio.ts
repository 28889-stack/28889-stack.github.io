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
export type Project = ExpandableItem
export type DomainExperience = ExpandableItem

export interface Skill {
  title: string
  description: string
  icon: LucideIcon
}
