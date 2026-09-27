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
        ) : (
          <h1>{currentPage.label}</h1>
        )}
      </main>
    </div>
  )
}

export default App
