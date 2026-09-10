'use client'

import { useEffect, useRef, useState } from 'react'

export default function ClientProductSlider({ slides }: { slides: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  if (slides.length === 0) return null;

  const currentSlide = slides[activeIndex]

  // Parse JSON features and specs
  let parsedFeatures = []
  let parsedSpecs: any = {}
  try {
    parsedFeatures = currentSlide.features ? JSON.parse(currentSlide.features) : []
    parsedSpecs = currentSlide.specs ? JSON.parse(currentSlide.specs) : {}
  } catch (e) {
    console.error("Error parsing slider JSON", e)
  }

  return (
    <div style={{ backgroundColor: '#1a1a1a', padding: '6rem 2rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      
      {/* Slider Section */}
      <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: 'white', width: '100%' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .slider-content-layout {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
            gap: 3rem;
          }
          .slider-bullets {
            flex: 1 1 300px;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            order: 2;
          }
          .slider-image {
            flex: 1 1 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            height: 50vh;
            min-height: 400px;
            order: 1;
          }
          .slider-specs {
            flex: 1 1 300px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            order: 3;
          }
          @media (min-width: 1024px) {
            .slider-bullets { order: 1; }
            .slider-image { order: 2; }
            .slider-specs { order: 3; }
          }
        `}} />
        
        {/* Header */}
        <div style={{ textAlign: 'center', zIndex: 10, marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '0.5rem', transition: 'all 0.3s ease' }}>
            {currentSlide.title}
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#a3a3a3', transition: 'all 0.3s ease' }}>
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Content Layout */}
        <div className="slider-content-layout">
          
          {/* Left: Bullets */}
          <div className="slider-bullets">
            {parsedFeatures.map((bullet: string, i: number) => (
              <div key={i} className="animate-fade-in-up" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-primary)', marginTop: '2px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p style={{ fontSize: '1rem', color: '#e5e5e5', lineHeight: 1.6, fontWeight: '500' }}>
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Center: Image */}
          <div className="slider-image">
            {slides.map((slide, i) => (
              <img 
                key={i}
                src={slide.imagePath} 
                alt={slide.title}
                style={{
                  position: 'absolute',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex ? 'scale(1.1) translateY(0)' : 'scale(0.9) translateY(20px)',
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'drop-shadow(0px 30px 40px rgba(0,0,0,0.6))'
                }}
              />
            ))}
          </div>

          {/* Right: Specs Grid */}
          <div className="slider-specs">
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              
              <div style={specBoxStyle}>
                <div style={specTitleStyle}>{parsedSpecs.box1Title || 'Spec 1'}</div>
                <div style={specValueStyle}>{parsedSpecs.box1Value || '-'}</div>
              </div>

              <div style={specBoxStyle}>
                <div style={specTitleStyle}>{parsedSpecs.box2Title || 'Spec 2'}</div>
                <div style={specValueStyle}>{parsedSpecs.box2Value || '-'}</div>
              </div>

            </div>
            
            <div style={specBoxStyle}>
              <div style={specTitleStyle}>{parsedSpecs.box3Title || 'Spec 3'}</div>
              <div style={{ ...specValueStyle, fontSize: '2.5rem' }}>{parsedSpecs.box3Value || '-'}</div>
            </div>
            
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '3rem' }}>
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '32px' : '8px',
                height: '8px',
                backgroundColor: i === activeIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

const specBoxStyle = {
  flex: '1 1 120px',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(10px)',
}

const specTitleStyle = {
  fontSize: '0.875rem',
  color: '#a3a3a3',
  marginBottom: '0.75rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px'
}

const specValueStyle = {
  fontSize: '1.75rem',
  fontWeight: 'bold',
  color: 'white',
  lineHeight: 1.1
}
