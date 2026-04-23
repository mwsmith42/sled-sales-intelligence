'use client'

import { useState } from 'react'

interface Signal {
  id: string
  entity_id: string
  signal_strength: string
  summary: string
  source_url: string
  meeting_date: string
  created_at: string
  entities?: { name: string; entity_type: string }
}

const STRENGTH_COLORS: Record<string, string> = {
  hot: 'bg-red-100 text-red-700 border-red-200',
  warm: 'bg-orange-100 text-orange-700 border-orange-200',
  watch: 'bg-blue-100 text-blue-700 border-blue-200',
}

const STRENGTH_LABELS: Record<string, string> = {
  hot: '🔥 HOT',
  warm: '📡 WARM',
  watch: '👁 WATCH',
}

export default function SignalFeed({ signals }: { signals: Signal[] }) {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? signals : signals.filter((s) => s.signal_strength === filter)

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Signal Feed</h3>
        <div className="flex space-x-2">
          {['all', 'hot', 'warm', 'watch'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">
            <p className="text-4xl mb-2">📭</p>
            <p>No signals yet. The research agent will populate this daily.</p>
          </div>
        ) : (
          filtered.map((signal) => (
            <div key={signal.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${
                        STRENGTH_COLORS[signal.signal_strength] || STRENGTH_COLORS.watch
                      }`}
                    >
                      {STRENGTH_LABELS[signal.signal_strength] || signal.signal_strength}
                    </span>
                    <span className="text-xs text-gray-400">
                      {signal.entities?.name || 'Unknown Entity'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{signal.summary}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400">
                      {signal.meeting_date
                        ? new Date(signal.meeting_date).toLocaleDateString()
                        : 'Date unknown'}
                    </span>
                    {signal.source_url && (
                      <a
                        href={signal.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        Dig deeper →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
