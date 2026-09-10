import PublicHeader from '@/components/layout/PublicHeader'
import Link from 'next/link'
import { createBookingRequest } from '@/app/actions/booking'

export default function BookingPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const success = searchParams?.success === 'true';

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text-main)' }}>
      {/* Reusing PublicHeader but setting bg to secondary so it's visible */}
      <div style={{ backgroundColor: 'var(--color-secondary)' }}>
        <PublicHeader />
        <div style={{ height: '80px' }}></div>
      </div>
      
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Book a Repair</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Fill out the form below and our team will get in touch to coordinate the repair of your motor or electrical equipment.</p>
        </div>

        {success ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-success)' }}>Request Received!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Thank you for reaching out. Our team will review your request and contact you shortly.</p>
            <Link href="/" className="btn btn-primary">Return to Homepage</Link>
          </div>
        ) : (
          <div className="card">
            <form action={createBookingRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: '500' }}>First Name *</label>
                  <input type="text" name="firstName" style={inputStyle} placeholder="John" required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: '500' }}>Last Name *</label>
                  <input type="text" name="lastName" style={inputStyle} placeholder="Doe" required />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '500' }}>Mobile Number *</label>
                <input type="tel" name="mobile" style={inputStyle} placeholder="+1 234 567 8900" required />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '500' }}>What needs repairing? *</label>
                <select name="category" style={inputStyle} required>
                  <option value="">-- Select Category --</option>
                  <option value="motor">AC/DC Motor</option>
                  <option value="submersible">Submersible Pump</option>
                  <option value="generator">Generator</option>
                  <option value="other">Other Electrical Equipment</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '500' }}>Describe the problem</label>
                <textarea name="problemDescription" rows={4} style={inputStyle} placeholder="E.g. Motor is making a loud grinding noise and overheating..."></textarea>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input type="checkbox" id="tc" required style={{ width: '16px', height: '16px' }} />
                <label htmlFor="tc" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  I agree to the <Link href="/terms" target="_blank" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Terms & Conditions</Link> of service.
                </label>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
                Submit Booking Request
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>We will contact you within 24 hours.</p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '12px 14px',
  borderRadius: '4px',
  border: '1px solid var(--color-border)',
  fontSize: '1rem',
  fontFamily: 'inherit',
  backgroundColor: '#f9fafa',
  width: '100%'
}
