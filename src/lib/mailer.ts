import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// Transport — configured entirely from environment variables.
// Set these in your .env file (never commit real credentials).
// ---------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for port 465
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// ---------------------------------------------------------------------------
// Email payload types
// ---------------------------------------------------------------------------
export interface ResultVerifiedEmailParams {
  parentName: string;
  parentEmail: string;
  studentName: string;
  matricNo: string;
  courseCode: string;
  courseName?: string | null;
  score: number;
  grade: string;
}

// ---------------------------------------------------------------------------
// sendResultVerifiedEmail
// Sends a parent notification when a result is verified by the Senate.
// Errors are caught and logged — they will NOT propagate to the caller.
// ---------------------------------------------------------------------------
export async function sendResultVerifiedEmail(params: ResultVerifiedEmailParams): Promise<void> {
  const { parentName, parentEmail, studentName, matricNo, courseCode, courseName, score, grade } = params;

  const fromAddress = process.env.SMTP_FROM || `"MTU Result System" <${process.env.SMTP_USER}>`;
  const courseDisplay = courseName ? `${courseCode} – ${courseName}` : courseCode;
  const verifiedDate = new Date().toLocaleDateString('en-NG', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Result Verification Notice</title>
  <style>
    body { margin: 0; padding: 0; background: #F4F7FA; font-family: 'Segoe UI', Arial, sans-serif; color: #2D3748; }
    .wrapper { max-width: 620px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: #002D62; padding: 36px 40px; text-align: center; }
    .header h1 { margin: 0; color: #fff; font-size: 22px; letter-spacing: -0.4px; }
    .header p { margin: 6px 0 0; color: #a0bce0; font-size: 13px; }
    .badge { display: inline-block; background: #E5A93D; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 999px; margin-top: 14px; letter-spacing: 0.05em; text-transform: uppercase; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 16px; margin-bottom: 16px; }
    .intro { color: #4A5568; font-size: 14px; line-height: 1.7; margin-bottom: 28px; }
    .result-box { background: #F0F6FF; border: 1px solid #C3D9F7; border-radius: 10px; padding: 24px 28px; margin-bottom: 28px; }
    .result-box table { width: 100%; border-collapse: collapse; }
    .result-box td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #DAEAFF; }
    .result-box td:first-child { color: #718096; font-weight: 500; width: 140px; }
    .result-box td:last-child { font-weight: 600; color: #1A365D; }
    .result-box tr:last-child td { border-bottom: none; }
    .status-verified { display: inline-block; background: #F0FFF4; color: #276749; border: 1px solid #9AE6B4; padding: 3px 12px; border-radius: 999px; font-size: 13px; font-weight: 700; }
    .notice { font-size: 13px; color: #718096; line-height: 1.6; border-left: 3px solid #E5A93D; padding-left: 14px; margin-bottom: 28px; }
    .footer { background: #F8FAFC; padding: 24px 40px; text-align: center; border-top: 1px solid #E2E8F0; }
    .footer p { margin: 0; font-size: 12px; color: #A0AEC0; }
    .footer strong { color: #002D62; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Mountain Top University</h1>
      <p>Office of Senate — Academic Result Notification</p>
      <span class="badge">✓ Officially Verified</span>
    </div>
    <div class="body">
      <p class="greeting">Dear <strong>${parentName}</strong>,</p>
      <p class="intro">
        We are pleased to inform you that the academic result for your ward has been officially reviewed
        and verified by the Mountain Top University Senate Executive Board. Please find the details below.
      </p>

      <div class="result-box">
        <table>
          <tr>
            <td>Student Name</td>
            <td>${studentName}</td>
          </tr>
          <tr>
            <td>Matric Number</td>
            <td>${matricNo}</td>
          </tr>
          <tr>
            <td>Course</td>
            <td>${courseDisplay}</td>
          </tr>
          <tr>
            <td>Score</td>
            <td>${score}</td>
          </tr>
          <tr>
            <td>Grade</td>
            <td>${grade}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td><span class="status-verified">Verified</span></td>
          </tr>
          <tr>
            <td>Date Verified</td>
            <td>${verifiedDate}</td>
          </tr>
        </table>
      </div>

      <p class="notice">
        This is an official communication from the Mountain Top University Result Management System.
        If you have any concerns or believe there is an error, please contact the Registrar's Office
        within 14 days of this notification.
      </p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} <strong>Mountain Top University</strong> · All rights reserved.</p>
      <p style="margin-top: 4px;">This is an automated message. Please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const textBody = `
Dear ${parentName},

This is to inform you that the academic result for your ward has been officially verified by the Mountain Top University Senate Executive Board.

RESULT DETAILS
--------------
Student Name : ${studentName}
Matric Number: ${matricNo}
Course       : ${courseDisplay}
Score        : ${score}
Grade        : ${grade}
Status       : Verified
Date         : ${verifiedDate}

If you have any concerns, please contact the Registrar's Office within 14 days.

Mountain Top University
Office of Senate — Result Management System
  `.trim();

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: parentEmail,
      subject: `[MTU] Result Verified – ${studentName} (${matricNo}) · ${courseCode}`,
      text: textBody,
      html: htmlBody,
    });
    console.log(`[Mailer] Email sent successfully to ${parentEmail} for ${matricNo} (${courseCode})`);
  } catch (error) {
    // Deliberately non-fatal — log the error but do NOT re-throw
    console.error(`[Mailer] Failed to send email to ${parentEmail}:`, error);
  }
}
