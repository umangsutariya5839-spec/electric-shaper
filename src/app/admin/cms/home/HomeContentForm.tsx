'use client'

import { useState } from 'react'
import { updateHomeContent } from '@/app/actions/cms'

export default function HomeContentForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      heroBannerText: formData.get('heroBannerText'),
      heroHeading: formData.get('heroHeading'),
      heroDescription: formData.get('heroDescription'),
      heroButtonText: formData.get('heroButtonText'),
      heroButtonLink: formData.get('heroButtonLink'),
      heroBackgroundImage: formData.get('heroBackgroundImage'),
      whyChooseUsPoints: formData.get('whyChooseUsPoints'),
      statsExperience: formData.get('statsExperience'),
      statsRepaired: formData.get('statsRepaired'),
    }
    await updateHomeContent(data)
    setLoading(false)
    alert('Home content updated successfully!')
  }

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Home Content</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Hero Banner Text</label>
            <input name="heroBannerText" defaultValue={initialData?.heroBannerText} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Hero Heading</label>
            <input name="heroHeading" defaultValue={initialData?.heroHeading} style={inputStyle} required />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>Hero Description</label>
          <textarea name="heroDescription" defaultValue={initialData?.heroDescription} style={{ ...inputStyle, minHeight: '100px' }} required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Button Text</label>
            <input name="heroButtonText" defaultValue={initialData?.heroButtonText} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Button Link</label>
            <input name="heroButtonLink" defaultValue={initialData?.heroButtonLink} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Background Image Path</label>
            <input name="heroBackgroundImage" defaultValue={initialData?.heroBackgroundImage || ''} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>Why Choose Us Points (Comma Separated or JSON)</label>
          <textarea name="whyChooseUsPoints" defaultValue={initialData?.whyChooseUsPoints || ''} style={{ ...inputStyle, minHeight: '80px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Stats: Experience</label>
            <input name="statsExperience" defaultValue={initialData?.statsExperience} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Stats: Repaired</label>
            <input name="statsRepaired" defaultValue={initialData?.statsRepaired} style={inputStyle} required />
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
