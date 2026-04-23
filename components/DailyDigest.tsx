interface Digest {
    id: string
        digest_date: string
        hot_count: number
        warm_count: number
        watch_count: number
        total_entities_scanned: number
        digest_summary: string
        created_at: string
      }

export default function DailyDigest({ digest }: { digest: Digest | null }) {
  return (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Daily Digest</h2>
    {digest && (
              <p className="text-xs text-gray-500 mt-1">
    {new Date(digest.digest_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
            )}
      </div>
          <div className="p-5">
    {!digest ? (
              <div className="text-center py-8">
                <div className="text-gray-300 text-5xl mb-3">newspaper</div>
                <p className="text-gray-400 text-sm">No digest yet.</p>
            <p className="text-gray-400 text-xs mt-1">The agent will generate one after its first run.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">{digest.hot_count}</div>
                    <div className="text-xs text-red-600 mt-1">Hot</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-600">{digest.warm_count}</div>
                    <div className="text-xs text-yellow-600 mt-1">Warm</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{digest.watch_count}</div>
                    <div className="text-xs text-blue-600 mt-1">Watch</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center">
    {digest.total_entities_scanned} entities scanned
            </div>
{digest.digest_summary && (
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{digest.digest_summary}</p>
                  </div>
                )}
              </div>
            )}
      </div>
        </div>
      )
    }
