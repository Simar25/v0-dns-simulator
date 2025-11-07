"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface DevelopedByModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DevelopedByModal({ isOpen, onClose }: DevelopedByModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const developers = [
    {
      name: "Simarjot Singh Anand",
      regNo: "24BCE5218",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-06%20at%2015.35.24_a9a030ae-En3cc6gMlPk0SqpfF57c9vK1WbIQG4.jpg",
    },
    {
      name: "Shashank Poddar",
      regNo: "24BCE5241",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-06%20at%2015.36.10_67ee7591-q2LBjmjmyQsrbenidWAZvuRo0p1txd.jpg",
    },
  ]

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-cyan-500/50">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-cyan-400 bg-gradient-to-r from-slate-800 to-slate-900 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-cyan-300">Developed By</h2>
            <button onClick={onClose} className="text-cyan-300 hover:text-cyan-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Developer Team */}
            <div className="space-y-4">
              <p className="text-xs text-cyan-300 font-mono uppercase tracking-widest font-bold">Developer Team</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {developers.map((dev, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl border-2 border-cyan-400 hover:border-cyan-300 transition-all space-y-4 text-center shadow-lg shadow-cyan-400/20"
                  >
                    <div className="flex justify-center">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-cyan-400 shadow-lg shadow-cyan-400/60">
                        <img
                          src={dev.image || "/placeholder.svg"}
                          alt={dev.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-cyan-200">{dev.name}</h3>
                      <p className="text-sm text-green-300 font-mono font-bold">{dev.regNo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guided By */}
            <div className="pt-8 border-t-2 border-cyan-400 space-y-4">
              <p className="text-xs text-green-300 font-mono uppercase tracking-widest font-bold">Guided By</p>
              <div className="p-6 bg-gradient-to-r from-green-500/15 to-cyan-500/15 rounded-xl border-2 border-green-400 space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-3 border-green-400 shadow-lg shadow-green-400/60">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-05%20at%2014.48.40_1c028aab-K0yhmJ8ooVOMbdv25KPrkY021b098s.jpg"
                      alt="Dr. A. Swaminathan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-300">Dr. A. Swaminathan</p>
                    <p className="text-sm text-green-200 font-mono">Guide & Mentor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-cyan-400 p-4 bg-slate-800 flex justify-end backdrop-blur-sm">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 hover:shadow-lg hover:shadow-cyan-400/60 font-bold transition-all duration-300 text-base"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
