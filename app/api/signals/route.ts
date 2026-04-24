import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function authenticate(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  if (!auth) return false
  const token = auth.replace('Bearer ', '')
  return token === process.env.API_SECRET_KEY
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    let {
      entity_id,
      entity_name,
      signal_strength,
      summary,
      ai_summary,
      source_url,
      meeting_date,
      raw_content,
      keywords_matched,
    } = body

    // Support flexible field names from Make.com
    summary = summary || ai_summary || ''
    signal_strength = signal_strength || 'watch'

    // If no entity_id, look up by entity_name
    if (!entity_id && entity_name) {
      const { data: entityData } = await supabase
        .from('entities')
        .select('id')
        .ilike('name', `%${entity_name}%`)
        .limit(1)
        .single()
      if (entityData) entity_id = entityData.id
    }

    if (!entity_id) {
      return NextResponse.json(
        { error: 'Could not resolve entity_id. Provide entity_id or valid entity_name' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('signals')
      .insert({
        entity_id,
        signal_strength,
        summary,
        source_url,
        meeting_date,
        raw_content,
        keywords_matched,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, signal: data }, { status: 201 })
  } catch (error) {
    console.error('Error inserting signal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    const { data, error } = await supabase
      .from('signals')
      .select('*, entities(name, entity_type)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json({ signals: data })
  } catch (error) {
    console.error('Error fetching signals:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
