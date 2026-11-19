import { stats } from '../data.js'

export default function Stats() {
  return (
    <section className="stats">
      {stats.map((s, i) => (
        <div className="reveal-wrap" key={s.label} data-reveal style={{ '--d': `${i * 70}ms` }}>
          <div className="card stat" data-tilt="14">
            <span className="stat__value pop">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
