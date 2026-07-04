import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
  // Resolve the absolute path to the PDF in the public folder
  const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf');
  try {
    const data = await fs.readFile(pdfPath);
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Charitha_Resume.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new NextResponse('Resume not found', { status: 404 });
  }
}
