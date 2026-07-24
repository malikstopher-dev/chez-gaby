import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = (formData.get('bucket') as string) || 'media';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const supabase = createServiceClient();

    // Try Supabase storage first
    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, bytes, { contentType: file.type });

    if (!uploadError) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      return NextResponse.json({ url: data.publicUrl });
    }

    // Fallback: save to public/images/
    const publicDir = path.join(process.cwd(), 'public', 'images');
    await writeFile(path.join(publicDir, fileName), Buffer.from(bytes));
    return NextResponse.json({ url: `/images/${fileName}` });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Upload failed' }, { status: 500 });
  }
}
