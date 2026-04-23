interface Stats {
  hot: number
  warm: number
  watch: number
  total: number
}

export default function StatsBar({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Hot Signals</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{stats.hot}</p>
          </div>
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 text-lg">🔥</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Warm Signals</p>
            <p className="text-2xl font-bold text-orange-500 mt-1">{stats.warm}</p>
          </div>
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-orange-500 text-lg">📡</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Watch</p>
            <p className="text-2xl font-bold text-blue-500 mt-1">{stats.watch}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-500 text-lg">👁</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Entities</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">237</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-lg">🏛</span>
          </div>
        </div>
      </div>
    </div>
  )
}
