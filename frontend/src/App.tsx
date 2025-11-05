import { useEffect, useState } from 'react'

function App() {
  const [health, setHealth] = useState<string>('checking...')

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then(r => r.json())
      .then(d => setHealth(d.status ?? 'unknown'))
      .catch(() => setHealth('api unavailable'))
  }, [])

  return (
    <div style={{fontFamily:'ui-sans-serif, system-ui', padding: 24}}>
      <h1 style={{fontSize: 28, marginBottom: 12}}>Hackathon Starter</h1>
      <p>API health: <b>{health}</b></p>
      <p>Next steps: add auth, protected pages, and the domain screens.</p>
    </div>
  )
}

export default App
