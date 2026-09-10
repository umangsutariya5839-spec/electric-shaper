'use client'

import { useState } from 'react'
import { createNavigationItem, updateNavigationItem, deleteNavigationItem } from '@/app/actions/cms'
import { Plus, Trash2, Edit } from 'lucide-react'

export default function NavigationClient({ items }: { items: any[] }) {
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      label: formData.get('label') as string,
      href: formData.get('href') as string,
      order: parseInt(formData.get('order') as string || '0', 10)
    }

    if (editingItem) {
      await updateNavigationItem(editingItem.id, data)
      setEditingItem(null)
    } else {
      await createNavigationItem(data)
    }
    
    e.currentTarget.reset()
    setLoading(false)
  }

  function handleEditClick(item: any) {
    setEditingItem(item)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {editingItem ? 'Edit Link' : 'Add New Link'}
          </h2>
          {editingItem && (
            <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 'bold' }}>
              Cancel Edit
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Label</label>
            <input type="text" name="label" defaultValue={editingItem?.label || ''} required style={inputStyle} placeholder="E.g. Pricing" />
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>URL / Path</label>
            <input type="text" name="href" defaultValue={editingItem?.href || ''} required style={inputStyle} placeholder="E.g. /pricing" />
          </div>

          <div style={{ width: '100px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Order</label>
            <input type="number" name="order" defaultValue={editingItem?.order ?? 0} style={inputStyle} />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '10px 20px', height: '42px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {editingItem ? 'Save' : <><Plus size={20} /> Add</>}
          </button>
        </form>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Current Navigation Links</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '12px' }}>Order</th>
              <th style={{ padding: '12px' }}>Label</th>
              <th style={{ padding: '12px' }}>URL</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{item.order}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{item.label}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{item.href}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        handleEditClick(item)
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}
                      title="Edit Link"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={async (e) => {
                        e.preventDefault()
                        if(confirm('Are you sure you want to delete this link?')) {
                          await deleteNavigationItem(item.id)
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}
                      title="Delete Link"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No custom navigation links added.
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
  width: '100%', 
  padding: '10px', 
  border: '1px solid var(--color-border)', 
  borderRadius: '4px',
  fontFamily: 'inherit'
}
