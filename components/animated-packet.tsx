"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface AnimatedPacketProps {
  delay: number
  startX: number
  startY: number
  endX: number
  endY: number
  label: string
  index: number
}

export default function AnimatedPacket({ delay, startX, startY, endX, endY, label, index }: AnimatedPacketProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const getPacketColor = () => {
    const colors = [
      { gradient: "from-indigo-400 to-purple-400", glow: "shadow-indigo-500" },
      { gradient: "from-cyan-400 to-blue-400", glow: "shadow-cyan-500" },
      { gradient: "from-pink-400 to-purple-400", glow: "shadow-pink-500" },
      { gradient: "from-emerald-400 to-cyan-400", glow: "shadow-emerald-500" },
    ]
    return colors[index % colors.length]
  }

  const color = getPacketColor()
  const duration = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / 50 + 1

  return (
    <>
      {isVisible && (
        <div
          className="absolute"
          style={
            {
              left: `${startX}%`,
              top: `${startY}%`,
              "--tx": `${endX - startX}%`,
              "--ty": `${endY - startY}%`,
            } as React.CSSProperties & { "--tx": string; "--ty": string }
          }
        >
          <div
            className={`relative w-6 h-6 rounded-lg bg-gradient-to-r ${color.gradient} animate-packet-pulse`}
            style={{
              animation: `packet-travel ${duration}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
              boxShadow: `0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px ${index % 2 === 0 ? "rgba(99, 102, 241, 0.4)" : "rgba(6, 182, 212, 0.4)"}`,
            }}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-1 bg-white/30 rounded-md blur-sm" />

            {/* Data indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>

            {/* Trailing glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-current to-transparent rounded-lg opacity-40 blur-lg -z-10" />
          </div>

          {/* Enhanced label with better styling */}
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-bold text-white bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700/50 shadow-lg">
              {label}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
