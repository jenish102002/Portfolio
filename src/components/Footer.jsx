import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'
import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.fullName}
        </span>
        <div className="footer__links">
          <a href={`mailto:${profile.email}`}>
            <MailIcon width="16" height="16" /> {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon width="16" height="16" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon width="16" height="16" />
          </a>
        </div>
      </div>
    </footer>
  )
}
