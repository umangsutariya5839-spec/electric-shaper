import prisma from '@/lib/prisma'
import { updateBookingStatus, deleteBookingRequest } from '@/app/actions/booking'
import { Check, X, Trash2 } from 'lucide-react'

export default async function BookingsPage() {
  const requests = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Customer Booking Requests</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Manage service requests submitted through your public website.</p>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '12px' }}>Date</th>
              <th style={{ padding: '12px' }}>Customer</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Problem</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                  {req.createdAt.toLocaleDateString()}
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: '500' }}>{req.firstName} {req.lastName}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{req.mobile}</div>
                </td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{req.category}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>
                  {req.problemDescription ? req.problemDescription.substring(0, 50) + '...' : '-'}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    backgroundColor: req.status === 'Pending' ? 'rgba(255,193,7,0.2)' : req.status === 'Contacted' ? 'rgba(40,167,69,0.2)' : 'rgba(220,53,69,0.2)',
                    color: req.status === 'Pending' ? '#d39e00' : req.status === 'Contacted' ? '#28a745' : '#dc3545'
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {req.status === 'Pending' && (
                      <form action={async () => {
                        'use server'
                        await updateBookingStatus(req.id, 'Contacted')
                      }}>
                        <button type="submit" title="Mark Contacted" style={{ background: 'none', border: 'none', color: 'var(--color-success)', cursor: 'pointer' }}>
                          <Check size={20} />
                        </button>
                      </form>
                    )}
                    {req.status === 'Pending' && (
                      <form action={async () => {
                        'use server'
                        await updateBookingStatus(req.id, 'Rejected')
                      }}>
                        <button type="submit" title="Reject" style={{ background: 'none', border: 'none', color: 'var(--color-warning)', cursor: 'pointer' }}>
                          <X size={20} />
                        </button>
                      </form>
                    )}
                    <form action={async () => {
                      'use server'
                      await deleteBookingRequest(req.id)
                    }}>
                      <button type="submit" title="Delete" style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}>
                        <Trash2 size={20} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No booking requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
