'use client'

import { useState } from 'react'
import { updateSiteSettings, updateContactInfo } from '@/app/actions/cms'

export function SiteSettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      websiteName: formData.get('websiteName'),
      logoPath: formData.get('logoPath'),
      faviconPath: formData.get('faviconPath'),
      headerContent: formData.get('headerContent'),
      footerContent: formData.get('footerContent'),
      socialFacebook: formData.get('socialFacebook'),
      socialTwitter: formData.get('socialTwitter'),
      socialInstagram: formData.get('socialInstagram'),
      socialLinkedin: formData.get('socialLinkedin'),
    }

    try {
      await updateSiteSettings(data)
      setMessage('Site settings updated successfully!')
    } catch (error) {
      console.error(error)
      setMessage('Failed to update site settings.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
        Site Settings
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Website Name</label>
            <input type="text" name="websiteName" defaultValue={initialData?.websiteName || ''} style={inputStyle} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Logo Path</label>
            <input type="text" name="logoPath" defaultValue={initialData?.logoPath || ''} style={inputStyle} placeholder="/logo.png" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Favicon Path</label>
            <input type="text" name="faviconPath" defaultValue={initialData?.faviconPath || ''} style={inputStyle} placeholder="/favicon.ico" />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Header Content</label>
          <textarea name="headerContent" defaultValue={initialData?.headerContent || ''} style={textareaStyle} rows={3}></textarea>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Footer Content</label>
          <textarea name="footerContent" defaultValue={initialData?.footerContent || ''} style={textareaStyle} rows={3}></textarea>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginTop: '1rem' }}>Social Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Facebook URL</label>
            <input type="url" name="socialFacebook" defaultValue={initialData?.socialFacebook || ''} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Twitter URL</label>
            <input type="url" name="socialTwitter" defaultValue={initialData?.socialTwitter || ''} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Instagram URL</label>
            <input type="url" name="socialInstagram" defaultValue={initialData?.socialInstagram || ''} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>LinkedIn URL</label>
            <input type="url" name="socialLinkedin" defaultValue={initialData?.socialLinkedin || ''} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Site Settings'}
          </button>
          {message && <span style={{ color: message.includes('success') ? 'var(--color-success)' : 'var(--color-danger)' }}>{message}</span>}
        </div>
      </form>
    </div>
  )
}

export function ContactInfoForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      address: formData.get('address'),
      googleMapLink: formData.get('googleMapLink'),
      businessHours: formData.get('businessHours'),
    }

    try {
      await updateContactInfo(data)
      setMessage('Contact info updated successfully!')
    } catch (error) {
      console.error(error)
      setMessage('Failed to update contact info.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
        Contact Information
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Phone</label>
            <input type="text" name="phone" defaultValue={initialData?.phone || ''} style={inputStyle} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>WhatsApp</label>
            <input type="text" name="whatsapp" defaultValue={initialData?.whatsapp || ''} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Email</label>
            <input type="email" name="email" defaultValue={initialData?.email || ''} style={inputStyle} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Business Hours</label>
            <input type="text" name="businessHours" defaultValue={initialData?.businessHours || ''} style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Address</label>
          <textarea name="address" defaultValue={initialData?.address || ''} style={textareaStyle} rows={2} required></textarea>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Google Map Link (Embed URL or Share Link)</label>
          <input type="url" name="googleMapLink" defaultValue={initialData?.googleMapLink || ''} style={inputStyle} />
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Contact Info'}
          </button>
          {message && <span style={{ color: message.includes('success') ? 'var(--color-success)' : 'var(--color-danger)' }}>{message}</span>}
        </div>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-border)',
  fontFamily: 'inherit',
}

const textareaStyle = {
  width: '100%',
  padding: '0.5rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-border)',
  fontFamily: 'inherit',
  resize: 'vertical' as const,
}
