"use client"

import { X, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-dns-darker border border-dns-neon/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dns-neon/20 bg-gradient-to-r from-dns-dark/50 to-dns-darker">
            <h2 className="text-2xl font-bold text-dns-neon flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              How to Use the DNS Simulator
            </h2>
            <button onClick={onClose} className="text-dns-gray hover:text-dns-neon transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Step-by-step guide */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-dns-neon">Step-by-Step Guide</h3>

              {[
                {
                  step: 1,
                  title: "Enter Domain Name",
                  description:
                    'Type any valid domain name (e.g., google.com, github.com) in the "Domain Name" input field.',
                },
                {
                  step: 2,
                  title: "Select Query Type",
                  description:
                    "Choose the DNS record type: A (IPv4), AAAA (IPv6), CNAME (Canonical Name), or MX (Mail Exchange).",
                },
                {
                  step: 3,
                  title: "Configure Cache",
                  description:
                    "Add domains to the local DNS cache to simulate cached entries. These will result in faster lookups.",
                },
                {
                  step: 4,
                  title: "Click Resolve",
                  description:
                    'Press the "Resolve Domain" button to start the simulation and see the complete DNS resolution process.',
                },
                {
                  step: 5,
                  title: "Review Results",
                  description:
                    "View the step-by-step resolution path, final IP address, total time, and cache hit/miss statistics.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-dns-neon to-dns-cyan rounded-full flex items-center justify-center font-bold text-dns-dark">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-dns-gray">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Understanding Results */}
            <div className="space-y-4 p-4 bg-dns-dark rounded-lg border border-dns-neon/20">
              <h3 className="text-lg font-semibold text-dns-neon">Understanding the Results</h3>

              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-dns-cyan mb-1">Resolution Path</p>
                  <p className="text-sm text-dns-gray">
                    Shows the complete hierarchy from local cache → recursive resolver → root → TLD → authoritative
                    server
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-dns-cyan mb-1">Total Time</p>
                  <p className="text-sm text-dns-gray">
                    Cumulative time for all DNS lookups. Cache hits are much faster than full resolution.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-dns-cyan mb-1">Cache Statistics</p>
                  <p className="text-sm text-dns-gray">
                    Track how many queries hit the cache vs. required full resolution. Higher hit rates = better
                    performance.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-dns-cyan mb-1">Query Types</p>
                  <p className="text-sm text-dns-gray">
                    <strong>A:</strong> Maps domain to IPv4 | <strong>AAAA:</strong> Maps domain to IPv6 |{" "}
                    <strong>CNAME:</strong> Domain alias | <strong>MX:</strong> Mail server
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="space-y-3 p-4 bg-dns-cyan/10 rounded-lg border border-dns-cyan/30">
              <h3 className="font-semibold text-dns-cyan">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-dns-gray">
                <li>• Pre-populate cache entries to see how DNS caching improves lookup speed</li>
                <li>• Try different query types (A, AAAA, MX) for the same domain</li>
                <li>• Use the "Developed By" section to learn about the project creators</li>
                <li>• Check the "Learn" section for detailed DNS protocol information</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-dns-neon/20 p-4 bg-dns-dark/50 flex justify-end">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-dns-neon to-dns-cyan text-dns-dark hover:shadow-[0_0_20px_rgba(0,255,200,0.4)]"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
