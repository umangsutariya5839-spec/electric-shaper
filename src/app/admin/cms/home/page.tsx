import prisma from '@/lib/prisma'
import HomeContentForm from './HomeContentForm'
import SliderManager from './SliderManager'

export default async function HomeCMSPage() {
  const homeContent = await prisma.homeContent.findUnique({
    where: { id: 'global' }
  })
  
  const sliderItems = await prisma.productSliderItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }]
  })

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Home Page Content</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Manage the hero section text, statistics, and product sliders displayed on the homepage.</p>
      </div>

      <HomeContentForm initialData={homeContent} />
      <SliderManager items={sliderItems} />
    </div>
  )
}

