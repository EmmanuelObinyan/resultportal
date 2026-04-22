'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { sendResultVerifiedEmail } from '../../lib/mailer';

// ---------------------------------------------------------------------------
// verifyResult — verifies a single result and emails the parent immediately.
// ---------------------------------------------------------------------------
export async function verifyResult(resultId: string) {
  try {
    // Update status in DB first so the UI reflects the change instantly
    const result = await prisma.result.update({
      where: { id: resultId },
      data: { status: 'Verified' },
      include: {
        student: {
          include: { parent: true },
        },
      },
    });

    // Phase 4 — Nodemailer email notification
    const { student } = result;
    const parent = student?.parent;

    if (parent?.email) {
      // Fire-and-forget — errors are caught inside sendResultVerifiedEmail
      sendResultVerifiedEmail({
        parentName:  parent.name,
        parentEmail: parent.email,
        studentName: student.name,
        matricNo:    student.matricNo,
        courseCode:  result.courseCode,
        courseName:  result.courseName,
        score:       result.score,
        grade:       result.grade,
      });
    } else {
      console.warn(
        `[senate/verify] No parent email found for student ${student?.matricNo ?? resultId}. Skipping notification.`
      );
    }

    revalidatePath('/senate/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('[senate/verify] Error verifying result:', error);
    return { error: error.message };
  }
}

// ---------------------------------------------------------------------------
// verifyBatch — verifies multiple results and emails each parent.
// ---------------------------------------------------------------------------
export async function verifyBatch(resultIds: string[]) {
  try {
    // Update all results in one DB write
    await prisma.result.updateMany({
      where: { id: { in: resultIds } },
      data: { status: 'Verified' },
    });

    // Fetch the updated results with parent info for email dispatch
    const results = await prisma.result.findMany({
      where: { id: { in: resultIds } },
      include: {
        student: {
          include: { parent: true },
        },
      },
    });

    // Send emails concurrently — each failure is caught inside the mailer
    await Promise.allSettled(
      results.map((result) => {
        const { student } = result;
        const parent = student?.parent;
        if (!parent?.email) {
          console.warn(
            `[senate/batch] No parent email for student ${student?.matricNo ?? result.id}. Skipping.`
          );
          return Promise.resolve();
        }
        return sendResultVerifiedEmail({
          parentName:  parent.name,
          parentEmail: parent.email,
          studentName: student.name,
          matricNo:    student.matricNo,
          courseCode:  result.courseCode,
          courseName:  result.courseName,
          score:       result.score,
          grade:       result.grade,
        });
      })
    );

    revalidatePath('/senate/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true, count: resultIds.length };
  } catch (error: any) {
    console.error('[senate/batch] Error in batch verify:', error);
    return { error: error.message };
  }
}
