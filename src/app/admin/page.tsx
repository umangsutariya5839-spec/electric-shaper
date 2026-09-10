import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Users, FileText, LayoutDashboard } from 'lucide-react'
import { DashboardCard } from '@/components/admin/DashboardCard'
import { getSessionRole } from '@/app/actions/auth'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const role = await getSessionRole()

  // 1. Website Booking Requests
  const totalBookings = await prisma.bookingRequest.count()
  const pendingBookings = await prisma.bookingRequest.count({
    where: { status: 'Pending' }
  })
  const convertedBookings = await prisma.bookingRequest.count({
    where: { status: 'Converted' }
  })

  // 2. Web Services
  const totalServices = await prisma.serviceItem.count()

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Website Content Management</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Manage your live website content and customer booking leads.</p>

      {/* Section 1: Website Leads & Bookings */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
        Website Leads (Booking Requests)
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <DashboardCard 
          title="New Pending Requests" 
          value={pendingBookings} 
          icon={<FileText size={24} color="var(--color-danger)" />} 
          trend="Customers waiting to be contacted" 
          href="/admin/bookings"
        />
        <DashboardCard 
          title="Converted Leads" 
          value={convertedBookings} 
          icon={<Users size={24} color="var(--color-success)" />} 
          trend="Bookings turned into jobs" 
          href="/admin/bookings"
        />
        <DashboardCard 
          title="Total Lifetime Requests" 
          value={totalBookings} 
          icon={<FileText size={24} />} 
          trend="All bookings submitted through the site" 
          href="/admin/bookings"
        />
      </div>

      {role === 'SUPER_ADMIN' && (
        <>
          {/* Section 2: Website Management */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            Website Content
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <DashboardCard 
              title="Active Web Services" 
              value={totalServices} 
              icon={<LayoutDashboard size={24} />} 
              trend="Services currently displayed on the homepage" 
              href="/admin/services"
            />
            
            {/* Quick Action Card for Adding a Service */}
            <Link href="/admin/services/new" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ 
                padding: '1.5rem', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: '2px dashed var(--color-border)', backgroundColor: 'transparent'
              }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', color: '#000', marginBottom: '1rem' }}>
                  <LayoutDashboard size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>+ Add New Service</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Publish a new service directly to the main website.</p>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
