"use client"

import { useEffect, useState } from "react"
import AnimatedPacket from "@/components/animated-packet"
import { Card } from "@/components/ui/card"

interface PacketVisualizationProps {
  isActive: boolean
  domain: string
  steps: Array<{ stage: string; server: string }>
}

export default function PacketVisualization({ isActive, domain, steps }: PacketVisualizationProps) {
  const [animationRound, setAnimationRound] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState(0)

  useEffect(() => {
    if (!isActive) return

    setAnimationRound(0)
    setVisibleSteps(0)

    // Cycle through animation rounds
    const interval = setInterval(() => {
      setAnimationRound((prev) => (prev + 1) % 4)
    }, 8000)

    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    if (!isActive) return

    // Animate steps one by one
    let stepIndex = 0
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setVisibleSteps(stepIndex + 1)
        stepIndex++
      } else {
        clearInterval(stepInterval)
      }
    }, 1000)

    return () => clearInterval(stepInterval)
  }, [isActive, steps.length])

  // Generate dynamic server positions based on number of steps
  const getServerPositions = () => {
    if (steps.length === 0) return []
    const positions = []
    const spacing = 80 / (steps.length + 1)

    for (let i = 0; i < steps.length; i++) {
      positions.push({
        x: 10 + spacing * (i + 1),
        stage: steps[i].stage,
        server: steps[i].server,
      })
    }
    return positions
  }

  const serverPositions = getServerPositions()

  return (
    <Card className="glass-effect-dark p-8 space-y-6 bg-background">
      <div className="space-y-2">
        <h3 className="text-lg font-bold gradient-text">DNS Packet Flow Simulation</h3>
        <p className="text-sm text-emerald-200">Domain: {domain || "Enter a domain..."}</p>
      </div>

      <div className="relative w-full bg-gradient-to-br from-slate-900/60 to-slate-950/60 rounded-xl border border-slate-700/50 overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Main visualization area */}
        <div className="relative h-96 p-8 flex flex-col justify-between">
          {/* Top section: Client */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 animate-pulse" />
                {/* Node */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-2 border-white/40 animate-node-glow">
                  <span className="text-xs font-bold text-white text-center">Client</span>
                </div>
              </div>
              <p className="text-xs text-muted mt-3 font-mono">Your Device</p>
            </div>

            {/* Connection indicator */}
            <div className="flex-1 mx-4 h-1 bg-gradient-to-r from-indigo-500/50 via-cyan-500/50 to-transparent rounded-full" />
          </div>

          {/* Middle section: Resolution path */}
          <div className="space-y-4 py-4 border-t border-b border-slate-700/30">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Resolution Hops</p>
            <div className="space-y-2">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`transform transition-all duration-500 ${
                    idx < visibleSteps ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx < visibleSteps
                          ? "bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/50"
                          : "bg-slate-600/30"
                      }`}
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-cyan-400">{step.stage}</span>
                      <span className="text-xs text-muted font-mono">{step.server}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section: Server */}
          <div className="flex items-center justify-end">
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 animate-pulse" />
                {/* Node */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-white/40 animate-node-glow">
                  <span className="text-xs font-bold text-white text-center">
                    Auth
                    <br />
                    Server
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted mt-3 font-mono">Authoritative</p>
            </div>

            {/* Connection indicator */}
            <div className="flex-1 mx-4 h-1 bg-gradient-to-l from-cyan-500/50 via-purple-500/50 to-transparent rounded-full" />
          </div>

          {/* Animated packets - QUERY FLOW */}
          {isActive &&
            [0, 1].map((i) => (
              <AnimatedPacket
                key={`query-${animationRound}-${i}`}
                delay={animationRound * 8000 + i * 800}
                startX={5}
                startY={15}
                endX={95}
                endY={80}
                label={i === 0 ? "Query" : "Query..."}
                index={0}
              />
            ))}

          {/* Animated packets - RESPONSE FLOW */}
          {isActive &&
            [0, 1].map((i) => (
              <AnimatedPacket
                key={`response-${animationRound}-${i}`}
                delay={animationRound * 8000 + 1600 + i * 800}
                startX={95}
                startY={80}
                endX={5}
                endY={15}
                label={i === 0 ? "Response" : "Response..."}
                index={1}
              />
            ))}
        </div>
      </div>

      {isActive && (
        <div className="flex items-center gap-2 text-sm font-semibold">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse shadow-lg shadow-green-500/50" />
          <span className="gradient-text-accent">DNS resolution in progress...</span>
        </div>
      )}
    </Card>
  )
}
