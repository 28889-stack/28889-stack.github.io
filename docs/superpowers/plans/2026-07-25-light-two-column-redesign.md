# AI 产品经理主页浅色双栏改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有暗色单栏页面改造为浅色双栏履历主页，恢复华泰联合证券与深圳证券交易所完整实习内容，并将邮箱作为唯一联系方式直接展示在左栏。

**Architecture:** 保留 Vite + React + TypeScript 与集中式内容数据。新增 `ProfileSidebar` 负责头像、教育、资格和邮箱；右侧 `PortfolioContent` 编排简介、AI 产品实习、项目、法律金融实践和能力。可展开内容改为“摘要卡片网格 + 网格后完整宽度详情面板”，避免卡片位置变化。

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, Lucide React, CSS

## Global Constraints

- 桌面端为左侧 260–290px sticky 档案栏与右侧主内容栏。
- 移动端为单列，档案栏变为顶部个人信息区。
- 页面背景 `#F5F6F8`，卡片 `#FFFFFF`，主文字 `#17181C`，点缀 `#3F5CE8`。
- 页面必须包含腾讯、同花顺、易方达基金、华泰联合证券、深圳证券交易所五段实习。
- AI 产品实习与法律金融实践分别一次只展开一段；摘要卡片位置不随展开改变。
- 邮箱 `13133055568@163.com` 是唯一外部联系方式。
- 不渲染“联系我”“Get in touch”“发送邮件”、GitHub、Twitter、LinkedIn、手机号或微信联系方式。
- 不使用暗色背景、大幅 Hero、顶部落地页导航、霓虹色或彩色发光。

---

### Task 1: 扩展真实内容模型

**Files:**
- Modify: `src/types/portfolio.ts`
- Modify: `src/data/portfolio.test.ts`
- Modify: `src/data/portfolio.ts`

- [ ] 先写失败测试，断言五段实习、两段教育、两个资格和唯一邮箱。
- [ ] 运行 `npm test -- src/data/portfolio.test.ts`，确认因数据缺失失败。
- [ ] 新增 `education`、`qualifications`、`domainExperiences` 数据及对应类型。
- [ ] 再次运行测试，确认通过。
- [ ] 提交 `feat: add education and domain experience content`。

### Task 2: 重建双栏组件与展开交互

**Files:**
- Create: `src/components/ProfileSidebar.tsx`
- Create: `src/components/PortfolioIntro.tsx`
- Create: `src/components/ExpandableCollection.tsx`
- Create: `src/components/DomainExperienceSection.tsx`
- Modify: `src/components/ExperienceSection.tsx`
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/ExpandableCard.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Delete: `src/components/Header.tsx`
- Delete: `src/components/Hero.tsx`
- Delete: `src/components/CompoundBackground.tsx`
- Delete: `src/components/ContactFooter.tsx`

- [ ] 先写失败的整页测试，断言左栏教育和邮箱、五段实习、禁止文案以及摘要卡片不因展开消失。
- [ ] 运行 `npm test -- src/App.test.tsx`，确认失败。
- [ ] 实现 `ExpandableCollection`：摘要卡片始终保留，活动详情在网格后渲染；一次只开一项。
- [ ] 实现左栏与右侧各内容模块，并删除旧暗色落地页组件。
- [ ] 运行 App 与展开卡片测试，确认通过。
- [ ] 提交 `feat: rebuild portfolio as two-column resume`。

### Task 3: 重写浅色视觉系统

**Files:**
- Modify: `src/styles.css`

- [ ] 使用统一浅色 tokens 重写 CSS。
- [ ] 桌面端实现 sticky 左栏、右栏统一对齐、三列产品实习和两列项目/法律金融实践。
- [ ] 移动端实现单列与无横向溢出。
- [ ] Hover 仅改变边框、背景或极轻阴影。
- [ ] 运行完整测试与生产构建。
- [ ] 提交 `feat: apply light two-column visual system`。

### Task 4: 浏览器验收与新版预览

**Files:**
- Modify only if browser checks expose a defect.

- [ ] 检查 1280×900 桌面双栏对齐。
- [ ] 检查 390×844 移动端无横向溢出。
- [ ] 验证五段实习展开、同组单项互斥和摘要卡片位置不变。
- [ ] 检查控制台零错误。
- [ ] 打开新版本地预览，暂停等待用户确认。
- [ ] 不配置、不推送、不部署 GitHub Pages。
