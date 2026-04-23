import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SLED Sales Intelligence',
    description: 'AI-powered SLED sales intelligence dashboard',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
          <html lang="en">
                <body className={inter.className}>
                        <div className="min-h-screen bg-gray-50">
                                  <nav className="bg-white border-b border-gray-200 px-6 py-4">
                                              <div className="max-w-7xl mx-auto flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                                                                              <span className="text-white text-sm font-bold">SI</span>span>
                                                                            </div>div>
                                                                            <div>
                                                                                              <h1 className="text-lg font-semibold text-gray-900">SLED Intelligence</h1>h1>
                                                                                              <p className="text-xs text-gray-500">CA State Agencies</p>p>
                                                                            </div>div>
                                                            </div>div>
                                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                                            <span>237 entities monitored</span>span>
                                                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>div>
                                                                            <span className="text-green-600 font-medium">Agent Active</span>span>
                                                            </div>div>
                                              </div>div>
                                  </nav>nav>
                                  <main className="max-w-7xl mx-auto px-6 py-8">
                                    {children}
                                  </main>main>
                        </div>div>
                </body>body>
          </html>html>
        )
}</html>
