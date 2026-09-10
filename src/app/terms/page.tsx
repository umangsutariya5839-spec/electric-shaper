import PublicHeader from '@/components/layout/PublicHeader'

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text-main)' }}>
      <div style={{ backgroundColor: 'var(--color-secondary)' }}>
        <PublicHeader />
        <div style={{ height: '80px' }}></div>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Terms & Conditions</h1>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
          
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>1. General Service Terms</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Intec Electric & Rewinding Works ("The Company") provides motor rewinding, submersible pump repair, and industrial switchgear services. By submitting a booking request or delivering equipment to our facility, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2. Repair Estimates & Approvals</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              An initial inspection will be conducted to determine the required repairs. We will provide a formal quotation for labor and materials. Repairs will only commence upon explicit approval from the client. The Company reserves the right to charge an inspection fee if the repair quote is rejected.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>3. Warranty & Liability</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              We provide a 6-month warranty on motor rewinding and a 3-month warranty on pump seals and bearings, subject to proper usage conditions (e.g., correct voltage, no phase loss, proper water levels). The Company is not liable for secondary damages caused by equipment failure.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>4. Billing and Payment</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Full payment is required before or upon collection of the repaired equipment, unless a prior credit agreement is in place. Outstanding amounts beyond 30 days may incur a late payment penalty.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>5. Unclaimed Goods</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Equipment left at our facility for more than 90 days after completion notification will be sold to recover repair and storage costs.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
