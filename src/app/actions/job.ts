'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createJob(formData: FormData) {
  const customerId = formData.get('customerId') as string
  const applianceDetails = formData.get('applianceDetails') as string
  const complaint = formData.get('complaint') as string
  const isRewinding = formData.get('isRewinding') === 'on'
  
  // Rewinding specific
  const motorType = formData.get('motorType') as string
  const hp = formData.get('hp') as string
  const phase = formData.get('phase') as string
  const wireSize = formData.get('wireSize') as string
  const turns = formData.get('turns') ? parseInt(formData.get('turns') as string) : null

  // Generate a unique job number (e.g. JOB-1234)
  const count = await prisma.job.count()
  const jobNumber = `JOB-${1000 + count + 1}`

  await prisma.job.create({
    data: {
      jobNumber,
      customerId,
      applianceDetails,
      complaint,
      motorType: isRewinding ? motorType : null,
      hp: isRewinding ? hp : null,
      phase: isRewinding ? phase : null,
      wireSize: isRewinding ? wireSize : null,
      turns: isRewinding ? turns : null,
    }
  })

  revalidatePath('/admin/jobs')
  redirect('/admin/jobs')
}
