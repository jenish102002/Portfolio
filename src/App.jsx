import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import AskSection from './components/AskSection.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Footer from './components/Footer.jsx'
import Spotlight from './components/Spotlight.jsx'
import { useReveal } from './components/useReveal.js'
import { useTilt } from './components/useTilt.js'

export default function App() {
  useReveal()
  useTilt()

  return (
    <>
      <div className="bg-decor" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Spotlight />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <AskSection />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  )
}
