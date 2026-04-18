'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

// Helper to reliably create or fetch student so we don't hit foreign key constraints
async function ensureStudentExists(matricNo: string) {
  let student = await prisma.student.findUnique({ where: { matricNo } });
  if (!student) {
    student = await prisma.student.create({
      data: {
        matricNo,
        name: `Student ${matricNo}`, // Placeholder name
      }
    });
  }
  return student;
}

export async function uploadSingleResult(formData: FormData) {
  const matricNo = formData.get('matricNo') as string;
  const courseCode = formData.get('courseCode') as string;
  const score = parseFloat(formData.get('score') as string);
  const grade = formData.get('grade') as string;

  if (!matricNo || !courseCode || isNaN(score) || !grade) {
    return { error: 'All fields are required.' };
  }

  try {
    const student = await ensureStudentExists(matricNo);

    await prisma.result.create({
      data: {
        studentId: student.id,
        courseCode,
        score,
        grade,
        status: 'Pending',
      }
    });
    
    // Revalidate dashboard arrays
    revalidatePath('/admin/dashboard');
    revalidatePath('/senate/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function uploadBatchCSV(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file || file.size === 0) return { error: 'No valid file uploaded.' };

  try {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    
    // Check header minimum
    if (lines.length < 2) return { error: 'CSV file is empty or missing data rows.' };

    let addedCount = 0;

    // Start from index 1 to skip header
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(s => s.trim());
      // Expecting format: matricNo, courseCode, score, grade
      if (parts.length >= 4) {
        const matricNo = parts[0];
        const courseCode = parts[1];
        const score = parseFloat(parts[2]);
        const grade = parts[3];

        if (matricNo && courseCode && !isNaN(score) && grade) {
          const student = await ensureStudentExists(matricNo);
          await prisma.result.create({
            data: {
              studentId: student.id,
              courseCode,
              score,
              grade,
              status: 'Pending'
            }
          });
          addedCount++;
        }
      }
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/senate/dashboard');
    return { success: true, count: addedCount };
  } catch (err: any) {
    return { error: err.message };
  }
}
