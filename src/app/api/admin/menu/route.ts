import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServiceClient();
  const [catsRes, itemsRes] = await Promise.all([
    supabase.from('menu_categories').select('*').order('sort_order'),
    supabase.from('menu_items').select('*').order('sort_order'),
  ]);
  return NextResponse.json({ categories: catsRes.data || [], items: itemsRes.data || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServiceClient();

    if (body.type === 'category') {
      const { data, error } = await supabase.from('menu_categories').insert(body.data).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }

    if (body.type === 'item') {
      const { data, error } = await supabase.from('menu_items').insert(body.data).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServiceClient();

    if (body.type === 'category') {
      const { id, ...updates } = body.data;
      const { error } = await supabase.from('menu_categories').update(updates).eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    if (body.type === 'item') {
      const { id, ...updates } = body.data;
      const { error } = await supabase.from('menu_items').update(updates).eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const supabase = createServiceClient();

    if (type === 'category' && id) {
      const { error } = await supabase.from('menu_categories').delete().eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    if (type === 'item' && id) {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed' }, { status: 500 });
  }
}
