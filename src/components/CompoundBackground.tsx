import { Landmark, Scale } from 'lucide-react'

export function CompoundBackground() {
  return (
    <section
      className="section section--compact"
      aria-labelledby="background-title"
    >
      <div className="container">
        <div className="compound-background">
          <div className="compound-background__icons" aria-hidden="true">
            <Scale size={22} strokeWidth={1.7} />
            <Landmark size={22} strokeWidth={1.7} />
          </div>
          <div>
            <h2 id="background-title">法律 × 金融复合背景</h2>
            <p>
              法学硕士、金融学辅修，具备法律职业资格和基金从业资格，为法律、金融等高专业门槛的垂类
              Agent 产品提供更扎实的业务理解与合规判断。
            </p>
            <span>华泰联合证券投资银行部 · 深圳证券交易所</span>
          </div>
        </div>
      </div>
    </section>
  )
}
