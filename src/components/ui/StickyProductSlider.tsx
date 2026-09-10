import prisma from '@/lib/prisma'
import ClientProductSlider from './ClientProductSlider'

export default async function StickyProductSlider() {
  const slides = await prisma.productSliderItem.findMany({
    orderBy: { createdAt: 'asc' }
  })
  
  return <ClientProductSlider slides={slides} />
}
