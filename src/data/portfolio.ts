import { Database, Gauge, Terminal, Workflow } from 'lucide-react'
import type {
  DomainExperience,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from '../types/portfolio'

export const profile: Profile = {
  name: '董羽舒',
  role: 'AI 产品经理',
  location: '广州',
  headline: '把复杂的 AI 能力，转化为清晰、可用的产品体验。',
  summary:
    '关注生成式 AI、Agent 工作流、模型评测与复杂业务场景产品化，具备法律与金融复合背景。',
  email: '13133055568@163.com',
}

export const education: Education[] = [
  {
    school: '中山大学',
    degree: '法学硕士',
    period: '2024.09—2027.06',
    detail: '法学院 · 全日制',
  },
  {
    school: '西南政法大学',
    degree: '法学本科、金融学辅修',
    period: '2020.09—2024.06',
    detail: 'GPA 4.0 / 5.0 · 综合排名前 8%',
  },
]

export const qualifications = ['法律职业资格 A 证', '基金从业资格']

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

export const domainExperiences: DomainExperience[] = [
  {
    id: 'huatai',
    title: '华泰联合证券',
    subtitle: '投资银行部实习生',
    period: '2025.07—2025.11',
    summary:
      '参与行业研究、法律材料与发行底稿整理，协助推进发行人材料和信息核查。',
    details: [
      '分析发行人所在行业的产业链、发展趋势、核心驱动力与重点公司竞争力。',
      '收集并整理发行人诉讼、员工社保缴纳等法律材料，完成专项报告初稿。',
      '梳理发行人近 20 年历史重大事项，分析公司沿革的合规性。',
      '与发行方及中介机构沟通材料进度，完成主要关联方现金流核查。',
    ],
    tags: ['投资银行', '行业研究', '法律核查', '底稿整理'],
  },
  {
    id: 'szse',
    title: '深圳证券交易所',
    subtitle: '实习生',
    period: '2026.07—至今',
    summary:
      '围绕资本市场法律议题开展研究，并参与 ST 公司经营与财务信息分析。',
    details: [
      '围绕董秘制度、虚假陈述、海外制裁等资本市场议题开展研究。',
      '检索法律法规、司法案例与相关文献，梳理监管要求、裁判观点和实务争议。',
      '收集并分析 ST 公司盈利、现金流等财务信息。',
      '结合公开披露材料，关注典型经营及财务表现。',
    ],
    tags: ['资本市场', '法律研究', 'ST 公司', '财务分析'],
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
