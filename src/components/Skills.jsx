import SectionHead from './SectionHead.jsx'
import { skills } from '../data.js'

const icons = ['✦', '◆', '◎', '▲']

export default function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHead index="04" label="Skills" title="My toolkit." note="What takes LLM apps from notebook to production." />
      <div className="skills">
        {skills.map((g, i) => (
          <div className="reveal-wrap" key={g.group} data-reveal style={{ '--d': `${i * 70}ms` }}>
          <article className={`card skill skill--${i}`} data-tilt="8">
            <header>
              <span className="skill__icon pop">{icons[i]}</span>
              <h3>{g.group}</h3>
              <span className="skill__count">{g.items.length}</span>
            </header>
            <div className="chips">
              {g.items.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </article>
          </div>
        ))}
      </div>
    </section>
  )
}
