'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavProps {
  websiteName: string;
  whatsappNumber: string;
  navItems?: { id: string, label: string, href: string }[];
}

export default function ClientNav({ websiteName, whatsappNumber, navItems = [] }: NavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Default links if none exist in database
  const links = navItems.length > 0 ? navItems : [
    { id: '1', label: 'Home', href: '/' },
    { id: '2', label: 'About Us', href: '/about' },
    { id: '3', label: 'Services', href: '/services' },
    { id: '4', label: 'Gallery', href: '/gallery' },
    { id: '5', label: 'Reviews', href: '/testimonials' },
    { id: '6', label: 'FAQ', href: '/faq' },
    { id: '7', label: 'Contact', href: '/contact' },
  ]

  return (
    <header className={scrolled ? 'glass-nav' : ''} style={{
      padding: '1rem 2rem',
      backgroundColor: scrolled ? 'rgba(6, 16, 31, 0.95)' : 'transparent',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
      backdropFilter: scrolled ? 'blur(10px)' : 'none'
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .desktop-nav { display: flex; }
        .mobile-toggle { display: none; }
        .mobile-nav { display: none; }
        
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .mobile-nav { display: flex !important; }
        }
      `}} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.75rem', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            {websiteName.replace('.', '')}<span style={{ color: 'var(--color-primary)' }}>.</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ gap: '1.25rem', alignItems: 'center' }}>
          {links.map(link => (
            <Link 
              key={link.id} 
              href={link.href} 
              style={{ color: 'white', fontWeight: '500', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }} 
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} 
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              {link.label}
            </Link>
          ))}

          <Link href="/book" style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-secondary)',
            padding: '0.6rem 1.5rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            marginLeft: '0.5rem'
          }}>
            Book Repair
          </Link>
          
          <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#25D366',
            color: 'white',
            padding: '0.6rem 1.25rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}>
            WhatsApp
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="mobile-nav" style={{ 
          flexDirection: 'column', 
          gap: '1rem', 
          padding: '2rem 1rem',
          backgroundColor: 'var(--color-secondary)',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          {links.map(link => (
            <Link 
              key={link.id} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              style={{ color: 'white', fontWeight: '500', fontSize: '1.1rem', textDecoration: 'none', padding: '0.5rem 0' }} 
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link href="/book" onClick={() => setIsOpen(false)} style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-secondary)',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              textDecoration: 'none',
              flex: 1,
              textAlign: 'center'
            }}>
              Book Repair
            </Link>
            <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              textDecoration: 'none',
              flex: 1,
              textAlign: 'center'
            }}>
              WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
