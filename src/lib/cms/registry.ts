/**
 * CENTRAL CMS MODULE REGISTRY
 *
 * Single source of truth for: which modules exist, which public page each one
 * renders, which sections that page actually contains, and which connection
 * fields are relevant to the module.
 *
 * IMPORTANT: `sections` lists sections that genuinely exist in the public JSX
 * today. Do not add a section id here unless the public page really renders it,
 * otherwise the admin can select a destination that the website ignores.
 *
 * To register a new module later, add one entry to MODULES. The Content
 * Connections page, the connection previews and the route validation all read
 * from this file, so they pick the new module up without further changes.
 */

export type CmsFieldKey =
  | 'title'
  | 'shortTitle'
  | 'description'
  | 'shortDescription'
  | 'image'
  | 'galleryImages'
  | 'category'
  | 'rating'
  | 'order'
  | 'status'
  | 'featured'
  | 'navigationLabel'
  | 'route'

export type CmsModuleKind = 'singleton' | 'collection'

export interface CmsSection {
  id: string
  label: string
}

export interface CmsModule {
  /** Stable id used as the stored connection value. */
  id: string
  /** Human label shown in Super Admin selects. */
  label: string
  /** Label of the public page this module renders into. */
  pageLabel: string
  /** Real public route. Used for route generation and validation. */
  route: string
  /** Super Admin screen that manages this module's content. */
  adminPath: string
  /** `singleton` = one global record; `collection` = many records. */
  kind: CmsModuleKind
  /** Prisma model name backing this module, if any. */
  model?: string
  /** Sections that the public page actually renders. */
  sections: CmsSection[]
  /** Connection fields relevant to this module (item 19: form is dynamic). */
  fields: CmsFieldKey[]
  /**
   * True when this module renders a public page that reads PageSeo metadata.
   * Only these modules appear in the Super Admin SEO screen, so no SEO field
   * is ever editable for a page that would ignore it.
   */
  supportsSeo: boolean
}

export const MODULES: CmsModule[] = [
  {
    id: 'home',
    label: 'Home',
    pageLabel: 'Home Page',
    route: '/',
    adminPath: '/admin/cms/home',
    kind: 'singleton',
    model: 'HomeContent',
    sections: [
      { id: 'hero', label: 'Hero' },
      { id: 'stats', label: 'Statistics Bar' },
      { id: 'services-preview', label: 'Services Section' },
      { id: 'about-preview', label: 'About Preview' },
      { id: 'gallery-preview', label: 'Gallery Section' },
      { id: 'footer', label: 'Footer' },
    ],
    fields: ['title', 'description', 'image', 'order', 'status'],
    supportsSeo: true,
  },
  {
    id: 'product-slider',
    label: 'Product Slider',
    pageLabel: 'Home Page',
    route: '/',
    adminPath: '/admin/cms/home',
    kind: 'collection',
    model: 'ProductSliderItem',
    sections: [{ id: 'slider', label: 'Product Slider' }],
    fields: ['title', 'shortTitle', 'image', 'order', 'status'],
    supportsSeo: false,
  },
  {
    id: 'about',
    label: 'About Us',
    pageLabel: 'About Page',
    route: '/about',
    adminPath: '/admin/cms/about',
    kind: 'singleton',
    model: 'AboutContent',
    sections: [
      { id: 'heading', label: 'Main Content' },
      { id: 'history', label: 'Our History' },
      { id: 'mission', label: 'Our Mission' },
      { id: 'vision', label: 'Our Vision' },
      { id: 'footer', label: 'Footer' },
    ],
    fields: ['title', 'description', 'image', 'status'],
    supportsSeo: true,
  },
  {
    id: 'services',
    label: 'Services',
    pageLabel: 'Services Page',
    route: '/services',
    adminPath: '/admin/services',
    kind: 'collection',
    model: 'ServiceItem',
    sections: [
      { id: 'services-grid', label: 'Services Section' },
      { id: 'home-featured', label: 'Featured On Home Page' },
      { id: 'detail', label: 'Service Detail Page' },
    ],
    fields: ['title', 'shortDescription', 'description', 'image', 'featured', 'order', 'status', 'route'],
    supportsSeo: true,
  },
  {
    id: 'light-decoration',
    label: 'Light Decoration',
    pageLabel: 'Light Decoration Page',
    route: '/light-decoration',
    adminPath: '/admin/cms/light-decoration',
    kind: 'collection',
    model: 'LightDecorationItem',
    sections: [{ id: 'decoration-grid', label: 'Light Decoration Section' }],
    fields: ['title', 'description', 'image', 'category', 'featured', 'order', 'status'],
    supportsSeo: true,
  },
  {
    id: 'gallery',
    label: 'Gallery',
    pageLabel: 'Gallery Page',
    route: '/gallery',
    adminPath: '/admin/cms/gallery',
    kind: 'collection',
    model: 'GalleryItem',
    sections: [
      { id: 'gallery-grid', label: 'Gallery Section' },
      { id: 'home-featured', label: 'Featured On Home Page' },
    ],
    fields: ['title', 'description', 'image', 'category', 'featured', 'order', 'status'],
    supportsSeo: true,
  },
  {
    id: 'testimonials',
    label: 'Reviews / Testimonials',
    pageLabel: 'Reviews Page',
    route: '/testimonials',
    adminPath: '/admin/cms/testimonials',
    kind: 'collection',
    model: 'Testimonial',
    sections: [{ id: 'reviews-grid', label: 'Reviews Section' }],
    fields: ['title', 'description', 'image', 'rating', 'order', 'status'],
    supportsSeo: true,
  },
  {
    id: 'faq',
    label: 'FAQ',
    pageLabel: 'FAQ Page',
    route: '/faq',
    adminPath: '/admin/cms/faq',
    kind: 'collection',
    model: 'FAQItem',
    sections: [{ id: 'faq-accordion', label: 'FAQ Section' }],
    fields: ['title', 'description', 'order', 'status'],
    supportsSeo: true,
  },
  {
    id: 'contact',
    label: 'Contact',
    pageLabel: 'Contact Page',
    route: '/contact',
    adminPath: '/admin/cms/settings',
    kind: 'singleton',
    model: 'ContactInfo',
    sections: [
      { id: 'contact-details', label: 'Main Content' },
      { id: 'social', label: 'Social Links' },
      { id: 'map', label: 'Map Section' },
      { id: 'footer', label: 'Footer' },
    ],
    fields: ['title', 'description', 'status'],
    supportsSeo: true,
  },
  {
    id: 'navigation',
    label: 'Navigation',
    pageLabel: 'Site Header',
    route: '/',
    adminPath: '/admin/cms/navigation',
    kind: 'collection',
    model: 'NavigationItem',
    sections: [{ id: 'header', label: 'Header' }],
    fields: ['navigationLabel', 'route', 'order', 'status'],
    supportsSeo: false,
  },
]

/** Extra public routes that exist but are not CMS-managed modules. */
export const STATIC_ROUTES = ['/terms', '/book']

export function listModules(): CmsModule[] {
  return MODULES
}

export function getModule(id: string): CmsModule | undefined {
  return MODULES.find((m) => m.id === id)
}

export function getModuleByModel(model: string): CmsModule | undefined {
  return MODULES.find((m) => m.model === model)
}

/** Sections available for a module. Empty when the module is unknown. */
export function sectionsForModule(id: string): CmsSection[] {
  return getModule(id)?.sections ?? []
}

export function moduleSupportsField(id: string, field: CmsFieldKey): boolean {
  return getModule(id)?.fields.includes(field) ?? false
}

/** Every internal route the public site can actually serve. */
/** Modules whose public page genuinely reads PageSeo metadata. */
export function listSeoModules(): CmsModule[] {
  return MODULES.filter((m) => m.supportsSeo)
}

export function listInternalRoutes(): string[] {
  const routes = MODULES.map((m) => m.route).concat(STATIC_ROUTES)
  return Array.from(new Set(routes)).sort()
}

/**
 * Validates an internal route against the registry so the admin cannot save a
 * navigation link that 404s. External links are validated separately.
 */
export function isValidInternalRoute(href: string): boolean {
  if (!href || !href.startsWith('/')) return false
  const normalized = href.length > 1 ? href.replace(/\/+$/, '') : href
  if (listInternalRoutes().includes(normalized)) return true
  // Allow detail routes under a registered collection, e.g. /services/<id>
  return MODULES.some(
    (m) => m.kind === 'collection' && m.route !== '/' && normalized.startsWith(`${m.route}/`)
  )
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href)
}
