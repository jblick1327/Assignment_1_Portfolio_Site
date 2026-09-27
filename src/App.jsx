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
        ) : (
          <h1>{currentPage.label}</h1>
        )}
      </main>
    </div>
  )
}

export default App
