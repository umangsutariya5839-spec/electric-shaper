'use client'

import Link from 'next/link'
import React from 'react'

export function DashboardCard({ title, value, icon, trend, href }: { title: string, value: string | number, icon: React.ReactNode, trend: string, href: string }) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card" style={{ 
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)'
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{value}</div>
          </div>
          <div style={{ padding: '10px', backgroundColor: 'var(--color-background)', borderRadius: '8px', color: 'var(--color-primary)' }}>
            {icon}
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          {trend}
        </div>
      </div>
    </Link>
  )
}
