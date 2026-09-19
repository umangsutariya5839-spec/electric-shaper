'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  Calendar,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Eye,
  X,
  MessageCircle,
  Clock,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react'
import { createBookingRequest } from '@/app/actions/booking'

interface LightDecorationItem {
  id: string
  title: string
  description?: string | null
  category?: string | null
  imagePath: string
  isActive: boolean
  isFeatured: boolean
  order: number
}

interface PublicViewProps {
  items: LightDecorationItem[]
  whatsappNumber?: string | null
  phone?: string | null
  websiteName?: string | null
}

const PACKAGES = [
  {
    name: 'Basic Package',
    tagline: 'Perfect for small home events & birthdays',
    priceEstimate: 'Starting at ₹2,999',
    popular: false,
    features: [
      'Warm white ambient fairy lights (up to 50m)',
      'Entrance arch & doorway illumination',
      'Ceiling or balcony accent lighting',
      'Weatherproof, safe wiring & extension boxes',
      'On-time 1-day setup & clean removal'
    ]
  },
  {
    name: 'Standard Package',
    tagline: 'Ideal for engagements & festival celebrations',
    priceEstimate: 'Starting at ₹6,999',
    popular: true,
    features: [
      'Multi-layer LED strip & fairy curtain backdrop',
      'Balcony, terrace & garden border rope lights',
      'Decorative vintage Edison hanging bulbs',
      'Entrance tunnel & photo booth accent lighting',
      'Safe MCB junction box protection & testing',
      'Flexible 2-day installation support'
    ]
  },
  {
    name: 'Premium Package',
    tagline: 'Best for grand weddings & large banquets',
    priceEstimate: 'Starting at ₹14,999',
    popular: false,
    features: [
      'Complete venue transformation & tree wrapping',
      'Smart dynamic RGB color-changing fixtures',
      'Stage wash lights & focus spots for photography',
      'Pathway matrix & perimeter floodlights',
      'Dedicated on-site electrician during the event',
      'Multi-day festive support & full maintenance'
    ]
  },
  {
    name: 'Custom Package',
    tagline: 'Bespoke designs tailored to your venue',
    priceEstimate: 'Custom Quote',
    popular: false,
    features: [
      'Custom color theme matching your event palette',
      'Architectural lighting mapped to building layout',
      'Dimming zones & music/rhythm synchronization',
      'Indoor + outdoor large estate coverage',
      'Pre-event venue survey & 3D lighting design',
      'Priority standby support team'
    ]
  }
]

export default function LightDecorationPublicView({
  items,
  whatsappNumber = '1234567890',
  phone,
  websiteName = 'INTEC'
}: PublicViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedImage, setSelectedImage] = useState<LightDecorationItem | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Filter items
  const filteredItems = items.filter(item => {
    if (activeCategory === 'All') return true
    if (!item.category) return false
    return item.category.toLowerCase().includes(activeCategory.toLowerCase())
  })

  const cleanWhatsapp = (whatsappNumber || '').replace(/\D/g, '')

  const handlePackageSelect = (pkgName: string) => {
    setSelectedPackage(pkgName)
    const el = document.getElementById('booking-inquiry-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ color: 'var(--color-text-main)', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '10rem 1.5rem 6rem',
        background: 'radial-gradient(ellipse at top, #1e293b 0%, #090e17 100%)',
        color: '#ffffff',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Glowing Background Orbs */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(234, 179, 8, 0.12)',
            color: '#facc15',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            padding: '6px 18px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={16} /> Premium Festive &amp; Architectural Lighting
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: '900',
            letterSpacing: '-1px',
            lineHeight: '1.15',
            marginBottom: '1.25rem'
          }}>
            Transform Your Spaces with <br />
            <span style={{
              background: 'linear-gradient(135deg, #fde047 0%, #f59e0b 50%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Magical Light Decoration
            </span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#cbd5e1',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.6'
          }}>
            From intimate home balconies and festive Diwali lights to grand royal weddings and corporate galas &mdash; certified electricians delivering flawless, radiant illumination.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#booking-inquiry-section"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                padding: '12px 28px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(234, 179, 8, 0.3)'
              }}
            >
              Book Decoration <ArrowRight size={18} />
            </a>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello, I would like to inquire about light decoration services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#25D366',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <MessageCircle size={18} /> WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORIES OVERVIEW */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Decoration Categories
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Specialized lighting solutions crafted for every venue size, style, and celebration.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            {
              icon: '💡',
              title: 'LED Light Decoration',
              categoryName: 'LED',
              desc: 'High-efficiency LED strips, warm fairy strings, retro Edison bulbs, and RGB smart color washes.'
            },
            {
              icon: '🎉',
              title: 'Event & Wedding',
              categoryName: 'Event',
              desc: 'Grand wedding canopies, birthday backdrops, engagement floral lights, and festival illumination.'
            },
            {
              icon: '🏠',
              title: 'Home & Outdoor',
              categoryName: 'Home',
              desc: 'Balcony outlines, tree wrapping, garden pathway lights, terrace setups, and weatherproof facade lighting.'
            },
            {
              icon: '✨',
              title: 'Custom Decoration',
              categoryName: 'Custom',
              desc: 'Tailored to venue dimensions with custom color combinations, dimmer zones, and synchronized patterns.'
            }
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => setActiveCategory(cat.categoryName)}
              style={{
                backgroundColor: '#ffffff',
                border: activeCategory === cat.categoryName ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '2rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeCategory === cat.categoryName ? '0 10px 25px -5px rgba(234, 179, 8, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                transform: activeCategory === cat.categoryName ? 'translateY(-4px)' : 'none'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{cat.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{cat.desc}</p>
              <div style={{
                marginTop: '1.25rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Filter Gallery &rarr;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SHOWCASE */}
      <section style={{ padding: '4rem 1.5rem 6rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Our Decoration Gallery
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', margin: 0 }}>
                Explore our completed projects and lighting concepts.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'LED', 'Event', 'Home', 'Custom'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCategory(tab)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '25px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: activeCategory === tab ? 'var(--color-secondary)' : '#ffffff',
                    color: activeCategory === tab ? '#ffffff' : 'var(--color-text-main)',
                    fontWeight: activeCategory === tab ? 'bold' : '500',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {tab === 'All' ? 'All Photos' : tab}
                </button>
              ))}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px dashed #cbd5e1'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {items.length === 0 ? 'Decorations are being updated!' : `No decorations found under "${activeCategory}"`}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                {items.length === 0
                  ? 'Our team will upload latest photographs soon. You can still reach out via our booking form or WhatsApp for a customized lighting preview!'
                  : 'Try selecting "All Photos" to see other categories.'}
              </p>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello! Please share photos and catalog of your light decorations.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={18} /> Ask for Catalog on WhatsApp
              </a>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#0f172a' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <div style={{ background: 'rgba(255,255,255,0.9)', color: '#0f172a', padding: '8px 16px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Eye size={16} /> View Photo
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    {item.category && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--color-primary)',
                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        marginBottom: '0.5rem'
                      }}>
                        {item.category}
                      </span>
                    )}
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--color-secondary)' }}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.875rem',
                        margin: 0,
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#fef3c7',
            color: '#b45309',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem'
          }}>
            📋 Transparent Pricing
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Decoration Packages
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Choose from popular pre-designed setups or request custom venue lighting.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: pkg.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: '14px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: pkg.popular ? '0 12px 30px -5px rgba(234, 179, 8, 0.25)' : '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              {pkg.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}>
                  MOST POPULAR
                </div>
              )}

              <h3 style={{ fontSize: '1.35rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{pkg.name}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', minHeight: '38px' }}>
                {pkg.tagline}
              </p>

              <div style={{
                fontSize: '1.45rem',
                fontWeight: '900',
                color: 'var(--color-secondary)',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #f1f5f9'
              }}>
                {pkg.priceEstimate}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', lineHeight: '1.4' }}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handlePackageSelect(pkg.name)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: pkg.popular ? 'var(--color-primary)' : 'var(--color-secondary)',
                  color: pkg.popular ? 'var(--color-secondary)' : '#ffffff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'opacity 0.2s'
                }}
              >
                Select &amp; Inquire
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ backgroundColor: 'var(--color-secondary)', color: 'white', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Why Choose {websiteName} for Light Decoration?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
              We combine electrical expertise with aesthetic design for a safe, unforgettable experience.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <ShieldCheck size={28} color="#facc15" />,
                title: '100% Electrical Safety',
                desc: 'Certified electricians handling proper load distribution, waterproof fittings, and MCB earth protection.'
              },
              {
                icon: <Zap size={28} color="#facc15" />,
                title: 'Premium LED Technology',
                desc: 'Ultra-bright, energy-efficient fixtures that do not overheat or trip power supplies.'
              },
              {
                icon: <Clock size={28} color="#facc15" />,
                title: 'Punctual Setup & Takedown',
                desc: 'Always installed well before guests arrive, with prompt and clean post-event removal.'
              },
              {
                icon: <Sliders size={28} color="#facc15" />,
                title: 'Customized to Your Venue',
                desc: 'Every building, tree, and entrance is surveyed to tailor colors and lighting patterns.'
              }
            ].map((box, bIdx) => (
              <div key={bIdx} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.75rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ marginBottom: '1rem' }}>{box.icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{box.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY & BOOKING FORM SECTION */}
      <section id="booking-inquiry-section" style={{ padding: '6rem 1.5rem', backgroundColor: '#f1f5f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fef3c7',
                color: '#b45309',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                marginBottom: '0.75rem'
              }}>
                📞 Fast Booking Response
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Inquire &amp; Book Decoration
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Fill out the details below and our lighting team will contact you with availability and quote.
              </p>
            </div>

            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-success)', marginBottom: '0.5rem' }}>
                  Inquiry Received Successfully!
                </h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                  Thank you! Our lighting team will review your requirement and call you shortly to confirm dates and options.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSuccess(false)}
                  className="btn btn-primary"
                  style={{ padding: '8px 20px', borderRadius: '4px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                action={async (formData) => {
                  setIsSubmitting(true)
                  try {
                    const firstName = formData.get('firstName') as string
                    const lastName = formData.get('lastName') as string
                    const mobile = formData.get('mobile') as string
                    const eventType = formData.get('eventType') as string
                    const eventDate = formData.get('eventDate') as string
                    const venue = formData.get('venue') as string
                    const pkg = formData.get('selectedPackage') as string
                    const requirement = formData.get('requirement') as string

                    const problemDescription = `[Light Decoration Request]\nPackage: ${pkg || 'Not specified'}\nEvent Date: ${eventDate || 'TBD'}\nVenue/Location: ${venue || 'Not specified'}\nDetails: ${requirement || 'None'}`

                    // Create standard booking request
                    const subData = new FormData()
                    subData.append('firstName', firstName)
                    subData.append('lastName', lastName || '')
                    subData.append('mobile', mobile)
                    subData.append('category', `Light Decoration: ${eventType || 'General'}`)
                    subData.append('problemDescription', problemDescription)

                    await createBookingRequest(subData)
                    setFormSuccess(true)
                  } catch (e) {
                    // Redirect from Server Action can throw Next.js redirect
                    setFormSuccess(true)
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Your Name <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="E.g. Rajesh Kumar"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Mobile / WhatsApp Number <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Event Type <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <select
                      name="eventType"
                      required
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', backgroundColor: 'white' }}
                    >
                      <option value="Wedding">Wedding / Marriage</option>
                      <option value="Engagement">Engagement / Ring Ceremony</option>
                      <option value="Birthday">Birthday Party</option>
                      <option value="Festival">Festival (Diwali, Navratri, Ganpati)</option>
                      <option value="Home & Balcony">Home Balcony / Garden Lighting</option>
                      <option value="Corporate">Corporate / Commercial Event</option>
                      <option value="Other">Other Custom Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      name="venue"
                      placeholder="E.g. Surat, Ring Road, Home / Banquet"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Selected Package
                    </label>
                    <select
                      name="selectedPackage"
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', backgroundColor: 'white' }}
                    >
                      <option value="">-- Choose or Custom --</option>
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.name} value={pkg.name}>{pkg.name}</option>
                      ))}
                      <option value="Custom Quotation">Custom Quotation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                    Decoration Requirements / Light Preferences (Optional)
                  </label>
                  <textarea
                    name="requirement"
                    rows={3}
                    placeholder="E.g. Warm white LED strips for balcony, color theme golden and amber, venue size roughly 1000 sq ft..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', resize: 'vertical' }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '12px 24px', fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    {isSubmitting ? 'Submitting Inquiry...' : 'Submit Booking Inquiry'}
                  </button>

                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello, I am looking for light decoration services.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#25D366',
                      color: 'white',
                      padding: '12px 20px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      fontSize: '0.95rem'
                    }}
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              backgroundColor: '#0f172a',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '50%',
                padding: '6px',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <div style={{ maxHeight: '70vh', overflow: 'hidden', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.imagePath}
                alt={selectedImage.title}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '1.5rem', color: 'white' }}>
              {selectedImage.category && (
                <span style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: '600' }}>
                  {selectedImage.category}
                </span>
              )}
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '4px 0 8px' }}>
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
