'use client'

import { useState } from 'react'
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/app/actions/cms'
import { Trash2, Plus, Edit2, X, Save } from 'lucide-react'

export default function GalleryClient({ initialItems }: { initialItems: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Add Form */}
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Gallery Item</h2>
        <form action={async (formData) => {
          const title = formData.get('title') as string
          const description = formData.get('description') as string
          const category = formData.get('category') as string
          const imagePath = formData.get('imagePath') as string
          const order = parseInt((formData.get('order') as string) || '0', 10)
          const isActive = formData.get('isActive') === 'on'
          const isFeatured = formData.get('isFeatured') === 'on'
          if (title && imagePath) {
            await createGalleryItem({ title, description, category, imagePath, order: Number.isNaN(order) ? 0 : order, isActive, isFeatured })
            // HTML Form automatically resets on successful Server Action if not e.preventDefault()
            // but we can manually reset by finding form
            document.getElementById('add-gallery-form')?.closest('form')?.reset()
          }
        }} id="add-gallery-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
            <input 
              type="text" name="title" required 
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
              placeholder="E.g. Engine Repair"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Optional)</label>
            <textarea 
              name="description" rows={3}
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', resize: 'vertical' }}
              placeholder="Short description..."
            ></textarea>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category (Optional)</label>
            <input 
              type="text" name="category" 
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
              placeholder="E.g. Services, Team, Workshop"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Image URL / Path</label>
            <input 
              type="text" name="imagePath" required 
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
              placeholder="/images/gallery/1.jpg or https://..."
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Display Order</label>
            <input
              type="number" name="order" defaultValue={0}
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="gallery-add-active" name="isActive" defaultChecked style={{ width: '18px', height: '18px' }} />
            <label htmlFor="gallery-add-active" style={{ fontWeight: '500' }}>Active (visible on website)</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="gallery-add-featured" name="isFeatured" style={{ width: '18px', height: '18px' }} />
            <label htmlFor="gallery-add-featured" style={{ fontWeight: '500' }}>Featured (show in the Home Page gallery section first)</label>
          </div>
          <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: 'fit-content', marginTop: '0.5rem' }}>
            <Plus size={20} /> Add Item
          </button>
        </form>
      </div>

      {/* Item List */}
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Existing Gallery Items</h2>
        {initialItems.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No gallery items added yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {initialItems.map(item => (
              <div key={item.id} style={{ border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                
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
                      await updateGalleryItem(item.id, { title, description, category, imagePath, order: Number.isNaN(order) ? 0 : order, isActive, isFeatured })
                      setEditingId(null)
                    }
                  }} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontWeight: 'bold', margin: 0 }}>Edit Item</h3>
                      <button type="button" onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={20} />
                      </button>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Title</label>
                      <input type="text" name="title" defaultValue={item.title} required style={{ width: '100%', padding: '6px', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Description</label>
                      <textarea name="description" defaultValue={item.description || ''} rows={2} style={{ width: '100%', padding: '6px', border: '1px solid var(--color-border)', borderRadius: '4px' }}></textarea>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Category</label>
                      <input type="text" name="category" defaultValue={item.category || ''} style={{ width: '100%', padding: '6px', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Image URL</label>
                      <input type="text" name="imagePath" defaultValue={item.imagePath} required style={{ width: '100%', padding: '6px', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Display Order</label>
                      <input type="number" name="order" defaultValue={item.order ?? 0} style={{ width: '100%', padding: '6px', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" name="isActive" defaultChecked={item.isActive} style={{ width: '18px', height: '18px' }} />
                      <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Active (visible on website)</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" name="isFeatured" defaultChecked={item.isFeatured} style={{ width: '18px', height: '18px' }} />
                      <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Featured (Home Page gallery)</label>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <Save size={18} /> Save Changes
                    </button>
                  </form>
                ) : (
                  // VIEW MODE
                  <>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '66.66%', backgroundColor: '#f0f0f0', borderBottom: '1px solid var(--color-border)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imagePath} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    
                    <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: 0, wordBreak: 'break-word', paddingRight: '0.5rem' }}>{item.title}</h3>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <form action={async () => { await updateGalleryItem(item.id, { isActive: !item.isActive }) }}>
                            <button
                              type="submit"
                              style={{
                                background: 'none',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '0.75rem',
                                color: item.isActive ? 'var(--color-success)' : 'var(--color-text-muted)'
                              }}
                              title={item.isActive ? 'Click to hide from website' : 'Click to show on website'}
                            >
                              {item.isActive ? 'Active' : 'Disabled'}
                            </button>
                          </form>
                          <button type="button" onClick={() => setEditingId(item.id)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: '4px' }} title="Edit Item">
                            <Edit2 size={18} />
                          </button>
                          <form action={async () => { await deleteGalleryItem(item.id) }}>
                            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '4px' }} title="Delete Item">
                              <Trash2 size={18} />
                            </button>
                          </form>
                        </div>
                      </div>
                      
                      {item.category && (
                        <span style={{ display: 'inline-block', backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', color: '#4b5563', marginBottom: '0.75rem', width: 'fit-content', fontWeight: '500' }}>
                          {item.category}
                        </span>
                      )}
                      
                      {item.description && (
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.description}
                        </p>
                      )}
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


