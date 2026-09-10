import prisma from '@/lib/prisma'
import { createFAQ, deleteFAQ } from '@/app/actions/cms'
import { Trash2, Plus } from 'lucide-react'

export default async function FAQAdminPage() {
  const faqs = await prisma.fAQItem.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function handleCreate(formData: FormData) {
    'use server'
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string
    if (question && answer) {
      await createFAQ({ question, answer })
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
