'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      if (result.role === 'SUPER_ADMIN') {
        router.push('/admin')
      } else {
        router.push('/owner')
      }
      router.refresh()
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--color-background)' 
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', letterSpacing: '-0.5px' }}>
            INTEC Login
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Sign in to manage the platform.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="admin@example.com"
              style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--color-border)', fontSize: '1rem', fontFamily: 'inherit' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="••••••••"
              style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--color-border)', fontSize: '1rem', fontFamily: 'inherit' }} 
            />
          </div>

          {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ marginTop: '0.5rem', width: '100%', padding: '12px' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
