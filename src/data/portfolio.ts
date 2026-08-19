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
  headline: 'Agent、评测与工作流',
  summary:
    '曾在腾讯、同花顺、易方达等机构参与 AI 产品实践，能够独立完成轻量agent应用开发，了解模型评测、Agent 工作流以及垂类应用。',
  summaryDetail:
    '熟悉 Benchmark、自动化评测与 Badcase 归因，能够设计意图识别、任务路由、工具调用和多轮交互链路；具备法律与金融背景，并能使用 Python 与 AI 编程工具快速搭建 Skill、RAG Workflow 和轻量 Agent 原型。',
  seeking: {
    title: '正在寻找 AI 产品经理相关机会',
    description:
      '关注模型侧的评测、数据与迭代，也关注应用侧的 Agent、工作流与用户体验。',
  },
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
    degree: '法学、金融学',
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
    headline: '意图识别 Benchmark 与自动化评测 Pipeline',
    achievements: [
      {
        title: '训练集与 Benchmark 建设',
        body: '建设“文字整理”训练集，设计用户表达分类、标注规范与评测标准。',
      },
      {
        title: '意图识别评测体系',
        body: '搭建意图识别 Benchmark 与自动化评测 Pipeline，人机评估对齐度 > 85%。',
      },
      {
        title: '用户反馈闭环',
        body: '建立反馈分类、周期报告与 P0 问题快速汇报机制，缩短问题响应链路。',
      },
      {
        title: '跨设备文件功能',
        body: '参与产品架构、交互流程与异常处理设计，覆盖多端文件流转场景。',
      },
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
    headline: 'Agent 端到端评测与智能金融问答工作流',
    achievements: [
      {
        title: 'Agent 评测体系',
        body: '拆分端到端效果、RAG 质量与双轨并行评测链路，覆盖完整对话链路。',
      },
      {
        title: 'Badcase 归因闭环',
        body: '建立常态化归因机制，形成“发现—定位—算法迭代”的持续改进闭环。',
      },
      {
        title: 'SFT 数据建设',
        body: '围绕业务逻辑设计数据规范并合成评测数据，支撑模型微调与验证。',
      },
      {
        title: '意图路由工作流',
        body: '设计六级前端意图路由，支持问答分流、数据库挂载与多轮对话。',
      },
    ],
    tags: ['Agent', 'RAG', 'SFT', 'Badcase', 'Intent Router'],
  },
  {
    id: 'efund',
    title: '易方达基金',
    subtitle: 'AI 应用实习生',
    period: '2026.06—2026.07',
    summary: '参与多模态材料解析与合规审核产品链路设计。',
    headline: '多模态材料解析与合规审核产品链路',
    achievements: [
      {
        title: '合规审核链路',
        body: '面向扫描件、图片、PDF 等非结构化材料设计合规审核产品链路。',
      },
      {
        title: '多模态识别',
        body: '设计文件分类、OCR 与事件理解流程，提取关键材料要素。',
      },
      {
        title: 'Graph-RAG 关联',
        body: '用轻量 Graph-RAG 建立材料关联，提升复杂事件理解与结果追溯能力。',
      },
      {
        title: '规则校验提速',
        body: '规则匹配输出初步合规结论，迭代后运行速度提升 50%。',
      },
    ],
    tags: ['多模态理解', 'OCR', 'Graph-RAG', '合规审核', '规则引擎'],
  },
]

export const projects: Project[] = [
  {
    id: 'xianyue',
    title: '弦月金融研究助手',
    subtitle: '基于LangGraph的多Agent研究助手，设计Agent协作模式与优化检索策略提高研究深度和检索效率，在关键节点封装Pi提升可拓展性',
    link: 'https://investment-research-agent-production-bc78.up.railway.app/',
    reports: {
      technical: '/reports/hengtong-technical.html',
      fundamental: '/reports/jiayou-fundamental.html',
    },
    viz: 'branch',
    summary:
      '面向个股研究的多 Agent 投研系统。技术面融合多维技术分析与 Kronos 金融模型；基本面通过多 Agent 协作完成商业、行业、财务与估值研究，提升自动化投研的研究深度与覆盖范围。',
    details: [
      '构建多 Agent 深度研究框架：基于 LangGraph 设计 Lead + Specialist 协作机制，通过角色分工、任务编排、结果回流与 Loop 迭代，使研究主线随专业研究结果持续修正，解决单 Agent 研究浅层化问题。',
      '优化多来源检索策略：设计分层、多来源检索流程，并支持 Agent 根据研究问题自主补充检索，提升信息覆盖度与复杂问题下的研究广度。',
      '建立检索信息可信度机制：设计 Search Provider 层，对信息源进行准入控制、来源鉴权与二次验证，降低低质量或不可靠信息进入正式研究结果的概率。',
      '封装可扩展 Agent Runtime：在关键研究节点接入并封装 Pi Agent，以统一的角色配置、工具权限、上下文加载与结构化输出管理不同 Agent，降低研究节点耦合并提升扩展新角色、新工具与新模型的能力。',
    ],
    tags: ['Multi-Agent', 'LangGraph', 'Kronos', '投研报告', 'Search Provider'],
    architecture: [
      { label: 'Orchestrator', description: 'LangGraph 多 Agent 编排' },
      { label: '技术面 Agent', description: 'Kronos 量化分析' },
      { label: '基本面 Agents', description: '商业/行业/财务/估值' },
      { label: 'Pi Agent Runtime', description: '统一角色与工具封装' },
      { label: 'Search Provider', description: '来源准入与鉴权' },
      { label: '投研报告', description: '证据 / 假设 / 结论' },
    ],
    runtime: {
      input: '“对某公司进行个股深度研究，覆盖技术面与基本面，并给出投资逻辑。”',
      route: 'orchestrate → technical_analysis + fundamental_research → assemble',
      tools: ['LangGraph', 'Kronos', 'Search Provider', 'Pi Agent Runtime'],
      guardrail: 'Search Provider 准入 · 来源鉴权 · 二次验证',
      output: '输出含证据、假设与结论的个股投研报告，并标注信息可信度。',
    },
    framework: {
      mode: 'alternative',
      orchestrator: 'LangGraph 多 Agent Orchestrator',
      branches: [
        {
          title: '技术面',
          steps: [
            { label: 'Technical Agent' },
            { label: 'Python Tools' },
            { label: 'Kronos' },
            { label: 'Assembly Agent' },
          ],
        },
        {
          title: '基本面',
          steps: [
            { label: 'Lead Agent' },
            { label: 'Specialist Agents' },
            { label: 'Lead Review + Loop' },
            { label: 'Financial / Valuation' },
            { label: 'Writer' },
          ],
        },
      ],
      convergence: 'Pi Agent Runtime',
      downstream: [
        { label: 'Search Provider / Data / Tools' },
        { label: 'Evidence / Assumption / Result' },
        { label: '投研报告' },
      ],
    },
    components: [
      { label: 'Orchestrator', description: 'LangGraph 任务编排与路由' },
      { label: 'Specialist Agents', description: '商业 / 行业 / 财务 / 估值研究' },
      { label: 'Pi Agent Runtime', description: '统一角色、工具与上下文' },
      { label: 'Search Provider', description: '来源准入、鉴权与验证' },
      { label: 'Kronos', description: '多维技术分析与量化模型' },
      { label: 'Evidence Layer', description: '证据、假设与结论管理' },
    ],
  },
{
    id: 'nutrispark',
    title: 'NutriSpark',
    subtitle: '基于NestJS与6阶段状态机的小红书营销Agent平台，针对企业真实营销链路设计人机协同流程提高内容生产效率与合规水位，以Memory系统沉淀可复用经验提升可拓展性',
    link: 'https://dcniaqwtmoca.feishuapp.com/app/app_17c57g0t8tb/',
    viz: 'branch',
    summary:
      '基于人机协同的 Agentic workflow，串联趋势洞察、内容生成、合规检测与多平台发布，打通品牌内容增长全链路。',
    details: [
      '前端 (React 19 + Vite)：4 个页面，基于 shadcn/ui + Tailwind 4 构建，通过 axiosForBackend 与后端通信。',
      '后端 (NestJS 10 + Drizzle ORM)：Controller → Service → Orchestrator → Agent(LLM)，经 db.transaction 与 LlmClient 驱动业务；业务以 6 阶段状态机推进（L2 检索 → L3 分析 → L4 选题 → L5 确认 → CAMPAIGN_SELECT → L6 脚本 → FINAL 归档）。',
      '独立域：以 SPU 为业务根，派生 Task / KOL Campaign / KOC Campaign；Review 作为独立复盘，不依赖流水线运行。',
      'Memory 系统（自进化经验）：生成过程与 Review 回流双源写入 experience，并规划向量检索注入；以 Levenshtein 修改比例 < 50% 记为 GOOD、≥ 50% 记为 BAD。',
      '检索与发布：Python 检索服务（FastAPI + httpx + Playwright）经任务 + 回调或 5s 轮询兜底返回结果，封装小红书 / B站 / 蒲公英 Skill 实现多平台采集与发布。',
    ],
    tags: ['Agentic Workflow', 'NestJS', '人机协同', '多平台发布', 'Memory 自进化'],
    architecture: [
      { label: '前端', description: 'React 19 + Vite · shadcn/ui + Tailwind 4' },
      { label: '后端', description: 'NestJS 10 · Drizzle ORM' },
      { label: '6 阶段流水线', description: '检索 → 分析 → 选题 → 确认 → 脚本 → 归档' },
      { label: 'Memory 系统', description: 'experience 双源写入 + 向量检索' },
      { label: 'PostgreSQL', description: '12 张表 · task/spu/review/experience' },
      { label: 'Python 检索', description: 'FastAPI + Playwright · 多平台采集' },
    ],
    runtime: {
      input: '“为某新品规划一周小红书内容，并先做合规检测。”',
      route: 'L2 检索 → L3 分析 → L4 选题 → L5 确认 → CAMPAIGN_SELECT → L6 脚本 → FINAL 归档',
      tools: ['NestJS Orchestrator', '6 阶段状态机', 'Memory 系统', 'Python 检索服务'],
      guardrail: '合规检测 · L5 人工确认 · Review 复盘回流',
      output: '输出跨平台内容脚本与发布计划，并回流真实效果持续优化经验。',
    },
    framework: {
      mode: 'parallel',
      orchestrator: 'NestJS 10 · Drizzle ORM',
      branches: [
        {
          title: '业务流水线 · 6 阶段状态机',
          steps: [
            { label: 'L2 检索' },
            { label: 'L3 分析' },
            { label: 'L4 选题' },
            { label: 'L5 确认' },
            { label: 'CAMPAIGN_SELECT' },
            { label: 'L6 脚本' },
            { label: 'FINAL 归档' },
          ],
        },
        {
          title: '独立域',
          steps: [
            { label: 'SPU (业务根)' },
            { label: 'Task / KOL / KOC' },
            { label: 'Review (复盘)' },
          ],
        },
        {
          title: 'Memory 系统 · 自进化',
          steps: [
            { label: '生成过程写入' },
            { label: 'experience (双源)' },
            { label: '向量检索注入 (规划中)' },
          ],
        },
      ],
      convergence: 'Agent (LLM)',
      downstream: [
        { label: '前端 React 19 + Vite' },
        { label: 'PostgreSQL (12 表)' },
        { label: 'Python 检索服务 · 小红书/B站/蒲公英' },
      ],
    },
    components: [
      { label: 'Orchestrator', description: 'NestJS 任务编排与 Agent(LLM) 驱动' },
      { label: '6 阶段业务流水线', description: 'L2 检索 → L3 分析 → L4 选题 → L5 确认 → CAMPAIGN_SELECT → L6 脚本 → FINAL 归档' },
      { label: 'Memory 系统', description: '生成过程与 Review 双源写入 experience，规划向量检索注入' },
      { label: 'Python 检索服务', description: 'FastAPI + httpx + Playwright 多平台采集与回调' },
      { label: '多平台发布 Skill', description: '小红书 / B站 / 蒲公英 发布封装' },
      { label: '合规检测', description: '内容风险扫描，L5 阶段人工确认' },
    ],
  },
{
    id: 'voice-schedule',
    title: '语音日程',
    subtitle: '基于LLM的自然语言日程助手，设计意图识别与冲突解决策略提高日程动态调整效率与准确性，在关键节点封装Replanner与操作日志提升可回溯性与可扩展性',
    link: 'https://github.com/28889-stack/voice-schedule-web',
    viz: 'pipeline',
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
    components: [
      { label: 'Intent Engine', description: '意图分类与实体抽取' },
      { label: 'Schema Validator', description: '结构化结果校验' },
      { label: 'Conflict Resolver', description: '时间与资源冲突检测' },
      { label: 'Replanner', description: '日程动态重排' },
      { label: 'Calendar Action', description: '写入 / 确认 / 撤销' },
      { label: 'Operation Log', description: '操作记录与回滚' },
    ],
  },
{
    id: 'web-spider',
    title: 'Web Spider Skill',
    subtitle: '面向各类网页的通用爬虫工作流，将爬虫生产（规划/组装）与运行（探测/执行）解耦，通过先探测、再规划、后组装的方式提升对各类网页的适配能力与可审计性',
    viz: 'nodegraph',
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
    components: [
      { label: 'Clarifier', description: '目标与授权边界澄清' },
      { label: 'Observer', description: 'Browser / CDP 页面探测' },
      { label: 'Domain Profile', description: '站点知识沉淀' },
      { label: 'Recipe Runner', description: '执行、重试与限速' },
      { label: 'Extractor', description: '结构化字段抽取' },
      { label: 'Evidence Store', description: '证据留痕与脱敏' },
    ],
  }
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
      '设计 Benchmark、评测指标、自动化 Pipeline 与 Badcase 归因机制，让模型迭代有据可依。',
    icon: Gauge,
    phase: 'EVALUATE',
    variant: 'loop',
    flow: [
      { label: 'DATASET', sub: '数据集' },
      { label: 'EVAL', sub: '评测' },
      { label: 'ANALYSIS', sub: '归因' },
      { label: 'FEEDBACK', sub: '反馈' },
    ],
    keywords: ['BENCHMARK', 'AUTOMATION', 'BADCASE', 'METRICS'],
  },
  {
    title: 'Agent 与工作流设计',
    description:
      '围绕用户意图、任务路由、工具调用与多轮交互，设计可编排、可观测的 AI 产品链路。',
    icon: Workflow,
    phase: 'DESIGN',
    variant: 'loop',
    flow: [
      { label: 'INTENT', sub: '意图' },
      { label: 'ROUTING', sub: '路由' },
      { label: 'TOOLS', sub: '工具' },
      { label: 'MEMORY', sub: '记忆' },
    ],
    keywords: ['INTENT ROUTER', 'TOOL CALL', 'MULTI-TURN', 'ORCHESTRATION'],
  },
  {
    title: 'RAG 与数据闭环',
    description:
      '参与 RAG、Graph-RAG、SFT 数据集与合成评测数据建设，让模型从数据闭环中持续学习。',
    icon: Database,
    phase: 'BUILD',
    variant: 'loop',
    flow: [
      { label: 'INGEST', sub: '入库' },
      { label: 'RETRIEVE', sub: '检索' },
      { label: 'GENERATE', sub: '生成' },
      { label: 'LEARN', sub: '学习' },
    ],
    keywords: ['GRAPH-RAG', 'SFT', 'SYNTH DATA', 'RETRIEVAL'],
  },
  {
    title: 'Vibe Coding 开发',
    description:
      '使用 Codex、Claude Code 等工具，将产品构想实现为 Skill、RAG Workflow 与轻量 Agent 原型。',
    icon: Terminal,
    phase: 'ITERATE',
    variant: 'pipeline',
    flow: [
      { label: 'IDEA', sub: '构想' },
      { label: 'PROTOTYPE', sub: '原型' },
      { label: 'SKILL', sub: '技能' },
      { label: 'DEPLOY', sub: '部署' },
    ],
    keywords: ['CODEX', 'CLAUDE CODE', 'PROTOTYPE', 'SKILL'],
  },
]
