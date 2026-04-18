'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function verifyResult(resultId: string) {
  try {
    await prisma.result.update({
      where: { id: resultId },
      data: { status: 'Verified' }
    });
    
    // In Phase 4, we will hook Nodemailer trigger here to notify parent
    
    revalidatePath('/senate/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function verifyBatch(resultIds: string[]) {
  try {
    await prisma.result.updateMany({
      where: { id: { in: resultIds } },
      data: { status: 'Verified' }
    });
    
    revalidatePath('/senate/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true, count: resultIds.length };
  } catch (error: any) {
    return { error: error.message };
  }
}
