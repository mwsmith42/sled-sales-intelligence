import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // POST /api/signals - Called by Make.com to write new signals
    export async function POST(request: NextRequest) {
      const authHeader = request.headers.get('authorization')
        if (authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
              }

                const body = await request.json()
                  const { signals, raw_data, digest } = body

                    const results: any = {}

                      // Insert raw meeting data if provided
                        if (raw_data) {
                            const { data, error } = await supabase
                                  .from('raw_meeting_data')
                                        .insert(raw_data)
                                              .select()
                                                  results.raw_data = error ? { error: error.message } : { inserted: data?.length }
                                                    }

                                                      // Insert signals if provided
                                                        if (signals && signals.length > 0) {
                                                            const { data, error } = await supabase
                                                                  .from('intel_signals')
                                                                        .insert(signals)
                                                                              .select()
                                                                                  results.signals = error ? { error: error.message } : { inserted: data?.length }
                                                                                    }

                                                                                      // Insert/update daily digest if provided
                                                                                        if (digest) {
                                                                                            const { data, error } = await supabase
                                                                                                  .from('daily_digests')
                                                                                                        .upsert(digest, { onConflict: 'digest_date' })
                                                                                                              .select()
                                                                                                                  results.digest = error ? { error: error.message } : { upserted: data?.length }
                                                                                                                    }
                                                                                                                    
                                                                                                                      // Log agent run
                                                                                                                        await supabase.from('agent_logs').insert({
                                                                                                                            agent_name: 'sled-research-agent',
                                                                                                                                status: 'success',
                                                                                                                                    signals_found: signals?.length ?? 0,
                                                                                                                                        entities_processed: raw_data ? 1 : 0,
                                                                                                                                          })
                                                                                                                                          
                                                                                                                                            return NextResponse.json({ success: true, results })
                                                                                                                                            }
                                                                                                                                            
                                                                                                                                            // GET /api/signals - Returns latest signals for dashboard
                                                                                                                                            export async function GET() {
                                                                                                                                              const { data, error } = await supabase
                                                                                                                                                  .from('intel_signals')
                                                                                                                                                      .select('*, target_entities(entity_name, entity_type)')
                                                                                                                                                          .order('created_at', { ascending: false })
                                                                                                                                                              .limit(20)
                                                                                                                                                              
                                                                                                                                                                if (error) return NextResponse.json({ error: error.message }, { status: 500 })
                                                                                                                                                                  return NextResponse.json({ signals: data })
                                                                                                                                                                  }
