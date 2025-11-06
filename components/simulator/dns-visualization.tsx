"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface DnsResult {
  domain: string
  queryType: string
  ip: string
  cacheHit: boolean
  totalTime: number
  steps: Array<{
    stage: string
    server: string
    result: string
    time: number
  }>
}

interface DnsVisualizationProps {
  result: DnsResult
}

export default function DnsVisualization({ result }: DnsVisualizationProps) {
  const [animatedSteps, setAnimatedSteps] = useState(0)

  useEffect(() => {
    setAnimatedSteps(0)
    let stepIndex = 0

    const interval = setInterval(() => {
      stepIndex++
      if (stepIndex <= result.steps.length) {
        setAnimatedSteps(stepIndex)
      } else {
        clearInterval(interval)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [result.steps.length])

  const stepNumbers = ["1", "2", "3", "4"]

  return (
    <Card className="glass-effect-dark p-8 space-y-8 bg-background">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-gradient-to-br from-cyan-500/15 to-green-500/15 rounded-lg border border-cyan-500/40 hover:border-cyan-500/70 transition-all duration-300 shadow-lg shadow-cyan-500/10 card-interactive">
          <p className="text-muted text-xs font-bold uppercase tracking-wider mb-2">Domain</p>
          <p className="text-cyan-300 font-mono font-black text-lg break-all">{result.domain}</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-green-500/15 to-cyan-500/15 rounded-lg border border-green-500/40 hover:border-green-500/70 transition-all duration-300 shadow-lg shadow-green-500/10 card-interactive">
          <p className="text-muted text-xs font-bold uppercase tracking-wider mb-2">Query Type</p>
          <p className="text-green-300 font-mono font-black text-lg">{result.queryType}</p>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-xs font-black gradient-text uppercase tracking-widest">DNS Resolution Path</h3>
        <div className="space-y-3">
          {result.steps.map((step, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ${
                index < animatedSteps ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center pt-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                      index < animatedSteps
                        ? "bg-gradient-to-r from-cyan-400 to-green-400 text-slate-950 shadow-lg shadow-cyan-500/60"
                        : "bg-slate-700/30 text-slate-500"
                    }`}
                  >
                    {stepNumbers[index] || index + 1}
                  </div>
                  {index < result.steps.length - 1 && (
                    <div
                      className={`w-0.5 h-14 transition-all duration-500 ${
                        index < animatedSteps ? "bg-gradient-to-b from-cyan-500/60 to-green-500/60" : "bg-slate-600/15"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <div className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 shadow-md card-interactive">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-cyan-300 text-sm">{step.stage}</span>
                      <span className="text-xs font-mono text-green-400 bg-slate-900/70 px-2.5 py-1 rounded-md font-semibold border border-green-500/30">
                        {step.time}ms
                      </span>
                    </div>
                    <p className="text-sm text-muted font-mono mb-2">{step.server}</p>
                    <p className="text-xs text-cyan-300/90 font-semibold">{step.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-cyan-500/15 via-green-500/15 to-cyan-500/15 rounded-lg border border-cyan-500/60 space-y-3 shadow-lg shadow-cyan-500/20 card-interactive">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-green-400 animate-bounce">✓</span>
          <p className="text-sm font-bold text-green-400 uppercase tracking-wider">Resolution Complete</p>
        </div>
        <p className="text-3xl font-black text-cyan-300 font-mono tracking-tight">{result.ip}</p>
        <div className="flex gap-4 text-xs font-semibold text-muted flex-wrap">
          <span
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
              result.cacheHit
                ? "bg-green-500/20 text-green-400 border border-green-500/40"
                : "bg-orange-500/20 text-orange-400 border border-orange-500/40"
            }`}
          >
            {result.cacheHit ? "✓ Cache Hit" : "✗ Cache Miss"}
          </span>
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            {result.totalTime}ms total
          </span>
        </div>
      </div>
    </Card>
  )
}
