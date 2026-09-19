'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSessionRole } from './auth'

// Reuses the existing cookie-based session. CMS content may only be mutated by SUPER_ADMIN.
async function requireSuperAdmin() {
  const role = await getSessionRole()
  if (role !== 'SUPER_ADMIN') {
    throw new Error('Unauthorized: SUPER_ADMIN role required.')
  }
}

export async function createServiceItem(formData: FormData) {
  await requireSuperAdmin()
  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const fullDescription = formData.get('fullDescription') as string
  const imagePath = formData.get('imagePath') as string
  const order = parseInt((formData.get('order') as string) || '0', 10)
  const isActive = formData.get('isActive') === 'on'

  await prisma.serviceItem.create({
    data: {
      title,
      shortDescription,
      fullDescription,
      imagePath,
      order: Number.isNaN(order) ? 0 : order,
      isActive,
    },
  })

  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function updateServiceItem(id: string, formData: FormData) {
  await requireSuperAdmin()
  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const fullDescription = formData.get('fullDescription') as string
  const imagePath = formData.get('imagePath') as string
  const order = parseInt((formData.get('order') as string) || '0', 10)
  const isActive = formData.get('isActive') === 'on'

  await prisma.serviceItem.update({
    where: { id },
    data: {
      title,
      shortDescription,
      fullDescription,
      imagePath,
      order: Number.isNaN(order) ? 0 : order,
      isActive,
    },
  })

  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function deleteServiceItem(id: string) {
  await requireSuperAdmin()
  await prisma.serviceItem.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
}
