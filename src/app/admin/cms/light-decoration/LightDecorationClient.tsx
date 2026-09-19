'use client'

import { useState } from 'react'
import {
  createLightDecorationItem,
  updateLightDecorationItem,
  deleteLightDecorationItem,
  seedSampleLightDecorations
} from '@/app/actions/cms'
import { Trash2, Plus, Edit2, X, Save, Sparkles, ExternalLink, Star } from 'lucide-react'
import ImageInputWithPreview from '@/components/admin/ImageInputWithPreview'

const CATEGORY_PRESETS = [
  '💡 LED Light Decoration',
  '🎉 Event Decoration',
  '🏠 Home & Outdoor Decoration',
  '✨ Custom Decoration'
]

export default function LightDecorationClient({ initialItems }: { initialItems: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isSeeding, setIsSeeding] = useState(false)

  const handleSeed = async () => {
    if (confirm('Add 4 high-quality sample light decoration items to get started?')) {
      setIsSeeding(true)
      try {
        await seedSampleLightDecorations()
      } finally {
        setIsSeeding(false)
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Header Banner / Seed Action */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        padding: '1.75rem',
        borderRadius: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✨ Light Decoration Management
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px', margin: 0 }}>
            Add decoration items, upload local photos or paste image URLs directly from Google / Chrome.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="/light-decoration"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 14px',
              fontSize: '0.85rem'
            }}
          >
            <ExternalLink size={16} /> View Live Page
          </a>
          <button
            type="button"
            onClick={handleSeed}
            disabled={isSeeding}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <Sparkles size={16} /> {isSeeding ? 'Adding Samples...' : 'Add 4 Sample Decorations'}
          </button>
        </div>
      </div>

      {/* Add Form */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Add New Light Decoration Item
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          You can paste image links copied from Chrome or upload photos directly from your device.
        </p>

        <form action={async (formData) => {
          const title = formData.get('title') as string
          const description = formData.get('description') as string
          const category = formData.get('category') as string
          const imagePath = formData.get('imagePath') as string
          const order = parseInt((formData.get('order') as string) || '0', 10)
          const isActive = formData.get('isActive') === 'on'
          const isFeatured = formData.get('isFeatured') === 'on'

          if (title && imagePath) {
            await createLightDecorationItem({
              title,
              description,
              category,
              imagePath,
              order: Number.isNaN(order) ? 0 : order,
              isActive,
              isFeatured
            })
            // Reset category state and form
            setSelectedCategory('')
            const form = document.getElementById('add-decoration-form') as HTMLFormElement
            form?.reset()
          } else {
            alert('Please provide both Title and an Image URL or Upload an image.')
          }
        }} id="add-decoration-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '650px' }}>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>
              Decoration Title <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
              placeholder="E.g. Royal Wedding Canopy Lights or Balcony LED Strips"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Category</label>
            {/* Category presets */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {CATEGORY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSelectedCategory(preset)}
                  style={{
                    fontSize: '0.78rem',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: selectedCategory === preset ? 'var(--color-primary)' : '#f1f5f9',
                    color: selectedCategory === preset ? 'var(--color-secondary)' : '#334155',
                    fontWeight: selectedCategory === preset ? 'bold' : 'normal',
                    cursor: 'pointer'
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input
              type="text"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
              placeholder="Select from above or type custom category..."
            />
          </div>

          {/* Unified Image Input (Web URL from Chrome OR Local File Upload) */}
          <ImageInputWithPreview
            name="imagePath"
            required={true}
            label="Decoration Image"
            placeholder="Paste Chrome image URL (e.g. https://...)"
          />

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Description (Optional)</label>
            <textarea
              name="description"
              rows={3}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', resize: 'vertical' }}
              placeholder="Details about lights used, fairy lights, LED strip color, power specs, or event style..."
            ></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Display Order</label>
              <input
                type="number"
                name="order"
                defaultValue={0}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem', paddingTop: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="decoration-add-active" name="isActive" defaultChecked style={{ width: '18px', height: '18px' }} />
                <label htmlFor="decoration-add-active" style={{ fontWeight: '500', fontSize: '0.875rem' }}>Active (Visible)</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="decoration-add-featured" name="isFeatured" style={{ width: '18px', height: '18px' }} />
                <label htmlFor="decoration-add-featured" style={{ fontWeight: '500', fontSize: '0.875rem' }}>Featured on Top</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: 'fit-content', marginTop: '0.5rem', padding: '10px 24px' }}
          >
            <Plus size={18} /> Save &amp; Publish Decoration
          </button>
        </form>
      </div>

      {/* Item List */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
              Existing Light Decorations ({initialItems.length})
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Items currently configured for the Light Decoration page.
            </p>
          </div>
        </div>

        {initialItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💡</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No Light Decoration Items Added Yet</h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '450px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
              You can add items manually with the form above, or click below to populate 4 starter designs.
            </p>
            <button
              type="button"
              onClick={handleSeed}
              disabled={isSeeding}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Sparkles size={16} /> {isSeeding ? 'Adding...' : 'Add 4 Sample Designs'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {initialItems.map(item => (
              <div
                key={item.id}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                {editingId === item.id ? (
                  // EDIT MODE
                  <form action={async (formData) => {
                    const title = formData.get('title') as string
                    const description = formData.get('description') as string
                    const category = formData.get('category') as string
                    const imagePath = formData.get('imagePath') as string
                    const order = parseInt((formData.get('order') as string) || '0', 10)
                    const isActive = formData.get('isActive') === 'on'
                    const isFeatured = formData.get('isFeatured') === 'on'

                    if (title && imagePath) {
                      await updateLightDecorationItem(item.id, {
                        title,
                        description,
                        category,
                        imagePath,
                        order: Number.isNaN(order) ? 0 : order,
                        isActive,
                        isFeatured
                      })
                      setEditingId(null)
                    }
                  }} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                      <h3 style={{ fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>Edit Item</h3>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={item.title}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Category</label>
                      <input
                        type="text"
                        name="category"
                        defaultValue={item.category || ''}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                      />
                    </div>

                    <ImageInputWithPreview
                      name="imagePath"
                      defaultValue={item.imagePath}
                      required={true}
                      label="Image"
                    />

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Description</label>
                      <textarea
                        name="description"
                        defaultValue={item.description || ''}
                        rows={2}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                      ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: '500', marginRight: '8px' }}>Order:</label>
                        <input
                          type="number"
                          name="order"
                          defaultValue={item.order ?? 0}
                          style={{ width: '70px', padding: '6px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input type="checkbox" name="isActive" defaultChecked={item.isActive} /> Active
                        </label>
                        <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input type="checkbox" name="isFeatured" defaultChecked={item.isFeatured} /> Featured
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                    >
                      <Save size={16} /> Save Changes
                    </button>
                  </form>
                ) : (
                  // VIEW MODE
                  <>
                    <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#0f172a' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imagePath}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {item.isFeatured && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(0,0,0,0.7)',
                          color: '#facc15',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontWeight: '600'
                        }}>
                          <Star size={12} fill="#facc15" /> Featured
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: item.isActive ? 'rgba(34,197,94,0.9)' : 'rgba(100,116,139,0.9)',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: '600'
                      }}>
                        {item.isActive ? 'Active' : 'Hidden'}
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '1.05rem', margin: 0, wordBreak: 'break-word', paddingRight: '0.5rem' }}>
                          {item.title}
                        </h3>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          <button
                            type="button"
                            onClick={() => setEditingId(item.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: '4px' }}
                            title="Edit Item"
                          >
                            <Edit2 size={16} />
                          </button>
                          <form action={async () => {
                            if (confirm(`Delete "${item.title}"?`)) {
                              await deleteLightDecorationItem(item.id)
                            }
                          }}>
                            <button
                              type="submit"
                              style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '4px' }}
                              title="Delete Item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </div>
                      </div>

                      {item.category && (
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: '#f1f5f9',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          color: '#334155',
                          marginBottom: '0.75rem',
                          width: 'fit-content',
                          fontWeight: '500'
                        }}>
                          {item.category}
                        </span>
                      )}

                      {item.description && (
                        <p style={{
                          color: 'var(--color-text-muted)',
                          fontSize: '0.85rem',
                          margin: 0,
                          flex: 1,
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {item.description}
                        </p>
                      )}

                      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                        <span>Order: {item.order ?? 0}</span>
                        <form action={async () => { await updateLightDecorationItem(item.id, { isActive: !item.isActive }) }}>
                          <button
                            type="submit"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: item.isActive ? '#10b981' : '#6b7280',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                          >
                            {item.isActive ? 'Click to Disable' : 'Click to Enable'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
