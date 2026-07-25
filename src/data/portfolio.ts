import { Database, Gauge, Terminal, Workflow } from 'lucide-react'
import type {
  Experience,
  Profile,
  Project,
  Skill,
} from '../types/portfolio'

export const profile: Profile = {
  name: '董羽舒',
  role: 'AI 产品经理',
  headline: '把复杂的 AI 能力，转化为清晰、可用的产品体验。',
  summary:
    '关注生成式 AI、Agent 工作流、模型评测与复杂业务场景产品化，具备法律与金融复合背景。',
  email: '13133055568@163.com',
}

export const experiences: Experience[] = [
  {
    id: 'tencent',
    title: '腾讯',
    subtitle: 'AI 产品经理实习生｜微信事业部',
    period: '2026.02—2026.06',
    summary:
      '负责文字整理、意图识别 Benchmark、自动化评测与用户反馈闭环，并参与跨设备文件功能设计。',
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
    summary:
      '搭建 Agent 端到端评测体系，参与 SFT 数据建设与智能金融问答工作流设计。',
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
    summary:
      '用自然语言完成日程的新建、修改与删除，让日程随突发变化动态重组。',
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
    summary:
      '将爬虫生产拆解为可澄清、可规划、可执行、可审计的结构化工作流。',
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
  {
    title: 'AI 产品评测',
    description:
      '设计 Benchmark、评测指标、自动化 Pipeline 与 Badcase 归因机制。',
    icon: Gauge,
  },
  {
    title: 'Agent 与工作流设计',
    description:
      '围绕用户意图、任务路由、工具调用和多轮交互设计 AI 产品链路。',
    icon: Workflow,
  },
  {
    title: 'RAG 与数据闭环',
    description:
      '参与 RAG、Graph-RAG、SFT 数据集和合成评测数据建设。',
    icon: Database,
  },
  {
    title: 'Vibe Coding 开发',
    description:
      '使用 Codex、Claude Code 等工具，将产品构想实现为 Skill、RAG Workflow 和轻量 Agent 原型。',
    icon: Terminal,
  },
]
