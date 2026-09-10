'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBookingRequest(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const mobile = formData.get('mobile') as string
  const category = formData.get('category') as string
  const problemDescription = formData.get('problemDescription') as string

  await prisma.bookingRequest.create({
    data: {
      firstName,
      lastName,
      mobile,
      category,
      problemDescription,
    },
  })

  redirect('/book?success=true')
}

export async function updateBookingStatus(id: string, status: string) {
  await prisma.bookingRequest.update({
    where: { id },
    data: { status },
  })
  revalidatePath('/admin/bookings')
  revalidatePath('/owner/bookings')
}

export async function deleteBookingRequest(id: string) {
  await prisma.bookingRequest.delete({
    where: { id },
  })
  revalidatePath('/admin/bookings')
  revalidatePath('/owner/bookings')
}
