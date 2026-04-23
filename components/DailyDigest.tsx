interface Signal {
  id: string
  signal_strength: string
  summary: string
  source_url: string
  meeting_date: string
  entities?: { name: string; entity_type: string }
}

export default function DailyDigest({ signals }: { signals: Signal[] }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hot = signals.filter((s) => s.signal_strength === 'hot')
  const warm = signals.filter((s) => s.signal_strength === 'warm')

  return (
    <div className="bg-white rounded-xl border border-gray-200 h-fit">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Daily Digest</h3>
        <p className="text-xs text-gray-400 mt-0.5">{today}</p>
      </div>
      <div className="px-6 py-4 space-y-4">
        {signals.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">🌅</p>
            <p className="text-sm">Your morning briefing will appear here after the agent runs.</p>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-900 mb-1">Summary</p>
              <p className="text-sm text-blue-700">
                {signals.length} signal{signals.length !== 1 ? 's' : ''} detected today.{' '}
                {hot.length > 0 && (
                  <span className="font-semibold">{hot.length} hot opportunity{hot.length !== 1 ? 's' : ''} need attention.</span>
                )}
              </p>
            </div>
            {hot.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
                  🔥 Immediate Action
                </p>
                <div className="space-y-2">
                  {hot.slice(0, 3).map((s) => (
                    <div key={s.id} className="text-sm">
                      <p className="font-medium text-gray-800 text-xs">{s.entities?.name}</p>
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{s.summary}</p>
                      {s.source_url && (
                        <a
                          href={s.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View source →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {warm.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
                  📡 Worth Exploring
                </p>
                <div className="space-y-2">
                  {warm.slice(0, 3).map((s) => (
                    <div key={s.id} className="text-sm">
                      <p className="font-medium text-gray-800 text-xs">{s.entities?.name}</p>
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{s.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <p className="text-xs text-gray-400 text-center">Next refresh: 6:00 AM tomorrow</p>
      </div>
    </div>
  )
}
