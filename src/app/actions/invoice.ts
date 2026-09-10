'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInvoice(formData: FormData) {
  const customerId = formData.get('customerId') as string
  const jobId = formData.get('jobId') as string | null
  
  const materialCharges = parseFloat(formData.get('materialCharges') as string) || 0
  const laborCharges = parseFloat(formData.get('laborCharges') as string) || 0
  const discount = parseFloat(formData.get('discount') as string) || 0
  
  const totalBill = materialCharges + laborCharges - discount
  
  // Create unique invoice number
  const count = await prisma.invoice.count()
  const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      customerId,
      jobId: jobId || null,
      materialCharges,
      laborCharges,
      discount,
      totalBill,
      outstandingAmount: totalBill,
      status: 'Pending'
    },
  })

  // Update customer's outstanding balance
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      totalBilled: { increment: totalBill },
      outstandingDue: { increment: totalBill }
    }
  })

  revalidatePath('/admin/invoices')
  revalidatePath('/admin/outstanding')
  redirect('/admin/invoices')
}

export async function recordPayment(invoiceId: string, amount: number) {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } })
  if (!invoice) return

  const newAmountReceived = invoice.amountReceived + amount
  const newOutstanding = invoice.totalBill - newAmountReceived
  
  let newStatus = invoice.status
  if (newOutstanding <= 0) {
    newStatus = 'Cleared'
  } else if (newAmountReceived > 0) {
    newStatus = 'Partially Cleared'
  }

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      amountReceived: newAmountReceived,
      outstandingAmount: newOutstanding,
      status: newStatus
    }
  })

  // Update customer outstanding balance
  await prisma.customer.update({
    where: { id: invoice.customerId },
    data: {
      outstandingDue: { decrement: amount }
    }
  })

  revalidatePath('/admin/invoices')
  revalidatePath('/admin/outstanding')
}

export async function deleteInvoice(id: string) {
  const invoice = await prisma.invoice.findUnique({ where: { id } })
  if (invoice) {
    // Revert customer outstanding
    await prisma.customer.update({
      where: { id: invoice.customerId },
      data: {
        totalBilled: { decrement: invoice.totalBill },
        outstandingDue: { decrement: invoice.outstandingAmount }
      }
    })
    
    await prisma.invoice.delete({ where: { id } })
  }
  revalidatePath('/admin/invoices')
  revalidatePath('/admin/outstanding')
}
