import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser for file handling
  },
};

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'temp_uploads', filename);

  try {
    // Read the request body as a Blob
    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Write the buffer to a file
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully', filePath: `/temp_uploads/${filename}` });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
