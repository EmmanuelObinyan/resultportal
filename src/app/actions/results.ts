'use server';
 
import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
 
// Strips surrounding quotes AND whitespace — fixes Excel CSV exports
function cleanCell(value: string): string {
  return value.trim().replace(/^["']|["']$/g, '');
}
 
// Helper to reliably create or fetch student so we don't hit foreign key constraints
async function ensureStudentExists(matricNo: string) {
  let student = await prisma.student.findUnique({ where: { matricNo } });
  if (!student) {
    student = await prisma.student.create({
      data: {
        matricNo,
        name: `Student ${matricNo}`,
      },
    });
  }
  return student;
}
 
export async function uploadSingleResult(formData: FormData) {
  const matricNo = cleanCell(formData.get('matricNo') as string);
  const courseCode = cleanCell(formData.get('courseCode') as string);
  const score = parseFloat(formData.get('score') as string);
  const grade = cleanCell(formData.get('grade') as string);
  const semester = cleanCell((formData.get('semester') as string) || '');
  const session = cleanCell((formData.get('session') as string) || '');
 
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
        // Include semester/session if your schema requires them
        ...(semester && { semester }),
        ...(session && { session }),
      },
    });
 
    revalidatePath('/admin/dashboard');
    revalidatePath('/senate/dashboard');
    return { success: true };
  } catch (err: unknown) {
    // Bug 1 fix: always return a string message, never undefined
    const message = err instanceof Error ? err.message : String(err);
    console.error('[uploadSingleResult]', message);
    return { error: message };
  }
}
 
export async function uploadBatchCSV(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file || file.size === 0) return { error: 'No valid file uploaded.' };
 
  try {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
 
    if (lines.length < 2) return { error: 'CSV file is empty or missing data rows.' };
 
    // Bug 2 fix: parse the header row so column order doesn't matter
    // Expected headers (case-insensitive): matricNo, courseCode, score, grade
    // Optional headers: semester, session
    const headers = lines[0].split(',').map((h) => cleanCell(h).toLowerCase());
 
    const col = (name: string) => headers.indexOf(name);
 
    const iMatric = col('matricno');
    const iCourse = col('coursecode');
    const iScore = col('score');
    const iGrade = col('grade');
    const iSemester = col('semester');   // optional
    const iSession = col('session');     // optional
 
    // Validate required columns exist
    if (iMatric === -1 || iCourse === -1 || iScore === -1 || iGrade === -1) {
      const missing = ['matricno', 'coursecode', 'score', 'grade']
        .filter((h) => col(h) === -1)
        .join(', ');
      return { error: `CSV is missing required column(s): ${missing}. Check your header row.` };
    }
 
    let addedCount = 0;
    const errors: string[] = [];
 
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
 
      // Skip rows that don't have enough columns
      if (parts.length < 4) continue;
 
      const matricNo = cleanCell(parts[iMatric] ?? '');
      const courseCode = cleanCell(parts[iCourse] ?? '');
      const score = parseFloat(cleanCell(parts[iScore] ?? ''));
      const grade = cleanCell(parts[iGrade] ?? '');
      const semester = iSemester !== -1 ? cleanCell(parts[iSemester] ?? '') : undefined;
      const session = iSession !== -1 ? cleanCell(parts[iSession] ?? '') : undefined;
 
      // Skip rows with missing required values
      if (!matricNo || !courseCode || isNaN(score) || !grade) {
        errors.push(`Row ${i + 1}: skipped — missing or invalid value (matricNo="${matricNo}", courseCode="${courseCode}", score="${parts[iScore]}", grade="${grade}")`);
        continue;
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
            ...(semester && { semester }),
            ...(session && { session }),
          },
        });
        addedCount++;
      } catch (rowErr: unknown) {
        // Bug 1 fix: capture per-row errors without aborting the whole batch
        const msg = rowErr instanceof Error ? rowErr.message : String(rowErr);
        errors.push(`Row ${i + 1} (${matricNo} / ${courseCode}): ${msg}`);
        console.error(`[uploadBatchCSV] Row ${i + 1} failed:`, msg);
      }
    }
 
    revalidatePath('/admin/dashboard');
    revalidatePath('/senate/dashboard');
 
    // Return count + any row-level warnings so the UI can show them
    if (addedCount === 0 && errors.length > 0) {
      return {
        error: `All rows failed. First error: ${errors[0]}`,
        errors,
        count: 0,
      };
    }
 
    return {
      success: true,
      count: addedCount,
      // Pass warnings back so the frontend can optionally display them
      warnings: errors.length > 0 ? errors : undefined,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[uploadBatchCSV]', message);
    return { error: message };
  }
}