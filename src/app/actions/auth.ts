'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Check Admin Credentials
  if (email === 'umang@123gmail.com' && password === 'umang@123') {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'SUPER_ADMIN', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return { success: true, role: 'SUPER_ADMIN' }
  }

  // Check Owner Credentials
  if (email === 'owner@intec.com' && password === 'owner123') {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'SHOP_OWNER', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return { success: true, role: 'SHOP_OWNER' }
  }

  return { success: false, error: 'Invalid email or password' }
}

export async function getSessionRole() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value
}

export async function logout(formData?: FormData) {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  const redirectTo = formData?.get('redirectTo') as string || '/login'
  redirect(redirectTo)
}
