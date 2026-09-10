'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// --- Settings ---
export async function updateSiteSettings(data: any) {
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data }
  })
  revalidatePath('/')
  revalidatePath('/admin/cms/settings')
}

export async function updateContactInfo(data: any) {
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
  await prisma.homeContent.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data }
  })
  revalidatePath('/')
  revalidatePath('/admin/cms/home')
}

export async function createSliderItem(data: any) {
  await prisma.productSliderItem.create({ data })
  revalidatePath('/')
  revalidatePath('/admin/cms/home')
}

export async function updateSliderItem(id: string, data: any) {
  await prisma.productSliderItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/admin/cms/home')
}

export async function deleteSliderItem(id: string) {
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
  await prisma.serviceItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
}

export async function createServiceItem(data: any) {
  await prisma.serviceItem.create({ data })
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
}

export async function deleteServiceItem(id: string) {
  try {
    await prisma.serviceItem.delete({ where: { id } })
  } catch (e) {}
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
}

// --- Gallery ---
export async function createGalleryItem(data: any) {
  await prisma.galleryItem.create({ data })
  revalidatePath('/gallery')
  revalidatePath('/admin/cms/gallery')
}

export async function updateGalleryItem(id: string, data: any) {
  await prisma.galleryItem.update({ where: { id }, data })
  revalidatePath('/gallery')
  revalidatePath('/admin/cms/gallery')
}

export async function deleteGalleryItem(id: string) {
  try {
    await prisma.galleryItem.delete({ where: { id } })
  } catch (e) {}
  revalidatePath('/gallery')
  revalidatePath('/admin/cms/gallery')
}

// --- Testimonials ---
export async function createTestimonial(data: any) {
  await prisma.testimonial.create({ data })
  revalidatePath('/testimonials')
  revalidatePath('/admin/cms/testimonials')
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } })
  } catch(e) {}
  revalidatePath('/testimonials')
  revalidatePath('/admin/cms/testimonials')
}

// --- FAQ ---
export async function createFAQ(data: any) {
  await prisma.fAQItem.create({ data })
  revalidatePath('/faq')
  revalidatePath('/admin/cms/faq')
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQItem.delete({ where: { id } })
  } catch(e) {}
  revalidatePath('/faq')
  revalidatePath('/admin/cms/faq')
}

// --- Navigation ---
export async function createNavigationItem(data: any) {
  await prisma.navigationItem.create({ data })
  revalidatePath('/')
  revalidatePath('/admin/cms/navigation')
}

export async function updateNavigationItem(id: string, data: any) {
  await prisma.navigationItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/admin/cms/navigation')
}

export async function deleteNavigationItem(id: string) {
  try {
    await prisma.navigationItem.delete({ where: { id } })
  } catch (e) {}
  revalidatePath('/')
  revalidatePath('/admin/cms/navigation')
}
