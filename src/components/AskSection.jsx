import AskConsole from './AskConsole.jsx'
import SectionHead from './SectionHead.jsx'

const steps = [
  ['01', 'Retrieve', 'Your question is matched against chunks of my resume.'],
  ['02', 'Score', 'Each chunk gets a similarity score from 0 to 1.'],
  ['03', 'Answer or escalate', 'Above 0.6 it answers with a citation. Below, it hands you to me.'],
]

export default function AskSection() {
  return (
    <section className="section" id="ask">
      <div className="ask-grid">
        <div>
          <SectionHead
            index="03"
            label="Live demo"
            title="Ask my resume."
            note="A mini version of the RAG bot I built at Intel."
          />
          <ol className="steps">
            {steps.map(([n, t, d], i) => (
              <li key={n} data-reveal style={{ '--d': `${i * 80}ms` }}>
                <span className="steps__n">{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="reveal-wrap" data-reveal>
          <div className="card console-card">
            <AskConsole />
          </div>
        </div>
      </div>
    </section>
  )
}
