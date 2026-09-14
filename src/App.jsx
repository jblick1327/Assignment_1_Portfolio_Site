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
    <>
      <nav aria-label="Main navigation">
        <ul className="navigation-list">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <a href={item.path} onClick={(event) => navigateTo(event, item.path)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <h1>{currentPage.label}</h1>
      </main>
    </>
  )
}

export default App
