export function Portrait() {
  return (
    <div className="portrait" role="img" aria-label="AI 产品设计师头像与环绕动效">
      <span className="portrait__halo" aria-hidden="true" />
      <span className="portrait__orbit" aria-hidden="true">
        <i className="portrait__sat" />
      </span>
      <span className="portrait__orbit portrait__orbit--inner" aria-hidden="true">
        <i className="portrait__sat portrait__sat--two" />
      </span>
      <img
        className="portrait__image"
        src="/assets/ai-avatar.png"
        alt="董羽舒"
        width={268}
        height={268}
      />
      <span className="portrait__scan" aria-hidden="true" />
    </div>
  )
}
