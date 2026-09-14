import { useEffect, useState } from 'react'
import './App.css'

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About Me', path: '/about-me' },
  { name: 'Projects', path: '/projects' },
  { name: 'Education', path: '/education' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const currentPage = pages.find((page) => page.path === currentPath) ?? pages[0]

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
          {pages.map((page) => (
            <li key={page.path}>
              <a href={page.path} onClick={(event) => navigateTo(event, page.path)}>
                {page.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <p>{Array(5).fill(currentPage.name).join(' ')}</p>
      </main>
    </>
  )
}

export default App
