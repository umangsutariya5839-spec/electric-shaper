'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCustomer(formData: FormData) {
  const name = formData.get('name') as string
  const mobile = formData.get('mobile') as string
  const address = formData.get('address') as string

  if (!name || !mobile) {
    throw new Error('Name and mobile are required')
  }

  await prisma.customer.create({
    data: {
      name,
      mobile,
      address,
    }
  })

  revalidatePath('/admin/customers')
  redirect('/admin/customers')
}
