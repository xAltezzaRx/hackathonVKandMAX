import { useEffect, useState } from 'react'
import { API_URL } from './api'
import { accessToken, logout } from './auth'
import { useNavigate } from 'react-router-dom'

export default function Protected() {
  const n = useNavigate()
  const [me, setMe] = useState<any>(null)
  const [err, setErr] = useState<string>('')

  useEffect(() => {
    const token = accessToken()
    if (!token) { n('/'); return }
    fetch(`${API_URL}/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(setMe).catch(e => setErr(String(e)))
  }, [])

  return (
    <div style={{fontFamily:'ui-sans-serif, system-ui', padding: 24}}>
      <h1 style={{fontSize: 28, marginBottom: 12}}>Protected page</h1>
      {me ? <pre>{JSON.stringify(me, null, 2)}</pre> : <p>Loading... {err}</p>}
      <button onClick={()=>{ logout(); n('/'); }}>Logout</button>
    </div>
  )
}
