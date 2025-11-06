"use client"
import { Monitor, Timer, Wifi } from "lucide-react"

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

interface ResolutionResultsProps {
  result: DnsResult
}

export default function ResolutionResults({ result }: ResolutionResultsProps) {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* IP Address Card */}
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 rounded-2xl border-2 border-cyan-500 p-8 shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400/40 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <Monitor className="w-7 h-7 text-cyan-300" />
              </div>
              <p className="text-sm font-bold text-cyan-100 uppercase tracking-widest">IP Address</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-100 font-mono break-all">{result.ip}</p>
            </div>
          </div>
        </div>

        {/* Total Time Card */}
        <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 rounded-2xl border-2 border-green-500 p-8 shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400/40 to-green-500/20 rounded-xl flex items-center justify-center">
                <Timer className="w-7 h-7 text-green-300" />
              </div>
              <p className="text-sm font-bold text-green-100 uppercase tracking-widest">Total Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-100 font-mono">{result.totalTime}ms</p>
            </div>
          </div>
        </div>

        {/* Cache Status Card */}
        <div
          className="rounded-2xl border-2 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
          style={{
            background: result.cacheHit
              ? "linear-gradient(to bottom right, rgba(52, 211, 153, 0.1), rgba(16, 185, 129, 0.05))"
              : "linear-gradient(to bottom right, rgba(248, 113, 113, 0.1), rgba(239, 68, 68, 0.05))",
            borderColor: result.cacheHit ? "#10b981" : "#ef4444",
            boxShadow: result.cacheHit
              ? "0 20px 25px -5px rgba(16, 185, 129, 0.3)"
              : "0 20px 25px -5px rgba(239, 68, 68, 0.3)",
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: result.cacheHit
                    ? "linear-gradient(to bottom right, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.2))"
                    : "linear-gradient(to bottom right, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))",
                }}
              >
                <Wifi className="w-7 h-7" style={{ color: result.cacheHit ? "#86efac" : "#fca5a5" }} />
              </div>
              <p
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: result.cacheHit ? "#86efac" : "#fca5a5" }}
              >
                Cache Status
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono" style={{ color: result.cacheHit ? "#dcfce7" : "#fee2e2" }}>
                {result.cacheHit ? "Cache Hit" : "Cache Miss"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
