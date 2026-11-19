import SectionHead from './SectionHead.jsx'
import { education, certification } from '../data.js'

export default function Education() {
  return (
    <section className="section" id="education">
      <SectionHead index="05" label="Education" title="Education." note="Two degrees and a certification." />
      <div className="edu">
        {education.map((e, i) => (
          <div className="reveal-wrap" key={e.short} data-reveal style={{ '--d': `${i * 70}ms` }}>
          <article className="card edu__card" data-tilt="10">
            <div className="edu__top">
              <span className="edu__short pop">{e.short}</span>
              <span className="chip chip--soft">{e.period}</span>
            </div>
            <h3>{e.degree}</h3>
            <p className="muted">
              {e.school}, {e.place}
            </p>
            <span className="badge badge--indigo">{e.score}</span>
          </article>
          </div>
        ))}
        <div className="reveal-wrap edu__cert-wrap" data-reveal style={{ '--d': '140ms' }}>
        <article className="card edu__card edu__card--cert" data-tilt="10">
          <div className="edu__top">
            <span className="edu__short pop">{certification.issuer}</span>
            <span className="chip chip--soft">Certification</span>
          </div>
          <h3>{certification.title}</h3>
          <p className="muted">{certification.detail}</p>
        </article>
        </div>
      </div>
    </section>
  )
}
