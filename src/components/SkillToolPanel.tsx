import { CheckCircle2, Play, TerminalSquare } from 'lucide-react'
import { useState } from 'react'
import { skills } from '../data/portfolio'

const toolNames = [
  'evaluate_ai_product',
  'design_agent_workflow',
  'build_rag_feedback_loop',
  'prototype_with_code',
]

const parameters = [
  ['benchmark: true', 'auto_eval: enabled', 'badcase_loop: continuous'],
  ['intent_router: layered', 'tools: orchestrated', 'memory: contextual'],
  ['retrieval: hybrid', 'dataset: synthetic + real', 'trace: enabled'],
  ['mode: vibe_coding', 'output: working prototype', 'iteration: rapid'],
]

export function SkillToolPanel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSkill = skills[activeIndex]

  return (
    <div className="tool-panel">
      <div className="tool-panel__bar">
        <span>
          <TerminalSquare size={14} aria-hidden="true" />
          capability.agent
        </span>
        <span>4 TOOLS AVAILABLE</span>
      </div>

      <div className="tool-panel__layout">
        <div className="tool-list" aria-label="核心能力工具列表">
          {skills.map(({ title, icon: Icon }, index) => (
            <button
              type="button"
              className={activeIndex === index ? 'is-active' : ''}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              key={title}
            >
              <span className="tool-list__icon">
                <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span>
                <small>tool_{String(index + 1).padStart(2, '0')}</small>
                <strong>{title}</strong>
              </span>
              <Play size={12} fill="currentColor" aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="tool-inspector" aria-live="polite">
          <div className="tool-call">
            <span>TOOL CALL</span>
            <code>{toolNames[activeIndex]}()</code>
          </div>
          <div className="tool-parameters">
            <span>PARAMETERS</span>
            {parameters[activeIndex].map((parameter) => {
              const [key, value] = parameter.split(': ')
              return (
                <p key={parameter}>
                  <span>{key}</span>
                  <strong>{value}</strong>
                </p>
              )
            })}
          </div>
          <div className="tool-result">
            <span>RESULT</span>
            <div>
              <CheckCircle2 size={15} aria-hidden="true" />
              <p>{activeSkill.description}</p>
            </div>
          </div>
          <div className="tool-context">
            <span>DOMAIN CONTEXT</span>
            <code>{`{ legal: true, finance: true, ai_product: true }`}</code>
          </div>
        </div>
      </div>
    </div>
  )
}
