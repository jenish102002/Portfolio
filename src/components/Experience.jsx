import SectionHead from './SectionHead.jsx'
import { experience } from '../data.js'

export default function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHead index="01" label="Experience" title="Where I’ve worked." note="Production systems used by real teams." />
      <ol className="timeline">
        {experience.map((x, i) => (
          <li className="timeline__item" key={x.company} data-reveal style={{ '--d': `${i * 80}ms` }}>
            <span className="timeline__dot" aria-hidden />
            <article className="card xp" data-tilt="4">
              <header className="xp__head">
                <div className={`logo logo--${i} pop`}>{x.company.slice(0, 1)}</div>
                <div className="xp__title">
                  <h3>{x.company}</h3>
                  <p>{x.role}</p>
                </div>
                <div className="xp__when">
                  <span className="chip chip--soft">{x.period}</span>
                  <span className="muted small">{x.place}</span>
                </div>
              </header>
              <ul className="ticks">
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {x.award && <p className="badge badge--amber">🏆 {x.award}</p>}
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
