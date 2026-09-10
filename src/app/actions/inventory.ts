'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInventoryItem(formData: FormData) {
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const stockQuantity = parseFloat(formData.get('stockQuantity') as string)
  const purchasePrice = parseFloat(formData.get('purchasePrice') as string)
  const sellingPrice = parseFloat(formData.get('sellingPrice') as string)
  const lowStockAlert = parseFloat(formData.get('lowStockAlert') as string)

  await prisma.inventory.create({
    data: {
      name,
      category,
      stockQuantity,
      purchasePrice,
      sellingPrice,
      lowStockAlert,
    },
  })

  revalidatePath('/admin/inventory')
  redirect('/admin/inventory')
}

export async function deleteInventoryItem(id: string) {
  await prisma.inventory.delete({
    where: { id },
  })
  revalidatePath('/admin/inventory')
}
