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
    const {
      entity_id,
      signal_strength,
      summary,
      source_url,
      meeting_date,
      raw_content,
      keywords_matched,
    } = body

    if (!entity_id || !signal_strength || !summary) {
      return NextResponse.json(
        { error: 'Missing required fields: entity_id, signal_strength, summary' },
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
