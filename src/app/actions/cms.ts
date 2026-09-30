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
      title: 'Diwali Home Exterior & Balcony Festive Lighting',
      category: '🪔 Festival & Diwali Lighting',
      description: 'Cascading golden rice light curtains draped along multi-floor balconies, terrace borders, and front entrance illumination for festive celebrations.',
      imagePath: 'https://images.unsplash.com/photo-1574873215043-44119461cb3b?w=1000&auto=format&fit=crop&q=80',
      order: 1,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Festive Balcony & Window Serial Rice Lights',
      category: '🪔 Festival & Diwali Lighting',
      description: 'Festive golden serial lights and fairy jhalar cascading gracefully down balcony railings with safe waterproof outdoor junction points.',
      imagePath: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=1000&auto=format&fit=crop&q=80',
      order: 2,
      isActive: true,
      isFeatured: false
    },
    {
      title: 'Royal Wedding Mandap & Lawn Fairy Canopy',
      category: '💍 Wedding & Mandap Illumination',
      description: 'Overhead warm fairy light canopy covering the entire wedding lawn with mandap spotlights and ambient photography glow.',
      imagePath: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80',
      order: 3,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Grand Wedding Entrance Walkway Light Tunnel',
      category: '💍 Wedding & Mandap Illumination',
      description: 'Curved archway light tunnel decorated with dense warm LED fairy strings welcoming guests to the celebration banquet.',
      imagePath: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80',
      order: 4,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Terrace Garden & Rooftop Party Hanging Bulbs',
      category: '🏡 Home & Balcony Lighting',
      description: 'Vintage warm Edison hanging bulbs strung across terrace railings and pergola creating an intimate evening lounge ambiance.',
      imagePath: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1000&auto=format&fit=crop&q=80',
      order: 5,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Outdoor Garden & Tree Trunk Fairy Wrapping',
      category: '🏡 Home & Balcony Lighting',
      description: 'Dense tree trunk and branch wrapping using weatherproof micro-LED strings creating an enchanting illuminated landscape.',
      imagePath: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
      order: 6,
      isActive: true,
      isFeatured: false
    },
    {
      title: 'Birthday & Family Celebration Fairy Backdrop',
      category: '🎂 Birthday & Party Celebration',
      description: 'Fairy light curtain backdrop with colorful party celebration ambiance and warm room illumination.',
      imagePath: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&auto=format&fit=crop&q=80',
      order: 7,
      isActive: true,
      isFeatured: true
    },
    {
      title: 'Commercial Showroom & Building Opening Illumination',
      category: '🏢 Shop & Showroom Opening',
      description: 'Full building exterior serial light borders, illuminated storefront facade, and entrance spotlighting for commercial inaugurations.',
      imagePath: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
      order: 8,
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


