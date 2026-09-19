import prisma from '@/lib/prisma'
import FAQClientPage from './FAQClientPage'
import PublicHeader from '@/components/layout/PublicHeader'
import { buildModuleMetadata } from '@/lib/cms/seo'

export async function generateMetadata() {
  return buildModuleMetadata('faq', {
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about our services.'
  })
}

export default async function FAQPage() {
  const faqs = await prisma.fAQItem.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }]
  })
  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'global' } })

  return (
    <>
      <PublicHeader />
      <FAQClientPage faqs={faqs} siteSettings={siteSettings} />
    </>
  )
}

