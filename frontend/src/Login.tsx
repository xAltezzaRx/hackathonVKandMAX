import { useState } from 'react'
import { api } from './api'
import { saveTokens } from './auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const n = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [full_name, setFullName] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [err, setErr] = useState<string>('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    try {
      const body = JSON.stringify({ email, password, full_name })
      const data = await api(`/auth/${mode}`, { method: 'POST', body })
      saveTokens(data)
      n('/protected')
    } catch (e:any) {
      setErr(e.message ?? 'Error')
    }
  }

  return (
    <div style={{maxWidth: 420, margin: '80px auto', fontFamily: 'ui-sans-serif, system-ui'}}>
      <h1 style={{fontSize: 26, marginBottom: 8}}>Welcome</h1>
      <p style={{marginBottom: 16, opacity: .8}}>Sign in or create an account</p>
      <form onSubmit={submit} style={{display: 'grid', gap: 12}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {mode === 'register' && (
          <input placeholder="Full name (optional)" value={full_name} onChange={e=>setFullName(e.target.value)} />
        )}
        {err && <div style={{color: 'crimson'}}>{err}</div>}
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <button style={{marginTop: 8}} onClick={()=>setMode(mode==='login'?'register':'login')}>
        Switch to {mode === 'login' ? 'register' : 'login'}
      </button>
    </div>
  )
}
