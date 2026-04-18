'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const role = formData.get('role') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // In a real application, you would query Prisma here to verify the password hash
  // e.g. const user = await prisma.user.findUnique({ where: { email } })
  // For the sake of this basic system, we accept any matching role pattern
  
  if (role && email && password) {
    const cookieStore = await cookies();
    cookieStore.set('auth_token', role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    if (role === 'senate') {
      redirect('/senate/dashboard');
    } else {
      redirect('/admin/dashboard');
    }
  } else {
    throw new Error("Invalid credentials");
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  redirect('/login');
}
