const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.navigationItem.count()
  if (existing === 0) {
    console.log('Seeding default navigation items...')
    await prisma.navigationItem.createMany({
      data: [
        { label: 'Home', href: '/', order: 1 },
        { label: 'About Us', href: '/about', order: 2 },
        { label: 'Services', href: '/services', order: 3 },
        { label: 'Gallery', href: '/gallery', order: 4 },
        { label: 'Reviews', href: '/testimonials', order: 5 },
        { label: 'FAQ', href: '/faq', order: 6 },
        { label: 'Contact', href: '/contact', order: 7 },
      ]
    })
    console.log('Done.')
  } else {
    console.log('Navigation items already exist, skipping seed.')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
