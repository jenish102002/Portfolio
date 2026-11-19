import SectionHead from './SectionHead.jsx'
import { ArrowIcon, GitHubIcon } from './Icons.jsx'
import { projects } from '../data.js'

function Pipeline({ steps }) {
  return (
    <div className="pipe pop">
      {steps.map((s, i) => (
        <div className="pipe__step" key={i}>
          {Array.isArray(s) ? (
            <div className="pipe__fan">
              {s.map((a) => (
                <span key={a} className="pipe__node pipe__node--agent">
                  {a}
                </span>
              ))}
            </div>
          ) : (
            <span className="pipe__node">{s}</span>
          )}
          {i < steps.length - 1 && <span className="pipe__arrow">→</span>}
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHead index="02" label="Projects" title="Things I’ve built." note="Deployed end to end, from ingestion to UI." />
      <div className="projects">
        {projects.map((p, i) => (
          <div className="reveal-wrap" key={p.id} data-reveal style={{ '--d': `${i * 80}ms` }}>
          <article className={`card project project--${i}`} data-tilt="7">
            <div className="project__visual">
              <span className="project__period">{p.period}</span>
              <Pipeline steps={p.pipeline} />
            </div>
            <div className="project__body">
              <span className="eyebrow eyebrow--plain">{p.kicker}</span>
              <h3 className="pop-sm">{p.title}</h3>
              {p.metric && (
                <p className="project__metric">
                  <strong>{p.metric.value}</strong> {p.metric.label}
                </p>
              )}
              <ul className="ticks">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="chips">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              {(p.github || p.live) && (
                <div className="project__links">
                  {p.live && (
                    <a className="btn btn--primary btn--sm" href={p.live} target="_blank" rel="noreferrer">
                      Live demo <ArrowIcon />
                    </a>
                  )}
                  {p.github && (
                    <a className="btn btn--ghost btn--sm" href={p.github} target="_blank" rel="noreferrer">
                      <GitHubIcon width="16" height="16" /> Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
          </div>
        ))}
      </div>
    </section>
  )
}
