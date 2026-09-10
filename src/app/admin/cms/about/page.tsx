import prisma from '@/lib/prisma'
import AboutContentForm from './AboutContentForm'

export default async function AboutCMSPage() {
  const aboutContent = await prisma.aboutContent.findUnique({
    where: { id: 'global' }
  })

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>About Page Content</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Manage the about us section text, images, and company statistics.</p>
      </div>

      <AboutContentForm initialData={aboutContent} />
    </div>
  )
}
