'use client'

import { useState } from 'react'
import { createSliderItem, updateSliderItem, deleteSliderItem } from '@/app/actions/cms'
import { Trash2, Edit } from 'lucide-react'

export default function SliderManager({ items }: { items: any[] }) {
  const [loading, setLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      imagePath: formData.get('imagePath'),
      features: formData.get('features'),
      specs: formData.get('specs'),
      order: parseInt((formData.get('order') as string) || '0', 10),
      isActive: formData.get('isActive') === 'on',
    }
    
    if (editingItem) {
      await updateSliderItem(editingItem.id, data)
      setEditingItem(null)
    } else {
      await createSliderItem(data)
    }
    
    e.currentTarget.reset()
    setLoading(false)
  }

  function handleEditClick(item: any) {
    setEditingItem(item)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {editingItem ? 'Edit Product Slide' : 'Add Product Slide'}
          </h2>
          {editingItem && (
            <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 'bold' }}>
              Cancel Edit
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500' }}>Title</label>
              <input name="title" defaultValue={editingItem?.title || ''} style={inputStyle} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500' }}>Subtitle</label>
              <input name="subtitle" defaultValue={editingItem?.subtitle || ''} style={inputStyle} />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Image Path</label>
            <input name="imagePath" defaultValue={editingItem?.imagePath || ''} placeholder="/products/motor1.png" style={inputStyle} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500' }}>Display Order</label>
              <input type="number" name="order" defaultValue={editingItem?.order ?? 0} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'end', height: '38px' }}>
              <input type="checkbox" id="slide-active" name="isActive" defaultChecked={editingItem ? editingItem.isActive : true} style={{ width: '18px', height: '18px' }} />
              <label htmlFor="slide-active" style={{ fontWeight: '500' }}>Active (visible on website)</label>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500' }}>Features (JSON)</label>
              <textarea name="features" defaultValue={editingItem?.features || ''} placeholder='["Feature 1", "Feature 2"]' style={{ ...inputStyle, minHeight: '120px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500' }}>Specs (JSON)</label>
              <textarea name="specs" defaultValue={editingItem?.specs || ''} placeholder='{"box1Title":"Power","box1Value":"50HP"}' style={{ ...inputStyle, minHeight: '120px' }} />
            </div>
          </div>

          <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Saving...' : (editingItem ? 'Save Changes' : 'Add Slide')}
            </button>
          </div>
        </form>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Current Slider Items</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '12px' }}>Image</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Subtitle</th>
              <th style={{ padding: '12px' }}>Order</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px' }}>
                  <img src={item.imagePath} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#f5f5f5', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{item.title}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{item.subtitle || '-'}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{item.order}</td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={async (e) => {
                      e.preventDefault()
                      await updateSliderItem(item.id, { isActive: !item.isActive })
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      color: item.isActive ? 'var(--color-success)' : 'var(--color-text-muted)'
                    }}
                    title={item.isActive ? 'Click to hide from website' : 'Click to show on website'}
                  >
                    {item.isActive ? 'Active' : 'Disabled'}
                  </button>
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        handleEditClick(item)
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}
                      title="Edit Slide"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={async (e) => {
                        e.preventDefault()
                        if(confirm('Are you sure you want to delete this slide?')) {
                          await deleteSliderItem(item.id)
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}
                      title="Delete Slide"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No slider items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
