import { createClient } from '@/lib/supabase/server'
import SignalFeed from '@/components/SignalFeed'
import DailyDigest from '@/components/DailyDigest'
import StatsBar from '@/components/StatsBar'

export const revalidate = 300

export default async function HomePage() {
    const supabase = createClient()

  const { data: signals } = await supabase
      .from('intel_signals')
      .select('*, target_entities(entity_name, entity_type)')
      .order('created_at', { ascending: false })
      .limit(50)

  const { data: digest } = await supabase
      .from('daily_digests')
      .select('*')
      .order('digest_date', { ascending: false })
      .limit(1)
      .single()

  const hotSignals = signals?.filter(s => s.signal_strength === 'hot' && !s.actioned) ?? []
      const warmSignals = signals?.filter(s => s.signal_strength === 'warm' && !s.actioned) ?? []

          return (
                <div className="space-y-6">
                      <StatsBar
                                hotCount={hotSignals.length}
                                warmCount={warmSignals.length}
                                totalSignals={signals?.length ?? 0}
                                digest={digest}
                              />
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              <div className="lg:col-span-2">
                                        <SignalFeed signals={signals ?? []} />
                              </div>div>
                              <div>
                                        <DailyDigest digest={digest} />
                              </div>div>
                      </div>div>
                </div>div>
              )
}</div>
