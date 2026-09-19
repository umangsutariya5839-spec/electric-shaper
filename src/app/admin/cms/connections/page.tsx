import prisma from '@/lib/prisma'
import Link from 'next/link'
import { listModules } from '@/lib/cms/registry'
import { ExternalLink, Pencil } from 'lucide-react'

/**
 * CONTENT CONNECTIONS
 *
 * Read-only overview built from the existing CMS models plus the central module
 * registry. Deliberately adds no new tables: every row is derived from records
 * that already exist. "Actions" link through to the module's own admin screen,
 * so there is no duplicate editing UI.
 */

interface ConnectionRow {
  content: string
  moduleLabel: string
  pageLabel: string
  section: string
  inNavigation: boolean
  route: string
  displayLocation: string
  order: number | null
  isActive: boolean
  updatedAt: Date
  adminPath: string
}

export default async function ContentConnectionsPage() {
  const [
    homeContent,
    aboutContent,
    contactInfo,
    services,
    galleryItems,
    testimonials,
    faqs,
    sliderItems,
    navItems,
    decorationItems,
  ] = await Promise.all([
    prisma.homeContent.findUnique({ where: { id: 'global' } }),
    prisma.aboutContent.findUnique({ where: { id: 'global' } }),
    prisma.contactInfo.findUnique({ where: { id: 'global' } }),
    prisma.serviceItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
    prisma.galleryItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
    prisma.testimonial.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
    prisma.fAQItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
    prisma.productSliderItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
    prisma.navigationItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
    prisma.lightDecorationItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
  ])

  const mod = (id: string) => listModules().find((m) => m.id === id)!

  const navRoutes = new Set(navItems.filter((n: any) => n.isActive).map((n: any) => n.href))
  const rows: ConnectionRow[] = []

  const home = mod('home')
  if (homeContent) {
    rows.push({
      content: homeContent.heroHeading || 'Home page content',
      moduleLabel: home.label,
      pageLabel: home.pageLabel,
      section: 'Hero, Statistics Bar',
      inNavigation: navRoutes.has('/'),
      route: home.route,
      displayLocation: 'Home Page',
      order: null,
      isActive: true,
      updatedAt: homeContent.updatedAt,
      adminPath: home.adminPath,
    })
  }

  const about = mod('about')
  if (aboutContent) {
    rows.push({
      content: aboutContent.aboutHeading || 'About page content',
      moduleLabel: about.label,
      pageLabel: about.pageLabel,
      section: 'Main Content, Mission, Vision',
      inNavigation: navRoutes.has('/about'),
      route: about.route,
      displayLocation: 'About Page + Home Page preview',
      order: null,
      isActive: true,
      updatedAt: aboutContent.updatedAt,
      adminPath: about.adminPath,
    })
  }

  const contact = mod('contact')
  if (contactInfo) {
    rows.push({
      content: 'Contact details',
      moduleLabel: contact.label,
      pageLabel: contact.pageLabel,
      section: 'Main Content, Social Links, Map',
      inNavigation: navRoutes.has('/contact'),
      route: contact.route,
      displayLocation: 'Contact Page + Header',
      order: null,
      isActive: true,
      updatedAt: contactInfo.updatedAt,
      adminPath: contact.adminPath,
    })
  }

  const servicesMod = mod('services')
  for (const s of services as any[]) {
    rows.push({
      content: s.title,
      moduleLabel: servicesMod.label,
      pageLabel: servicesMod.pageLabel,
      section: s.isFeatured ? 'Services Section, Featured On Home Page' : 'Services Section',
      inNavigation: navRoutes.has('/services'),
      route: `/services/${s.id}`,
      displayLocation: s.isFeatured ? 'Services Page + Home Page' : 'Services Page',
      order: s.order,
      isActive: s.isActive,
      updatedAt: s.updatedAt,
      adminPath: `/admin/services/${s.id}/edit`,
    })
  }

  const galleryMod = mod('gallery')
  for (const g of galleryItems as any[]) {
    rows.push({
      content: g.title,
      moduleLabel: galleryMod.label,
      pageLabel: galleryMod.pageLabel,
      section: g.isFeatured ? 'Gallery Section, Featured On Home Page' : 'Gallery Section',
      inNavigation: navRoutes.has('/gallery'),
      route: galleryMod.route,
      displayLocation: g.isFeatured ? 'Gallery Page + Home Page' : 'Gallery Page',
      order: g.order,
      isActive: g.isActive,
      updatedAt: g.updatedAt,
      adminPath: galleryMod.adminPath,
    })
  }

  const decorationMod = mod('light-decoration')
  for (const d of decorationItems as any[]) {
    rows.push({
      content: d.title,
      moduleLabel: decorationMod.label,
      pageLabel: decorationMod.pageLabel,
      section: 'Light Decoration Section',
      inNavigation: navRoutes.has('/light-decoration'),
      route: decorationMod.route,
      displayLocation: 'Light Decoration Page',
      order: d.order,
      isActive: d.isActive,
      updatedAt: d.updatedAt,
      adminPath: decorationMod.adminPath,
    })
  }

  const reviewsMod = mod('testimonials')
  for (const t of testimonials as any[]) {
    rows.push({
      content: `${t.customerName} (${t.rating}/5)`,
      moduleLabel: reviewsMod.label,
      pageLabel: reviewsMod.pageLabel,
      section: 'Reviews Section',
      inNavigation: navRoutes.has('/testimonials'),
      route: reviewsMod.route,
      displayLocation: 'Reviews Page',
      order: t.order,
      isActive: t.isActive,
      updatedAt: t.updatedAt,
      adminPath: reviewsMod.adminPath,
    })
  }

  const faqMod = mod('faq')
  for (const f of faqs as any[]) {
    rows.push({
      content: f.question,
      moduleLabel: faqMod.label,
      pageLabel: faqMod.pageLabel,
      section: 'FAQ Section',
      inNavigation: navRoutes.has('/faq'),
      route: faqMod.route,
      displayLocation: 'FAQ Page',
      order: f.order,
      isActive: f.isActive,
      updatedAt: f.updatedAt,
      adminPath: faqMod.adminPath,
    })
  }

  const sliderMod = mod('product-slider')
  for (const s of sliderItems as any[]) {
    rows.push({
      content: s.title,
      moduleLabel: sliderMod.label,
      pageLabel: sliderMod.pageLabel,
      section: 'Product Slider',
      inNavigation: false,
      route: sliderMod.route,
      displayLocation: 'Home Page slider',
      order: s.order,
      isActive: s.isActive,
      updatedAt: s.updatedAt,
      adminPath: sliderMod.adminPath,
    })
  }

  const navMod = mod('navigation')
  for (const n of navItems as any[]) {
    rows.push({
      content: n.label,
      moduleLabel: navMod.label,
      pageLabel: navMod.pageLabel,
      section: 'Header',
      inNavigation: n.isActive,
      route: n.href,
      displayLocation: 'Header',
      order: n.order,
      isActive: n.isActive,
      updatedAt: n.updatedAt,
      adminPath: navMod.adminPath,
    })
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Content Connections</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Every piece of CMS content and exactly where it appears on the public website. Edit links
          open the module that owns the content.
        </p>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '12px' }}>Content</th>
              <th style={{ padding: '12px' }}>Module</th>
              <th style={{ padding: '12px' }}>Page</th>
              <th style={{ padding: '12px' }}>Section</th>
              <th style={{ padding: '12px' }}>Nav</th>
              <th style={{ padding: '12px' }}>Route</th>
              <th style={{ padding: '12px' }}>Display Location</th>
              <th style={{ padding: '12px' }}>Order</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Last Updated</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.moduleLabel}-${i}`} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px', fontWeight: '500', maxWidth: '220px' }}>{row.content}</td>
                <td style={{ padding: '12px' }}>{row.moduleLabel}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{row.pageLabel}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{row.section}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{row.inNavigation ? 'Yes' : 'No'}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{row.route}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{row.displayLocation}</td>
                <td style={{ padding: '12px' }}>{row.order ?? '-'}</td>
                <td style={{ padding: '12px', fontWeight: '500', color: row.isActive ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                  {row.isActive ? 'Active' : 'Disabled'}
                </td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  {new Date(row.updatedAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <Link href={row.adminPath} style={{ color: 'var(--color-primary)' }} title="Edit content">
                      <Pencil size={18} />
                    </Link>
                    <a href={row.route} target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-muted)' }} title="Preview on website">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={11} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No CMS content found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
