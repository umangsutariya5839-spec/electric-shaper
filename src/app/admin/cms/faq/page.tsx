import prisma from '@/lib/prisma'
import { createFAQ, updateFAQ, deleteFAQ } from '@/app/actions/cms'
import { Trash2, Plus } from 'lucide-react'

export default async function FAQAdminPage() {
  const faqs = await prisma.fAQItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }]
  })

  async function handleCreate(formData: FormData) {
    'use server'
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string
    const order = parseInt((formData.get('order') as string) || '0', 10)
    const isActive = formData.get('isActive') === 'on'
    if (question && answer) {
      await createFAQ({ question, answer, order: Number.isNaN(order) ? 0 : order, isActive })
    }
  }

  async function handleUpdate(id: string, formData: FormData) {
    'use server'
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string
    const order = parseInt((formData.get('order') as string) || '0', 10)
    const isActive = formData.get('isActive') === 'on'
    if (question && answer) {
      await updateFAQ(id, { question, answer, order: Number.isNaN(order) ? 0 : order, isActive })
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>FAQ Management</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New FAQ</h2>
          <form action={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Question</label>
              <input 
                type="text" 
                name="question" 
                required 
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                placeholder="E.g. What are your working hours?"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Answer</label>
              <textarea 
                name="answer" 
                required 
                rows={4}
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', resize: 'vertical' }}
                placeholder="E.g. We are open from..."
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
              <input type="checkbox" id="faq-add-active" name="isActive" defaultChecked style={{ width: '18px', height: '18px' }} />
              <label htmlFor="faq-add-active" style={{ fontWeight: '500' }}>Active (visible on website)</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: 'fit-content' }}>
              <Plus size={20} />
              Add FAQ
            </button>
          </form>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Existing FAQs</h2>
          {faqs.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)' }}>No FAQs added yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map(faq => (
                <div key={faq.id} style={{ border: '1px solid var(--color-border)', borderRadius: '4px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ maxWidth: '80%' }}>
                      <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{faq.question}</h3>
                      <p style={{ color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{faq.answer}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <form action={async () => {
                        'use server'
                        await updateFAQ(faq.id, { isActive: !faq.isActive })
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
                            color: faq.isActive ? 'var(--color-success)' : 'var(--color-text-muted)'
                          }}
                          title={faq.isActive ? 'Click to hide from website' : 'Click to show on website'}
                        >
                          {faq.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </form>
                      <form action={async () => {
                        'use server'
                        await deleteFAQ(faq.id)
                      }}>
                        <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '4px' }} title="Delete FAQ">
                          <Trash2 size={20} />
                        </button>
                      </form>
                    </div>
                  </div>

                  <details style={{ marginTop: '0.75rem' }}>
                    <summary style={{ cursor: 'pointer', color: 'var(--color-primary)', fontWeight: '500', fontSize: '0.875rem' }}>Edit</summary>
                    <form action={handleUpdate.bind(null, faq.id)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem', maxWidth: '600px' }}>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Question</label>
                        <input type="text" name="question" defaultValue={faq.question} required style={editInputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Answer</label>
                        <textarea name="answer" defaultValue={faq.answer} rows={4} required style={{ ...editInputStyle, resize: 'vertical' }}></textarea>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Display Order</label>
                        <input type="number" name="order" defaultValue={faq.order ?? 0} style={editInputStyle} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" name="isActive" defaultChecked={faq.isActive} style={{ width: '18px', height: '18px' }} />
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
