import { Database, Gauge, Terminal, Workflow } from 'lucide-react'
import type {
  DomainExperience,
  Education,
  EvidenceDefinition,
  EvidenceKey,
  Experience,
  Profile,
  Project,
  Skill,
} from '../types/portfolio'

export const profile: Profile = {
  name: '董羽舒',
  role: 'AI 产品经理',
  location: '广州',
  headline: 'Agent、评测与工作流',
  summary:
    '有腾讯、同花顺与易方达的 AI 产品实践，关注模型评测、Agent 工作流与垂类 AI 应用。',
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
      '输入层：通过全局快捷键或常驻监听接收语音，使用 ASR 生成带时间信息的文本。',
      '理解层：由 LLM 完成 create / update / delete 意图分类，抽取日程对象、时间与约束条件，并通过 Schema Validator 校验结构化结果。',
      '决策层：读取 Calendar State，使用 Conflict Resolver 检测资源与时间冲突，再由 Replanner 生成新的日程排序方案。',
      '执行层：调用 Calendar Action 写入变更，并保留确认、撤销与操作记录，降低错误修改的影响。',
    ],
    tags: ['语音交互', 'LLM', '意图识别', '动态日程'],
    architecture: [
      { label: 'Voice', description: '快捷键 / 常驻监听' },
      { label: 'ASR', description: '语音转文本' },
      { label: 'Intent', description: '意图与实体抽取' },
      { label: 'Validate', description: 'Schema 校验' },
      { label: 'Replan', description: '冲突检测与重排' },
      { label: 'Action', description: '写入 / 撤销' },
    ],
    runtime: {
      input: '“把下午三点的访谈推迟一小时，健身顺延。”',
      route: 'update_schedule → resolve_conflict → replan',
      tools: ['ASR', 'Intent Parser', 'Conflict Resolver', 'Calendar API'],
      guardrail: 'Schema 校验 · 变更确认 · Undo',
      output: '识别 2 项关联日程，完成冲突检查并生成调整方案。',
    },
  },
  {
    id: 'web-spider',
    title: 'Web Spider Skill',
    subtitle: '结构化爬虫生产工作流',
    summary:
      '将爬虫生产拆解为可澄清、可规划、可执行、可审计的结构化工作流。',
    details: [
      '规划层：Clarifier 将目标字段、范围、频率与授权边界转成声明式任务，再由 Planner 组合 Domain Profile 与 Recipe。',
      '观测层：Observer 通过 Browser / CDP 探测页面结构、交互路径和数据来源，为 Recipe 提供站点证据。',
      '执行层：Factory 组装 Toolpack，Runner 负责分页、重试、限速、结构化抽取与 JSON Schema 校验。',
      '治理层：全程保存 Evidence 与运行日志，并通过授权检查、敏感信息脱敏和候选审核控制学习闭环。',
    ],
    tags: ['Skill', 'Workflow', 'CDP', 'Recipe', '安全边界'],
    architecture: [
      { label: 'Clarify', description: '目标与边界' },
      { label: 'Observe', description: 'Browser / CDP' },
      { label: 'Profile', description: '站点知识' },
      { label: 'Recipe', description: '声明式计划' },
      { label: 'Runner', description: '执行与重试' },
      { label: 'Evidence', description: '证据与脱敏' },
    ],
    runtime: {
      input: '“提取目标站点公开页面中的产品信息，并保留来源证据。”',
      route: 'clarify → observe → assemble_recipe → execute',
      tools: ['CDP Observer', 'Domain Profile', 'Recipe Runner', 'Extractor'],
      guardrail: '授权边界 · Rate Limit · 脱敏 · Evidence',
      output: '输出结构化 JSON、字段来源和可复现的运行记录。',
    },
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
