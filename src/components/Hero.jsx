import Globe from './Globe.jsx'
import { scrollToId } from './Nav.jsx'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'
import { profile } from '../data.js'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__text">
        <span className="badge badge--green hero__badge">
          <span className="pulse" /> Open to AI Engineer roles
        </span>

        <h1 className="hero__title">
          AI Engineer building{' '}
          <span className="grad">
            RAG &amp; <span style={{ whiteSpace: 'nowrap' }}>multi-agent</span>
          </span>{' '}
          LLM systems.
        </h1>
        <p className="hero__lede">
          Hi, I’m <strong>Jenish Patel</strong>. {profile.summary}
        </p>

        <div className="hero__actions">
          <a
            className="btn btn--primary btn--lg"
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('projects')
            }}
          >
            View my projects
          </a>
          <a
            className="btn btn--ghost btn--lg"
            href="#ask"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('ask')
            }}
          >
            ✦ Ask my resume
          </a>
        </div>

        <div className="hero__meta">
          <a href={`mailto:${profile.email}`}>
            <MailIcon width="16" height="16" /> {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon width="16" height="16" /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon width="16" height="16" /> LinkedIn
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__glow" aria-hidden />
        <Globe />
        <span className="hero__hint">drag to spin</span>
      </div>
    </section>
  )
}
