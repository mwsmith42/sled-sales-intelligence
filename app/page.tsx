import { createClient } from '@/lib/supabase/server'
import StatsBar from '@/components/StatsBar'
import SignalFeed from '@/components/SignalFeed'
import DailyDigest from '@/components/DailyDigest'

export const revalidate = 60

async function getSignals() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('signals')
      .select('*, entities(name, entity_type)')
      .order('created_at', { ascending: false })
      .limit(50)
    if (error) throw error
    return data || []
  } catch (e) {
    return []
  }
}

async function getStats() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('signals')
      .select('signal_strength')
    if (error) throw error
    const signals = data || []
    return {
      hot: signals.filter((s) => s.signal_strength === 'hot').length,
      warm: signals.filter((s) => s.signal_strength === 'warm').length,
      watch: signals.filter((s) => s.signal_strength === 'watch').length,
      total: signals.length,
    }
  } catch (e) {
    return { hot: 0, warm: 0, watch: 0, total: 0 }
  }
}

export default async function Home() {
  const [signals, stats] = await Promise.all([getSignals(), getStats()])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Intelligence Dashboard</h2>
        <p className="text-gray-500 mt-1">Daily SLED buying signals for data, AI &amp; technology</p>
      </div>
      <StatsBar stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SignalFeed signals={signals} />
        </div>
        <div className="lg:col-span-1">
          <DailyDigest signals={signals} />
        </div>
      </div>
    </div>
  )
}
