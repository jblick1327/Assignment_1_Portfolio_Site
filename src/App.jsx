import { useEffect, useState } from 'react'
import './App.css'

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about-me' },
  { label: 'Projects', path: '/projects' },
  { label: 'Education', path: '/education' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

const projects = [
  {
    title: 'BOM',
    description:
      'A multiplayer physics game built in Unity and C# around a fully destructible environment. A custom ECS and an Odin server keep the simulation synchronized between players.',
    role: 'Networking and ECS design on a team project.',
  },
  {
    title: 'Switch Access Driver',
    description:
      'A cross-platform driver written in Odin for unpowered accessibility switches connected through a 3.5 mm audio jack. It detects switch events from bias pops, removing the need for a separate hardware interface.',
    role: 'Independent design and development.',
  },
  {
    title: 'UFC Performance Research',
    description:
      'An NLP research project investigating whether patterns in pre-fight interviews can provide a useful signal for predicting athlete performance.',
    role: 'Independent research and development.',
  },
]

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const currentPage = navigationItems.find((item) => item.path === currentPath) ?? navigationItems[0]

  useEffect(() => {
    const updateCurrentPath = () => setCurrentPath(window.location.pathname)

    window.addEventListener('popstate', updateCurrentPath)
    return () => window.removeEventListener('popstate', updateCurrentPath)
  }, [])

  const navigateTo = (event, path) => {
    event.preventDefault()
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    window.sessionStorage.setItem(
      'contactSubmission',
      JSON.stringify(Object.fromEntries(formData.entries())),
    )
    window.alert('Your message has been stored safely in this browser, where I will never see it.')
    window.history.pushState({}, '', '/')
    setCurrentPath('/')
  }

  return (
    <div className="site-frame">
      <header className="site-header">
        <a className="site-logo" href="/" onClick={(event) => navigateTo(event, '/')}>
          JB
        </a>
        <div>
          <p className="site-title">James Blick's Web Site</p>
          <p className="site-subtitle">Game programming and other low-level concerns</p>
        </div>
      </header>

      <nav aria-label="Main navigation">
        <ul className="navigation-list">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <a
                aria-current={item.path === currentPath ? 'page' : undefined}
                href={item.path}
                onClick={(event) => navigateTo(event, item.path)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {currentPath === '/' ? (
          <section className="home-page">
            <h1>Welcome to my home page.</h1>
            <p>
              I'm James. I study game programming and am interested in lower-level software,
              embedded systems, and audio DSP.
            </p>

            <div className="mission-statement">
              <h2>Mission statement</h2>
              <p>Understand what the computer is actually doing, then make useful things with it.</p>
            </div>

            <p>
              <a href="/about-me" onClick={(event) => navigateTo(event, '/about-me')}>
                More about me &gt;&gt;
              </a>
            </p>
          </section>
        ) : currentPath === '/projects' ? (
          <section className="projects-page">
            <h1>Projects</h1>
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-entry" key={project.title}>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <p className="project-role">
                    <strong>Role:</strong> {project.role}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : currentPath === '/education' ? (
          <section className="education-page">
            <h1>Education</h1>
            <div className="education-list">
              <article className="education-entry">
                <h2>Game Programming</h2>
                <p className="education-school">Centennial College</p>
                <p>September 2025–Present</p>
                <p>Three-year program, currently in progress.</p>
              </article>

              <article className="education-entry">
                <h2>Independent Music Production</h2>
                <p className="education-school">Seneca College</p>
                <p>2021–2022</p>
                <p>One year of study.</p>
              </article>
            </div>
          </section>
        ) : currentPath === '/services' ? (
          <section className="services-page">
            <h1>Services</h1>
            <ul className="service-list">
              <li>
                <h2>Game Programming</h2>
                <p>Gameplay and systems prototyping in Unity and C#.</p>
              </li>
              <li>
                <h2>Networking and Systems</h2>
                <p>Multiplayer synchronization, ECS design, and cross-platform utilities.</p>
              </li>
              <li>
                <h2>Audio Software Prototyping</h2>
                <p>Experimental tools involving audio input, signal analysis, and accessibility.</p>
              </li>
            </ul>
          </section>
        ) : currentPath === '/contact' ? (
          <section className="contact-page">
            <h1>Contact</h1>
            <address className="contact-details">
              <p>
                Email: <a href="mailto:dblick@my.centennialcollege.ca">dblick@my.centennialcollege.ca</a>
              </p>
              <p>
                GitHub: <a href="https://github.com/jblick1327">github.com/jblick1327</a>
              </p>
            </address>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <fieldset>
                <legend>Send a message</legend>
                <div className="form-field">
                  <label htmlFor="first-name">First name</label>
                  <input id="first-name" name="firstName" autoComplete="given-name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="last-name">Last name</label>
                  <input id="last-name" name="lastName" autoComplete="family-name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="6" required />
                </div>
                <button type="submit">Send message</button>
              </fieldset>
            </form>
          </section>
        ) : (
          <h1>{currentPage.label}</h1>
        )}
      </main>
    </div>
  )
}

export default App
