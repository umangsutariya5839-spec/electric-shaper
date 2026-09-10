'use client'

import Link from 'next/link'
import { LayoutDashboard, Users, Wrench, Package, FileText, Banknote } from 'lucide-react'

import { logout } from '@/app/actions/auth'

export default function Sidebar({ role }: { role: string }) {
  const base = role === 'SUPER_ADMIN' ? '/admin' : '/owner'

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--color-secondary)',
      color: 'white',
      padding: 'var(--spacing-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-lg)'
    }}>
      <div style={{ 
        fontSize: '1.75rem', 
        fontWeight: 'bold', 
        color: 'var(--color-primary)',
        letterSpacing: '-0.5px'
      }}>
        INTEC
      </div>
      <div style={{ fontSize: '0.75rem', color: '#8892b0', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '1rem' }}>
        Management
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <SidebarLink href={`${base}`} icon={<LayoutDashboard size={20} />} label="Website Dashboard" />
        <SidebarLink href={`${base}/bookings`} icon={<FileText size={20} />} label="Booking Requests" />
      </nav>

      {role === 'SUPER_ADMIN' && (
        <>
          <div style={{ fontSize: '0.75rem', color: '#8892b0', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '1rem' }}>
            Website CMS
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            <SidebarLink href="/admin/cms/settings" icon={<Wrench size={20} />} label="Global Settings" />
            <SidebarLink href="/admin/cms/navigation" icon={<LayoutDashboard size={20} />} label="Navigation" />
            <SidebarLink href="/admin/cms/home" icon={<LayoutDashboard size={20} />} label="Home & Slider" />
            <SidebarLink href="/admin/cms/about" icon={<Users size={20} />} label="About Us" />
            <SidebarLink href="/admin/services" icon={<Package size={20} />} label="Services" />
            <SidebarLink href="/admin/cms/gallery" icon={<LayoutDashboard size={20} />} label="Gallery" />
            <SidebarLink href="/admin/cms/testimonials" icon={<Users size={20} />} label="Testimonials" />
            <SidebarLink href="/admin/cms/faq" icon={<FileText size={20} />} label="FAQ" />
          </nav>
        </>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <a href="/" target="_blank" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-secondary)',
          borderRadius: '4px',
          fontWeight: 'bold',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          View Live Website
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>

        <form action={logout}>
          <input type="hidden" name="redirectTo" value={`/login`} />
          <button type="submit" style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            backgroundColor: 'transparent',
            color: '#cbd5e1',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  )
}

function SidebarLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      transition: 'all 0.2s ease',
      color: '#e2e8f0',
      textDecoration: 'none',
      fontWeight: '500'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 184, 0, 0.1)'; e.currentTarget.style.color = 'var(--color-primary)' }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0' }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
