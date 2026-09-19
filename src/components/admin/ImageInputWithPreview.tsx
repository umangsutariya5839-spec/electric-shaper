'use client'

import React, { useState, useRef } from 'react'
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react'

interface ImageInputWithPreviewProps {
  name: string
  defaultValue?: string
  required?: boolean
  label?: string
  placeholder?: string
}

export default function ImageInputWithPreview({
  name,
  defaultValue = '',
  required = false,
  label = 'Image URL / Upload',
  placeholder = 'Paste image URL from Chrome (e.g. https://...)'
}: ImageInputWithPreviewProps) {
  const [value, setValue] = useState(defaultValue)
  const [mode, setMode] = useState<'url' | 'upload'>('url')
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsCompressing(true)
    setHasError(false)
    setIsLoaded(false)

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        // Compress and resize to max 1200px
        const maxDim = 1200
        let w = img.width
        let h = img.height
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w)
            w = maxDim
          } else {
            w = Math.round((w * maxDim) / h)
            h = maxDim
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h)
          const compressed = canvas.toDataURL('image/jpeg', 0.82)
          setValue(compressed)
          setIsCompressing(false)
        } else {
          setValue(event.target?.result as string)
          setIsCompressing(false)
        }
      }
      img.onerror = () => {
        setIsCompressing(false)
        setHasError(true)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleClear = () => {
    setValue('')
    setHasError(false)
    setIsLoaded(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
        <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '2px', borderRadius: '6px' }}>
          <button
            type="button"
            onClick={() => setMode('url')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: mode === 'url' ? '600' : '400',
              background: mode === 'url' ? '#ffffff' : 'transparent',
              boxShadow: mode === 'url' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              color: mode === 'url' ? 'var(--color-secondary)' : '#64748b'
            }}
          >
            <LinkIcon size={13} /> Paste Web URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: mode === 'upload' ? '600' : '400',
              background: mode === 'upload' ? '#ffffff' : 'transparent',
              boxShadow: mode === 'upload' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              color: mode === 'upload' ? 'var(--color-secondary)' : '#64748b'
            }}
          >
            <Upload size={13} /> Upload from PC
          </button>
        </div>
      </div>

      {/* Hidden input that actually supplies the value to form submission */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />

      {mode === 'url' ? (
        <div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={value.startsWith('data:') ? '[Uploaded Local Image File]' : value}
              onChange={(e) => {
                setValue(e.target.value)
                setHasError(false)
                setIsLoaded(false)
              }}
              placeholder={placeholder}
              style={{
                width: '100%',
                padding: '8px 36px 8px 12px',
                border: hasError ? '1px solid #ef4444' : '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '0.875rem'
              }}
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: '2px'
                }}
                title="Clear image"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            💡 Tip: Open Chrome, right-click any image on Google or any site &rarr; choose <strong>&ldquo;Copy image address&rdquo;</strong>, then paste here.
          </p>
        </div>
      ) : (
        <div style={{
          border: '2px dashed #cbd5e1',
          borderRadius: '8px',
          padding: '1.25rem',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          cursor: 'pointer'
        }}
        onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '50%', color: '#334155' }}>
              <Upload size={20} />
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1e293b', margin: 0 }}>
              {isCompressing ? 'Optimizing photo...' : 'Click or drop an image file here'}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
              Supports JPG, PNG, WEBP (auto-compressed for high speed)
            </p>
          </div>
        </div>
      )}

      {/* Image Preview Box */}
      {value && (
        <div style={{
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          backgroundColor: '#0f172a',
          marginTop: '4px'
        }}>
          <div style={{ height: '180px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              onLoad={() => { setIsLoaded(true); setHasError(false) }}
              onError={() => { setHasError(true); setIsLoaded(false) }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: hasError ? 'none' : 'block'
              }}
            />
            {hasError && (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#f87171' }}>
                <p style={{ fontWeight: '600', fontSize: '0.85rem', marginBottom: '4px' }}>⚠️ Image failed to load from this link</p>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', maxWidth: '380px', margin: '0 auto' }}>
                  Please ensure this is a direct image URL (ending with .jpg, .png, etc.), or save it to your computer and use &ldquo;Upload from PC&rdquo;.
                </p>
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 12px',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isLoaded && <Check size={14} style={{ color: '#4ade80' }} />}
              <span>{isLoaded ? 'Image verified & ready' : hasError ? 'Check URL' : 'Loading preview...'}</span>
            </div>
            <button
              type="button"
              onClick={handleClear}
              style={{
                background: 'none',
                border: 'none',
                color: '#f87171',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <X size={13} /> Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
