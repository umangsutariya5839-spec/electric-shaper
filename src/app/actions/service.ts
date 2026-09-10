'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createServiceItem(formData: FormData) {
  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const fullDescription = formData.get('fullDescription') as string
  const imagePath = formData.get('imagePath') as string

  await prisma.serviceItem.create({
    data: {
      title,
      shortDescription,
      fullDescription,
      imagePath,
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function deleteServiceItem(id: string) {
  await prisma.serviceItem.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/admin/services')
}
