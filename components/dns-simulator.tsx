"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import DnsInput from "./simulator/dns-input"
import DnsVisualization from "./simulator/dns-visualization"
import PacketVisualization from "./simulator/packet-visualization"
import ResolutionResults from "./simulator/resolution-results"
import DownloadSection from "./simulator/download-section"

interface ResolutionStep {
  stage: string
  server: string
  result: string
  time: number
}

interface DnsResult {
  domain: string
  queryType: string
  ip: string
  cacheHit: boolean
  totalTime: number
  steps: ResolutionStep[]
}

export default function DnsSimulator() {
  const [result, setResult] = useState<DnsResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({ hits: 0, misses: 0 })

  const handleResolve = async (domain: string, queryType: string, cacheEntries: string[]) => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const steps: ResolutionStep[] = [
      { stage: "Local Cache", server: "Local System", result: "Checking...", time: 10 },
      { stage: "Recursive Resolver", server: "8.8.8.8", result: "Querying...", time: 45 },
      { stage: "Root Nameserver", server: "a.root-servers.net", result: "Referral...", time: 32 },
      { stage: "TLD Nameserver", server: "tld-ns.example.com", result: "Referral...", time: 28 },
      { stage: "Authoritative Server", server: "auth-ns.example.com", result: "Answer found", time: 25 },
    ]

    const cacheHit = cacheEntries.includes(domain)
    const totalTime = cacheHit ? 10 : steps.reduce((sum, s) => sum + s.time, 0)

    const resultData: DnsResult = {
      domain,
      queryType,
      ip: `203.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      cacheHit,
      totalTime,
      steps,
    }

    setResult(resultData)
    setStats((prev) => ({
      hits: prev.hits + (cacheHit ? 1 : 0),
      misses: prev.misses + (cacheHit ? 0 : 1),
    }))

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text">DNS Resolution Simulator</h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed text-teal-300">
            Watch how domain names are resolved step-by-step through the DNS hierarchy. Track cache performance and
            visualize packet flows in real-time.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Section - Left Column */}
          <div className="lg:col-span-1 h-fit">
            <DnsInput onResolve={handleResolve} isLoading={isLoading} />
          </div>

          {/* Visualization Section - Right Columns */}
          <div className="lg:col-span-2 space-y-6">
            <PacketVisualization
              isActive={result ? true : false}
              domain={result?.domain || "Enter a domain..."}
              steps={result?.steps || []}
            />

            {/* Resolution Path Visualization */}
            {result ? (
              <DnsVisualization result={result} />
            ) : (
              <Card className="glass-effect-dark h-full flex items-center justify-center min-h-80">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-indigo-300 font-semibold text-lg">Ready to Simulate</p>
                    <p className="text-slate-400 text-sm mt-1">Enter a domain name to begin</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Results and Stats - Full Width */}
        {result && (
          <div className="space-y-6">
            <ResolutionResults result={result} />

            {/* Statistics Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-3 bg-slate-900 border-2 border-indigo-400 p-8 space-y-6 shadow-xl shadow-indigo-400/40">
                <div>
                  <h3 className="text-lg font-bold gradient-text">Cache Statistics</h3>
                  <p className="text-xs mt-1 text-emerald-500">Performance metrics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Cache Hits */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-cyan-200">Cache Hits</span>
                      <span className="text-2xl font-bold text-cyan-200">{stats.hits}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden border border-cyan-500/40">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/60 transition-all duration-500"
                        style={{
                          width: `${stats.hits > 0 ? Math.min(stats.hits * 20, 100) : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Cache Misses */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-orange-200">Cache Misses</span>
                      <span className="text-2xl font-bold text-orange-200">{stats.misses}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden border border-orange-500/40">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-400 shadow-lg shadow-orange-500/60 transition-all duration-500"
                        style={{
                          width: `${stats.misses > 0 ? Math.min(stats.misses * 20, 100) : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Hit Rate */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-200">Hit Rate</span>
                      <span className="text-2xl font-bold text-green-200">
                        {stats.hits + stats.misses > 0
                          ? Math.round((stats.hits / (stats.hits + stats.misses)) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden border border-green-500/40">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-500/60 transition-all duration-500"
                        style={{
                          width: `${stats.hits + stats.misses > 0 ? Math.round((stats.hits / (stats.hits + stats.misses)) * 100) : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Download Section */}
            <DownloadSection result={result} stats={stats} />
          </div>
        )}
      </div>
    </div>
  )
}
