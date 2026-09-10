'use client'

import { useState } from 'react'

export default function FAQClientPage({ faqs, siteSettings }: { faqs: any[], siteSettings: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text-main)' }}>
      
      <section style={{ 
        position: 'relative',
        padding: '12rem 2rem 6rem',
        backgroundColor: 'var(--color-secondary)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 className="animate-fade-in-up" style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '1rem' }}>
          Frequently Asked Questions
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
          Find answers to common questions about our repair processes, warranties, and capabilities.
        </p>
      </section>

      <section style={{ padding: '6rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="animate-fade-in-up"
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{ 
                  width: '100%', 
                  padding: '1.5rem 2rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: 'var(--color-secondary)'
                }}
              >
                {faq.question}
                <span style={{ 
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>▼</span>
              </button>
              
              <div style={{ 
                maxHeight: openIndex === index ? '500px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}>
                <div style={{ padding: '0 2rem 1.5rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}

          {faqs.length === 0 && (
             <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
               No FAQs have been added yet.
             </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#06101f', color: '#94a3b8', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white', letterSpacing: '-1px', marginBottom: '1rem' }}>
          {siteSettings?.websiteName?.replace('.', '') || 'INTEC'}<span style={{ color: 'var(--color-primary)' }}>.</span>
        </div>
        <p>{siteSettings?.footerContent || `© ${new Date().getFullYear()} Intec Electric & Rewinding Works. All rights reserved.`}</p>
      </footer>
    </div>
  )
}
