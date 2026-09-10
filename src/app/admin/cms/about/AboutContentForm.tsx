'use client'

import { useState } from 'react'
import { updateAboutContent } from '@/app/actions/cms'

export default function AboutContentForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      aboutHeading: formData.get('aboutHeading'),
      aboutDescription: formData.get('aboutDescription'),
      companyImage: formData.get('companyImage'),
      mission: formData.get('mission'),
      vision: formData.get('vision'),
      experienceYears: formData.get('experienceYears'),
    }
    await updateAboutContent(data)
    setLoading(false)
    alert('About content updated successfully!')
  }

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Content</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>About Heading</label>
            <input name="aboutHeading" defaultValue={initialData?.aboutHeading} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Experience Years</label>
            <input name="experienceYears" defaultValue={initialData?.experienceYears} style={inputStyle} required />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>About Description</label>
          <textarea name="aboutDescription" defaultValue={initialData?.aboutDescription} style={{ ...inputStyle, minHeight: '100px' }} required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>Company Image Path</label>
          <input name="companyImage" defaultValue={initialData?.companyImage || ''} style={inputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Mission</label>
            <textarea name="mission" defaultValue={initialData?.mission || ''} style={{ ...inputStyle, minHeight: '100px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Vision</label>
            <textarea name="vision" defaultValue={initialData?.vision || ''} style={{ ...inputStyle, minHeight: '100px' }} />
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  )
}

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid var(--color-border)',
  width: '100%',
  fontFamily: 'inherit'
}

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: 'var(--color-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontWeight: '500',
  cursor: 'pointer',
}
