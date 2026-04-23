'use client'

import { useState } from 'react'

interface Signal {
    id: string
    signal_strength: 'hot' | 'warm' | 'watch'
    signal_type: string
    headline: string
    summary: string
    source_url: string
    meeting_date: string
    actioned: boolean
    created_at: string
    target_entities: {
      entity_name: string
      entity_type: string
    }
}

const strengthConfig = {
    hot: { label: 'HOT', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    warm: { label: 'WARM', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' },
    watch: { label: 'WATCH', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
}

export default function SignalFeed({ signals }: { signals: Signal[] }) {
    const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'watch'>('all')
    const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = filter === 'all' ? signals : signals.filter(s => s.signal_strength === filter)

  return (
        <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Signal Feed</h2>h2>
                      <div className="flex gap-2">
                        {(['all', 'hot', 'warm', 'watch'] as const).map(f => (
                      <button
                                      key={f}
                                      onClick={() => setFilter(f)}
                                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                                                        filter === f
                                                          ? 'bg-blue-600 text-white'
                                                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                      }`}
                                    >
                        {f}
                      </button>button>
                    ))}
                      </div>div>
              </div>div>
              <div className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                                <div className="text-4xl mb-2">radar</div>div>
                                <p>No signals yet. The agent will populate this once it runs.</p>p>
                    </div>div>
                  ) : (
                    filtered.map(signal => {
                                  const cfg = strengthConfig[signal.signal_strength]
                                                return (
                                                                <div key={signal.id} className={`p-4 hover:bg-gray-50 transition-colors ${signal.actioned ? 'opacity-50' : ''}`}>
                                                                                <div className="flex items-start gap-3">
                                                                                                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${cfg.dot}`} />
                                                                                                  <div className="flex-1 min-w-0">
                                                                                                                      <div className="flex items-center gap-2 mb-1">
                                                                                                                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                                                                                                                                              {cfg.label}
                                                                                                                                              </span>span>
                                                                                                                                            <span className="text-xs text-gray-500 truncate">
                                                                                                                                              {signal.target_entities?.entity_name}
                                                                                                                                              </span>span>
                                                                                                                                            <span className="text-xs text-gray-400 ml-auto flex-shrink-0">
                                                                                                                                              {signal.meeting_date ? new Date(signal.meeting_date).toLocaleDateString() : ''}
                                                                                                                                              </span>span>
                                                                                                                        </div>div>
                                                                                                                      <p className="text-sm font-medium text-gray-900 mb-1">{signal.headline}</p>p>
                                                                                                    {expanded === signal.id && (
                                                                                        <p className="text-sm text-gray-600 mb-2">{signal.summary}</p>p>
                                                                                                                      )}
                                                                                                                      <div className="flex items-center gap-3">
                                                                                                                                            <button
                                                                                                                                                                      onClick={() => setExpanded(expanded === signal.id ? null : signal.id)}
                                                                                                                                                                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                                                                                                                                                    >
                                                                                                                                              {expanded === signal.id ? 'Show less' : 'Dig deeper'}
                                                                                                                                              </button>button>
                                                                                                                        {signal.source_url && (
                                                                                          <a
                                                                                                                      href={signal.source_url}
                                                                                                                      target="_blank"
                                                                                                                      rel="noopener noreferrer"
                                                                                                                      className="text-xs text-gray-500 hover:text-gray-700"
                                                                                                                    >
                                                                                                                    Source
                                                                                            </a>a>
                                                                                                                                            )}
                                                                                                                        </div>div>
                                                                                                    </div>div>
                                                                                </div>div>
                                                                </div>div>
                                                              )
                                                  })
                  )}
              </div>div>
        </div>div>
      )
}</div>
