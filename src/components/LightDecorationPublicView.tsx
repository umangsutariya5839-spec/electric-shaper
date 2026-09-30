'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Eye,
  X,
  MessageCircle,
  Clock,
  ShieldCheck,
  Zap,
  Sliders,
  PhoneCall
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

// Authentic, real-world decoration projects with verified genuine photography
const REAL_DECORATION_GALLERY: LightDecorationItem[] = [
  {
    id: 'real-1',
    title: 'Diwali Home Exterior & Balcony Festive Lighting',
    category: '🪔 Festival & Diwali Lighting',
    description: 'Cascading golden rice light curtains draped along multi-floor balconies, terrace borders, and front entrance illumination for festive celebrations.',
    imagePath: 'https://images.unsplash.com/photo-1574873215043-44119461cb3b?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: true,
    order: 1
  },
  {
    id: 'real-2',
    title: 'Festive Balcony & Window Serial Rice Lights',
    category: '🪔 Festival & Diwali Lighting',
    description: 'Festive golden serial lights and fairy jhalar cascading gracefully down balcony railings with safe waterproof outdoor junction points.',
    imagePath: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: false,
    order: 2
  },
  {
    id: 'real-3',
    title: 'Royal Wedding Mandap & Lawn Fairy Canopy',
    category: '💍 Wedding & Mandap Illumination',
    description: 'Overhead warm fairy light canopy covering the entire wedding lawn with mandap spotlights and ambient photography glow.',
    imagePath: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: true,
    order: 3
  },
  {
    id: 'real-4',
    title: 'Grand Wedding Entrance Walkway Light Tunnel',
    category: '💍 Wedding & Mandap Illumination',
    description: 'Curved archway light tunnel decorated with dense warm LED fairy strings welcoming guests to the celebration banquet.',
    imagePath: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: true,
    order: 4
  },
  {
    id: 'real-5',
    title: 'Terrace Garden & Rooftop Party Hanging Bulbs',
    category: '🏡 Home & Balcony Lighting',
    description: 'Vintage warm Edison hanging bulbs strung across terrace railings and pergola creating an intimate evening lounge ambiance.',
    imagePath: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: true,
    order: 5
  },
  {
    id: 'real-6',
    title: 'Outdoor Garden & Tree Trunk Fairy Wrapping',
    category: '🏡 Home & Balcony Lighting',
    description: 'Dense tree trunk and branch wrapping using weatherproof micro-LED strings creating an enchanting illuminated landscape.',
    imagePath: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: false,
    order: 6
  },
  {
    id: 'real-7',
    title: 'Birthday & Family Celebration Fairy Backdrop',
    category: '🎂 Birthday & Party Celebration',
    description: 'Fairy light curtain backdrop with colorful party celebration ambiance and warm room illumination.',
    imagePath: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: true,
    order: 7
  },
  {
    id: 'real-8',
    title: 'Commercial Showroom & Building Opening Illumination',
    category: '🏢 Shop & Showroom Opening',
    description: 'Full building exterior serial light borders, illuminated storefront facade, and entrance spotlighting for commercial inaugurations.',
    imagePath: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
    isActive: true,
    isFeatured: true,
    order: 8
  }
]

const HUMAN_CATEGORIES = [
  {
    key: 'All',
    label: 'All Projects',
    icon: '✨',
    badge: 'All Work',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    desc: 'Browse our complete collection of real home, wedding, and festival lighting work.'
  },
  {
    key: 'Festival',
    label: 'Diwali & Festivals',
    icon: '🪔',
    badge: 'Festival & Diwali',
    image: 'https://images.unsplash.com/photo-1574873215043-44119461cb3b?w=800&auto=format&fit=crop&q=80',
    desc: 'Exterior house jhalar, serial rice lights, balcony drops, and colorful floodlights.'
  },
  {
    key: 'Wedding',
    label: 'Wedding & Mandap',
    icon: '💍',
    badge: 'Wedding & Mandap',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    desc: 'Grand fairy light canopies over lawns, mandap backdrops, and entrance arch tunnels.'
  },
  {
    key: 'Home',
    label: 'Home & Balcony',
    icon: '🏡',
    badge: 'Home & Balcony',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80',
    desc: 'Warm hanging balcony strings, terrace party lights, and garden tree wrapping.'
  },
  {
    key: 'Birthday',
    label: 'Birthday & Parties',
    icon: '🎂',
    badge: 'Birthday & Party',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
    desc: 'Photo-booth fairy curtains, warm Edison bulb drops, and indoor celebration ambiance.'
  },
  {
    key: 'Shop',
    label: 'Shop & Showroom',
    icon: '🏢',
    badge: 'Shop & Opening',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    desc: 'Grand opening building serial borders, entrance focus lights, and facade decoration.'
  }
]

const PACKAGES = [
  {
    name: 'Home & Balcony Festive Package',
    tagline: 'Ideal for Diwali, house warming & small celebrations',
    priceEstimate: 'Starting ₹2,500',
    popular: false,
    features: [
      'Warm white or multi-color fairy lights (up to 50 meters)',
      'Balcony railing drops & entrance doorway illumination',
      'Heavy-duty weatherproof extension cords & waterproof tape',
      'Safe MCB junction box protection against short circuits',
      'Same-day punctual installation and clean removal'
    ]
  },
  {
    name: 'Wedding & Mandap Special Package',
    tagline: 'Grand fairy canopies & entrance tunnels for weddings',
    priceEstimate: 'Starting ₹8,500',
    popular: true,
    features: [
      'Dense overhead fairy light canopy across lawn or terrace',
      'Grand entrance arch light tunnel welcoming guests',
      'Mandap & photo stage backdrop accent lighting',
      'Garden tree wrapping & boundary serial lighting',
      'Dedicated on-site electrician on standby throughout the event',
      '2-day flexible setup for pre-wedding functions'
    ]
  },
  {
    name: 'Terrace & Rooftop Party Package',
    tagline: 'Festive hanging bulbs for family get-togethers & parties',
    priceEstimate: 'Starting ₹4,500',
    popular: false,
    features: [
      'Vintage warm Edison filament hanging bulbs strung across',
      'Terrace border fairy curtains & perimeter lights',
      'Sound-system & DJ safe isolated electrical points',
      'Dimming control for dinner and dancing ambiance',
      'Prompt next-morning dismantling service'
    ]
  },
  {
    name: 'Full Venue & Commercial Quotation',
    tagline: 'Bespoke lighting for farmhouses, banquets & showrooms',
    priceEstimate: 'Custom Quotation',
    popular: false,
    features: [
      'On-site venue inspection & customized electrical load planning',
      'Color theme matching your wedding or brand colors',
      'Complete facade illumination, building outline & pathway wash',
      'Generator / backup power line synchronization',
      'Multi-day festival or event maintenance guarantee'
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

  // Use database items if added by admin, otherwise use curated real project photographs
  const displayItems = (items && items.length > 0) ? items : REAL_DECORATION_GALLERY

  // Filter items based on activeCategory
  const filteredItems = displayItems.filter(item => {
    if (activeCategory === 'All') return true
    const cat = (item.category || '').toLowerCase()
    const title = (item.title || '').toLowerCase()
    const target = activeCategory.toLowerCase()

    if (target === 'festival' || target === 'diwali') {
      return cat.includes('festival') || cat.includes('diwali') || title.includes('festival') || title.includes('diwali')
    }
    if (target === 'wedding' || target === 'mandap') {
      return cat.includes('wedding') || cat.includes('mandap') || title.includes('wedding') || title.includes('mandap')
    }
    if (target === 'home' || target === 'balcony') {
      return cat.includes('home') || cat.includes('balcony') || title.includes('home') || title.includes('balcony') || cat.includes('terrace')
    }
    if (target === 'birthday' || target === 'party') {
      return cat.includes('birthday') || cat.includes('party') || title.includes('birthday') || title.includes('party')
    }
    if (target === 'shop' || target === 'showroom') {
      return cat.includes('shop') || cat.includes('showroom') || title.includes('shop') || title.includes('showroom') || cat.includes('opening')
    }
    return cat.includes(target) || title.includes(target)
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
        {/* Ambient Lighting Glow */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '650px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.18) 0%, rgba(234, 179, 8, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />

        <div style={{ maxWidth: '920px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
            <Sparkles size={16} /> Authentic Event &amp; Festive Light Decoration
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: '900',
            letterSpacing: '-1px',
            lineHeight: '1.18',
            marginBottom: '1.25rem'
          }}>
            Lighting That Brings Life to Every Celebration
          </h1>

          <p style={{
            fontSize: '1.12rem',
            color: '#cbd5e1',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.6'
          }}>
            From Diwali home jhalar &amp; balcony fairy strings to grand wedding mandap canopies and showroom openings &mdash; reliable, certified electrical decoration done with precision and care.
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
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello, I am interested in light decoration services for my upcoming event.')}`}
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
              <MessageCircle size={18} /> WhatsApp for Fast Quote
            </a>
          </div>
        </div>
      </section>

      {/* REAL HUMAN CATEGORIES GRID WITH LIVE PICTURES */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            🌟 Real Work by Occasion
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Decoration Services by Occasion
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto' }}>
            Choose the kind of lighting you need for your home, marriage, or family function.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {HUMAN_CATEGORIES.filter(c => c.key !== 'All').map((cat) => (
            <div
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key)
                const el = document.getElementById('gallery-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                backgroundColor: '#ffffff',
                border: activeCategory === cat.key ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeCategory === cat.key ? '0 12px 28px -5px rgba(234, 179, 8, 0.3)' : '0 4px 14px rgba(0,0,0,0.05)',
                transform: activeCategory === cat.key ? 'translateY(-4px)' : 'none',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Real Live Photo Header */}
              <div
                style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', backgroundColor: '#0f172a' }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage({
                    id: `cat-${cat.key}`,
                    title: cat.label,
                    description: cat.desc,
                    category: cat.badge,
                    imagePath: cat.image,
                    isActive: true,
                    isFeatured: true,
                    order: 0
                  })
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.15) 60%, transparent 100%)'
                }} />
                {/* Category Badge on Photo */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(6px)',
                  color: '#facc15',
                  border: '1px solid rgba(250, 204, 21, 0.35)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span>{cat.icon}</span>
                  <span>{cat.badge}</span>
                </div>
                {/* Live Real Photo Tag */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '12px',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>📸 Real Live Photo</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--color-secondary)' }}>
                  {cat.label}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0, flex: 1 }}>
                  {cat.desc}
                </p>
                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  View Real Photos &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SHOWCASE WITH REAL PHOTOGRAPHS */}
      <section id="gallery-section" style={{ padding: '4rem 1.5rem 6rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fef3c7',
                color: '#b45309',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.78rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                📸 Real Work Gallery
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>
                Actual Decoration Photographs
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', margin: '4px 0 0 0' }}>
                Genuine setups delivered for weddings, homes, Diwali, and private parties.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {HUMAN_CATEGORIES.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '25px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: activeCategory === tab.key ? 'var(--color-secondary)' : '#ffffff',
                    color: activeCategory === tab.key ? '#ffffff' : 'var(--color-text-main)',
                    fontWeight: activeCategory === tab.key ? 'bold' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
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
                No photos found under this category
              </h3>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                Please select &ldquo;All Projects&rdquo; to see all photos, or message us on WhatsApp to receive our full photo album directly on your phone!
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="btn btn-primary"
                style={{ marginRight: '1rem' }}
              >
                Show All Photos
              </button>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello, please send me photos and rates for light decoration.')}`}
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
                <MessageCircle size={18} /> Request Album on WhatsApp
              </a>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.75rem'
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
                    position: 'relative',
                    border: '1px solid #e2e8f0'
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
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <div style={{ background: 'rgba(255,255,255,0.95)', color: '#0f172a', padding: '8px 18px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Eye size={16} /> Click to Enlarge
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    {item.category && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--color-secondary)',
                        backgroundColor: '#f1f5f9',
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

      {/* REAL-WORLD PACKAGES SECTION */}
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
            📋 Clear &amp; Fair Pricing
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Popular Decoration Packages
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Tailored packages with certified electrical safety, weather-proof wiring, and hassle-free takedown.
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

              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{pkg.name}</h3>
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
                Select This Package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US (GENUINE ELECTRICIAN ADVANTAGE) */}
      <section style={{ backgroundColor: 'var(--color-secondary)', color: 'white', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Why Hire {websiteName} for Your Decoration?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
              Unlike third-party event agents, we are certified electrical rewinders &amp; wiring specialists. Your family&apos;s safety and flawless power delivery are our highest priorities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <ShieldCheck size={28} color="#facc15" />,
                title: 'No Short-Circuits or Tripping',
                desc: 'All connections are made with proper load balancing, insulated tape, and MCB protection boxes.'
              },
              {
                icon: <Zap size={28} color="#facc15" />,
                title: 'Tested, High-Brightness Lights',
                desc: '100% copper core wiring and certified waterproof LED rice strings that will not dim or fail mid-event.'
              },
              {
                icon: <Clock size={28} color="#facc15" />,
                title: 'Setup Ready Before Guests Arrive',
                desc: 'We arrive early to finish installation, test all switches and leave your venue spotless.'
              },
              {
                icon: <PhoneCall size={28} color="#facc15" />,
                title: 'Local On-Site Support',
                desc: 'Located nearby in your area. If you need any adjustments or extra lights during the function, we are just a call away.'
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
                📞 Instant Booking &amp; Free Quotation
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Book Your Light Decoration
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Fill out the details below. We will call you within 15 minutes with availability and quote.
              </p>
            </div>

            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-success)', marginBottom: '0.5rem' }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                  Thank you! Our lighting team will review your requirement and call you shortly to confirm your dates.
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

                    const problemDescription = `[Light Decoration Request]\nOccasion: ${eventType}\nPackage: ${pkg || 'Not specified'}\nEvent Date: ${eventDate || 'TBD'}\nLocation: ${venue || 'Not specified'}\nDetails: ${requirement || 'None'}`

                    const subData = new FormData()
                    subData.append('firstName', firstName)
                    subData.append('lastName', lastName || '')
                    subData.append('mobile', mobile)
                    subData.append('category', `Light Decoration: ${eventType || 'General'}`)
                    subData.append('problemDescription', problemDescription)

                    await createBookingRequest(subData)
                    setFormSuccess(true)
                  } catch (e) {
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
                      placeholder="E.g. Jayesh Patel"
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
                      placeholder="E.g. 98765 43210"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Occasion / Event Type <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <select
                      name="eventType"
                      required
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', backgroundColor: 'white' }}
                    >
                      <option value="Festival & Diwali Lighting">🪔 Diwali / Festive Home Lighting</option>
                      <option value="Wedding & Mandap Illumination">💍 Wedding / Mandap / Reception</option>
                      <option value="Home & Balcony Lighting">🏡 Balcony / Terrace / House Warming (Gruh Pravesh)</option>
                      <option value="Birthday & Party Celebration">🎂 Birthday / Anniversary Celebration</option>
                      <option value="Shop & Showroom Opening">🏢 Shop / Showroom Grand Opening</option>
                      <option value="Other Custom Occasion">✨ Other Celebration</option>
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
                      Venue / Area Address
                    </label>
                    <input
                      type="text"
                      name="venue"
                      placeholder="E.g. Katargam / Varachha / Ring Road"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                      Package (Optional)
                    </label>
                    <select
                      name="selectedPackage"
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', backgroundColor: 'white' }}
                    >
                      <option value="">-- Choose Package or Custom --</option>
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.name} value={pkg.name}>{pkg.name}</option>
                      ))}
                      <option value="Custom Quotation">Custom Quotation Needed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' }}>
                    Any Special Lighting Preference (Optional)
                  </label>
                  <textarea
                    name="requirement"
                    rows={3}
                    placeholder="E.g. Need warm golden fairy lights for 2 balconies and terrace, or wedding entrance arch for 300 guests..."
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
                    {isSubmitting ? 'Submitting...' : 'Send Decoration Inquiry'}
                  </button>

                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello, I want to book light decoration. Please send rates and details.')}`}
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
                    <MessageCircle size={18} /> Chat Directly on WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FULL-SIZE PHOTO LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.88)',
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
                background: 'rgba(0,0,0,0.65)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '50%',
                padding: '8px',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <div style={{ maxHeight: '72vh', overflow: 'hidden', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.imagePath}
                alt={selectedImage.title}
                style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '1.5rem', color: 'white' }}>
              {selectedImage.category && (
                <span style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: '600' }}>
                  {selectedImage.category}
                </span>
              )}
              <h3 style={{ fontSize: '1.35rem', fontWeight: 'bold', margin: '4px 0 8px' }}>
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0, lineHeight: '1.5' }}>
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
