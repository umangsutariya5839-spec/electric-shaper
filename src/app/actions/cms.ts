'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getSessionRole } from './auth'
import { isValidInternalRoute, isExternalUrl, listInternalRoutes, getModule } from '@/lib/cms/registry'

// Reuses the existing cookie-based session. CMS content may only be mutated by SUPER_ADMIN.
async function requireSuperAdmin() {
  const role = await getSessionRole()
  if (role !== 'SUPER_ADMIN') {
    throw new Error('Unauthorized: SUPER_ADMIN role required.')
  }
}

function validateNavigationData(data: any) {
  const label = String(data?.label ?? '').trim()
  const href = String(data?.href ?? '').trim()
  const order = Number(data?.order ?? 0)

  if (!label) return { error: 'Navigation label is required.' }
  if (!Number.isFinite(order)) return { error: 'Navigation order must be a number.' }
  if (!href) return { error: 'Navigation URL is required.' }

  if (href.startsWith('/')) {
    if (!isValidInternalRoute(href)) {
      return {
        error: `Invalid internal route "${href}". Allowed routes: ${listInternalRoutes().join(", ")}`,
      }
    }
  } else if (!isExternalUrl(href)) {
    return { error: 'URL must be an internal route or an http(s) external URL.' }
  }

  return { error: null }
}

// --- Settings ---
export async function updateSiteSettings(data: any) {
  await requireSuperAdmin()
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data }
  })
  revalidatePath('/')
  revalidatePath('/admin/cms/settings')
}

export async function updateContactInfo(data: any) {
  await requireSuperAdmin()
  await prisma.contactInfo.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data }
  })
  revalidatePath('/')
  revalidatePath('/contact')
  revalidatePath('/admin/cms/settings')
}

// --- Home & Slider ---
export async function updateHomeContent(data: any) {
  await requireSuperAdmin()
  await prisma.homeContent.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data }
  })
  revalidatePath('/')
  revalidatePath('/admin/cms/home')
}

export async function createSliderItem(data: any) {
  await requireSuperAdmin()
  await prisma.productSliderItem.create({ data })
  revalidatePath('/')
  revalidatePath('/admin/cms/home')
}

export async function updateSliderItem(id: string, data: any) {
  await requireSuperAdmin()
  await prisma.productSliderItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/admin/cms/home')
}

export async function deleteSliderItem(id: string) {
  await requireSuperAdmin()
  try {
    await prisma.productSliderItem.delete({ where: { id } })
  } catch (error) {
    // Ignore error if record already deleted
  }
  revalidatePath('/')
  revalidatePath('/admin/cms/home')
}

// --- About ---
export async function updateAboutContent(data: any) {
  await requireSuperAdmin()
  await prisma.aboutContent.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data }
  })
  revalidatePath('/about')
  revalidatePath('/admin/cms/about')
}

// --- Services --- (Using existing routes or we can add here)
export async function updateServiceItem(id: string, data: any) {
  await requireSuperAdmin()
  await prisma.serviceItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
}

export async function createServiceItem(data: any) {
  await requireSuperAdmin()
  await prisma.serviceItem.create({ data })
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
}

export async function deleteServiceItem(id: string) {
  await requireSuperAdmin()
  try {
    await prisma.serviceItem.delete({ where: { id } })
  } catch (e) {}
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
}

// --- Gallery ---
export async function createGalleryItem(data: any) {
  await requireSuperAdmin()
  await prisma.galleryItem.create({ data })
  revalidatePath('/')
  revalidatePath('/gallery')
  revalidatePath('/admin/cms/gallery')
}

export async function updateGalleryItem(id: string, data: any) {
  await requireSuperAdmin()
  await prisma.galleryItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/gallery')
  revalidatePath('/admin/cms/gallery')
}

export async function deleteGalleryItem(id: string) {
  await requireSuperAdmin()
  try {
    await prisma.galleryItem.delete({ where: { id } })
  } catch (e) {}
  revalidatePath('/')
  revalidatePath('/gallery')
  revalidatePath('/admin/cms/gallery')
}

// --- Testimonials ---
export async function createTestimonial(data: any) {
  await requireSuperAdmin()
  await prisma.testimonial.create({ data })
  revalidatePath('/testimonials')
  revalidatePath('/admin/cms/testimonials')
}

export async function updateTestimonial(id: string, data: any) {
  await requireSuperAdmin()
  await prisma.testimonial.update({ where: { id }, data })
  revalidatePath('/testimonials')
  revalidatePath('/admin/cms/testimonials')
}

export async function deleteTestimonial(id: string) {
  await requireSuperAdmin()
  try {
    await prisma.testimonial.delete({ where: { id } })
  } catch(e) {}
  revalidatePath('/testimonials')
  revalidatePath('/admin/cms/testimonials')
}

// --- FAQ ---
export async function createFAQ(data: any) {
  await requireSuperAdmin()
  await prisma.fAQItem.create({ data })
  revalidatePath('/faq')
  revalidatePath('/admin/cms/faq')
}

export async function updateFAQ(id: string, data: any) {
  await requireSuperAdmin()
  await prisma.fAQItem.update({ where: { id }, data })
  revalidatePath('/faq')
  revalidatePath('/admin/cms/faq')
}

export async function deleteFAQ(id: string) {
  await requireSuperAdmin()
  try {
    await prisma.fAQItem.delete({ where: { id } })
  } catch(e) {}
  revalidatePath('/faq')
  revalidatePath('/admin/cms/faq')
}

// --- Navigation ---
export async function createNavigationItem(data: any) {
  await requireSuperAdmin()
  const validation = validateNavigationData(data)
  if (validation.error) return validation

  await prisma.navigationItem.create({ data })
  revalidatePath('/')
  revalidatePath('/admin/cms/navigation')
  return { error: null }
}

export async function updateNavigationItem(id: string, data: any) {
  await requireSuperAdmin()
  const validation = validateNavigationData(data)
  if (validation.error) return validation

  await prisma.navigationItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/admin/cms/navigation')
  return { error: null }
}
export async function deleteNavigationItem(id: string) {
  await requireSuperAdmin()
  try {
    await prisma.navigationItem.delete({ where: { id } })
  } catch (e) {}
  revalidatePath('/')
  revalidatePath('/admin/cms/navigation')
}





// --- Light Decoration ---
export async function createLightDecorationItem(data: any) {
  await requireSuperAdmin()
  await prisma.lightDecorationItem.create({ data })
  revalidatePath('/light-decoration')
  revalidatePath('/admin/cms/light-decoration')
  revalidatePath('/admin/cms/connections')
}

export async function updateLightDecorationItem(id: string, data: any) {
  await requireSuperAdmin()
  await prisma.lightDecorationItem.update({ where: { id }, data })
  revalidatePath('/light-decoration')
  revalidatePath('/admin/cms/light-decoration')
  revalidatePath('/admin/cms/connections')
}

export async function deleteLightDecorationItem(id: string) {
  await requireSuperAdmin()
  try {
    await prisma.lightDecorationItem.delete({ where: { id } })
  } catch (e) {}
  revalidatePath('/light-decoration')
  revalidatePath('/admin/cms/light-decoration')
  revalidatePath('/admin/cms/connections')
}

export async function seedSampleLightDecorations() {
  await requireSuperAdmin()
  const samples = [
    {
      title: 'Royal Wedding & Event Lighting',
      category: '🎉 Event Decoration',
      description: 'Grand canopy warm fairy lights, floral stage backdrops, entrance tunnel lights, and ambient chandelier setups for weddings and receptions.',
      imagePath: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80',
      order: 1,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Balcony & Garden Architectural LED',
      category: '🏠 Home & Outdoor Decoration',
      description: 'Waterproof warm white LED strip profiles, terrace lighting, tree string fairy lights, and garden pathway illumination.',
      imagePath: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1000&auto=format&fit=crop&q=80',
      order: 2,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Festive & Party RGB Color Illumination',
      category: '💡 LED Light Decoration',
      description: 'Multi-color smart RGB LED strips, dynamic color-chasing patterns, and festival decorative hanging bulbs.',
      imagePath: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000&auto=format&fit=crop&q=80',
      order: 3,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Bespoke Custom Light Installation',
      category: '✨ Custom Decoration',
      description: 'Tailored decorative lighting designed to your venue dimensions with custom color themes, dimming zones, and synchronized effects.',
      imagePath: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1000&auto=format&fit=crop&q=80',
      order: 4,
      isActive: true,
      isFeatured: true
    }
  ]

  for (const item of samples) {
    await prisma.lightDecorationItem.create({ data: item })
  }

  revalidatePath('/light-decoration')
  revalidatePath('/admin/cms/light-decoration')
  revalidatePath('/admin/cms/connections')
}

// --- Page SEO ---
export async function updatePageSeo(moduleId: string, data: any) {
  await requireSuperAdmin()
  const mod = getModule(moduleId)

  if (!mod) return { error: `Unknown module "${moduleId}".` }
  if (!mod.supportsSeo) {
    return {
      error: `"${mod.label}" does not render a page that reads SEO metadata.`,
    }
  }

  await prisma.pageSeo.upsert({
    where: { moduleId },
    update: data,
    create: { moduleId, ...data },
  })

  revalidatePath(mod.route)
  revalidatePath('/admin/cms/seo')
  return { error: null }
}


