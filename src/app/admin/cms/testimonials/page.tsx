import prisma from '@/lib/prisma'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/app/actions/cms'
import { Trash2, Plus, Star } from 'lucide-react'

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
  })

  async function handleCreate(formData: FormData) {
    'use server'
    const customerName = formData.get('customerName') as string
    const review = formData.get('review') as string
    const rating = parseInt(formData.get('rating') as string, 10)
    const customerImage = formData.get('customerImage') as string || null
    const order = parseInt((formData.get('order') as string) || '0', 10)
    const isActive = formData.get('isActive') === 'on'

    if (customerName && review && rating) {
      await createTestimonial({ customerName, review, rating, customerImage, order: Number.isNaN(order) ? 0 : order, isActive })
    }
  }

  async function handleUpdate(id: string, formData: FormData) {
    'use server'
    const customerName = formData.get('customerName') as string
    const review = formData.get('review') as string
    const rating = parseInt(formData.get('rating') as string, 10)
    const customerImage = formData.get('customerImage') as string || null
    const order = parseInt((formData.get('order') as string) || '0', 10)
    const isActive = formData.get('isActive') === 'on'

    if (customerName && review && rating) {
      await updateTestimonial(id, { customerName, review, rating, customerImage, order: Number.isNaN(order) ? 0 : order, isActive })
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Testimonials Management</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Testimonial</h2>
          <form action={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Customer Name</label>
              <input 
                type="text" 
                name="customerName" 
                required 
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                placeholder="E.g. John Doe"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Customer Image URL</label>
              <input 
                type="text" 
                name="customerImage" 
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                placeholder="E.g. /path/to/image.jpg (Optional)"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Rating (1-5)</label>
              <input 
                type="number" 
                name="rating" 
                min="1"
                max="5"
                defaultValue="5"
                required 
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Review</label>
              <textarea 
                name="review" 
                required 
                rows={4}
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', resize: 'vertical' }}
                placeholder="E.g. Great service!"
              ></textarea>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Display Order</label>
              <input
                type="number"
                name="order"
                defaultValue={0}
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="testimonial-add-active" name="isActive" defaultChecked style={{ width: '18px', height: '18px' }} />
              <label htmlFor="testimonial-add-active" style={{ fontWeight: '500' }}>Active (visible on website)</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: 'fit-content' }}>
              <Plus size={20} />
              Add Testimonial
            </button>
          </form>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Existing Testimonials</h2>
          {testimonials.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)' }}>No testimonials added yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {testimonials.map(testimonial => (
                <div key={testimonial.id} style={{ border: '1px solid var(--color-border)', borderRadius: '4px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {testimonial.customerImage && (
                        <img 
                          src={testimonial.customerImage} 
                          alt={testimonial.customerName} 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{testimonial.customerName}</h3>
                        <div style={{ display: 'flex', gap: '2px', color: 'var(--color-primary)' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < testimonial.rating ? 'currentColor' : 'none'} 
                              color={i < testimonial.rating ? 'currentColor' : 'var(--color-border)'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <form action={async () => {
                        'use server'
                        await updateTestimonial(testimonial.id, { isActive: !testimonial.isActive })
                      }}>
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
                            color: testimonial.isActive ? 'var(--color-success)' : 'var(--color-text-muted)'
                          }}
                          title={testimonial.isActive ? 'Click to hide from website' : 'Click to show on website'}
                        >
                          {testimonial.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </form>
                      <form action={async () => {
                        'use server'
                        await deleteTestimonial(testimonial.id)
                      }}>
                        <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '4px' }} title="Delete Testimonial">
                          <Trash2 size={20} />
                        </button>
                      </form>
                    </div>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap', lineHeight: '1.5', marginTop: '0.5rem' }}>"{testimonial.review}"</p>

                  <details style={{ marginTop: '0.5rem' }}>
                    <summary style={{ cursor: 'pointer', color: 'var(--color-primary)', fontWeight: '500', fontSize: '0.875rem' }}>Edit</summary>
                    <form action={handleUpdate.bind(null, testimonial.id)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Customer Name</label>
                        <input type="text" name="customerName" defaultValue={testimonial.customerName} required style={editInputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Customer Image URL</label>
                        <input type="text" name="customerImage" defaultValue={testimonial.customerImage || ''} style={editInputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Rating (1-5)</label>
                        <input type="number" name="rating" min="1" max="5" defaultValue={testimonial.rating} required style={editInputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Review</label>
                        <textarea name="review" defaultValue={testimonial.review} rows={4} required style={{ ...editInputStyle, resize: 'vertical' }}></textarea>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Display Order</label>
                        <input type="number" name="order" defaultValue={testimonial.order ?? 0} style={editInputStyle} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" name="isActive" defaultChecked={testimonial.isActive} style={{ width: '18px', height: '18px' }} />
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Active (visible on website)</label>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>Save Changes</button>
                    </form>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const editInputStyle = {
  width: '100%',
  padding: '6px',
  border: '1px solid var(--color-border)',
  borderRadius: '4px',
  fontFamily: 'inherit'
}
