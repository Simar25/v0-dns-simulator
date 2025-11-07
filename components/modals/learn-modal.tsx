"use client"

import { useEffect, useState } from "react"
import { X, BookOpen, Video, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LearnModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LearnModal({ isOpen, onClose }: LearnModalProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

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
              <BookOpen className="w-6 h-6" />
              Learning Materials
            </h2>
            <button onClick={onClose} className="text-dns-gray hover:text-dns-neon transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-dns-neon flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recommended Textbooks & References
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-dns-dark rounded-lg border border-dns-neon/20 hover:border-dns-neon/50 transition-all cursor-pointer">
                  <p className="font-semibold text-white mb-1">James F. Kurose and Keith W. Ross</p>
                  <p className="text-sm text-dns-gray italic">
                    "Computer Networking: A Top-Down Approach" - 6th Edition, 2017, Pearson Education
                  </p>
                </div>
                <div className="p-4 bg-dns-dark rounded-lg border border-dns-neon/20 hover:border-dns-neon/50 transition-all cursor-pointer">
                  <p className="font-semibold text-white mb-1">William Stallings</p>
                  <p className="text-sm text-dns-gray italic">
                    "Data and Computer Communication" - 10th Edition, 2017, Pearson, United Kingdom
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-dns-neon">Short Notes on DNS</h3>
              <div className="p-4 bg-dns-dark/50 rounded-lg border border-dns-neon/20 space-y-3">
                <div>
                  <p className="text-cyan-300 font-semibold mb-1">What is DNS?</p>
                  <p className="text-sm text-dns-gray">
                    Domain Name System (DNS) is a hierarchical distributed naming system that translates human-readable
                    domain names into IP addresses needed for locating and identifying computer services and devices on
                    the internet.
                  </p>
                </div>
                <div>
                  <p className="text-cyan-300 font-semibold mb-1">How DNS Works</p>
                  <p className="text-sm text-dns-gray">
                    DNS resolution follows a hierarchical process: Local Cache → Recursive Resolver → Root Nameserver →
                    TLD Nameserver → Authoritative Nameserver. Each step returns the address of the next server until
                    the final IP address is resolved.
                  </p>
                </div>
                <div>
                  <p className="text-cyan-300 font-semibold mb-1">Query Types</p>
                  <p className="text-sm text-dns-gray">
                    A (IPv4), AAAA (IPv6), CNAME (Canonical Name), MX (Mail Exchange), NS (Nameserver), TXT (Text
                    records), SOA (Start of Authority)
                  </p>
                </div>
                <div>
                  <p className="text-cyan-300 font-semibold mb-1">Caching & TTL</p>
                  <p className="text-sm text-dns-gray">
                    DNS records are cached at multiple levels with a Time-To-Live (TTL) value specifying how long the
                    record remains valid. Higher TTL values reduce queries but cache misses take longer to propagate.
                  </p>
                </div>
              </div>
            </section>

            {/* Video Resources */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-dns-neon flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Resources
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-dns-dark rounded-lg border border-dns-cyan/20 hover:border-dns-cyan/50 transition-all cursor-pointer">
                  <p className="font-semibold text-white mb-1">How DNS Works - Animated Explainer</p>
                  <p className="text-sm text-dns-gray">Complete walkthrough of DNS resolution process</p>
                </div>
                <div className="p-4 bg-dns-dark rounded-lg border border-dns-cyan/20 hover:border-dns-cyan/50 transition-all cursor-pointer">
                  <p className="font-semibold text-white mb-1">DNS Hierarchy Explained</p>
                  <p className="text-sm text-dns-gray">Root, TLD, and authoritative nameservers</p>
                </div>
              </div>
            </section>

            {/* How We Built This */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-dns-neon flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                How We Built This Project
              </h3>
              <div className="p-4 bg-dns-dark/50 rounded-lg border border-dns-neon/20 space-y-3">
                <p className="text-white">
                  This DNS Simulator was built using modern web technologies to create an interactive learning platform:
                </p>
                <ul className="list-disc list-inside space-y-2 text-dns-gray text-sm">
                  <li>Frontend: React with Next.js App Router</li>
                  <li>Styling: Tailwind CSS with custom design tokens</li>
                  <li>Animations: CSS animations and React state management</li>
                  <li>Visualization: SVG and HTML5 Canvas for network diagrams</li>
                  <li>Data Processing: Simulated DNS resolution logic in JavaScript</li>
                </ul>
              </div>
            </section>

            {/* References */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-dns-neon">Additional References</h3>
              <div className="space-y-2 text-sm text-dns-gray">
                <p>• IETF RFC 1035 - Domain Names and Implementation</p>
                <p>• IETF RFC 3597 - Handling of Unknown DNS RR Types</p>
                <p>• ICANN DNS Specifications</p>
                <p>• The DNS Protocol - O'Reilly Learning Guides</p>
              </div>
            </section>
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
