"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

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

interface Stats {
  hits: number
  misses: number
}

interface DownloadSectionProps {
  result: DnsResult
  stats: Stats
}

export default function DownloadSection({ result, stats }: DownloadSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const generateReport = () => {
    const hitRate = stats.hits + stats.misses > 0 ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(2) : "0"

    const report = `
╔════════════════════════════════════════════════════════════════════╗
║                    DNS RESOLUTION REPORT                          ║
╚════════════════════════════════════════════════════════════════════╝

QUERY INFORMATION
─────────────────────────────────────────────────────────────────────
Domain Name              : ${result.domain}
Query Type               : ${result.queryType}
Resolved IP Address      : ${result.ip}
Cache Status             : ${result.cacheHit ? "HIT" : "MISS"}
Total Resolution Time    : ${result.totalTime}ms

RESOLUTION STEPS
─────────────────────────────────────────────────────────────────────
${result.steps
  .map(
    (step, index) => `
Step ${index + 1}: ${step.stage}
  Server  : ${step.server}
  Result  : ${step.result}
  Time    : ${step.time}ms
`,
  )
  .join("")}

CACHE STATISTICS
─────────────────────────────────────────────────────────────────────
Total Cache Hits         : ${stats.hits}
Total Cache Misses       : ${stats.misses}
Cache Hit Rate           : ${hitRate}%

HOW DNS RESOLUTION WORKS
─────────────────────────────────────────────────────────────────────
1. LOCAL CACHE: The client first checks its local DNS cache to see if
   the domain has been recently resolved.

2. RECURSIVE RESOLVER: If not cached, the query is sent to a recursive
   resolver (usually provided by your ISP or public DNS like 8.8.8.8).

3. ROOT NAMESERVER: The recursive resolver queries a root nameserver,
   which directs the query to the appropriate TLD nameserver.

4. TLD NAMESERVER: The TLD nameserver returns the address of the
   authoritative nameserver for the domain.

5. AUTHORITATIVE SERVER: Finally, the authoritative nameserver returns
   the actual IP address of the requested domain.

QUERY TYPES EXPLAINED
─────────────────────────────────────────────────────────────────────
• A (Address Record): Maps domain name to IPv4 address
• AAAA (IPv6 Address): Maps domain name to IPv6 address
• CNAME (Canonical Name): Maps domain to another domain name
• MX (Mail Exchange): Specifies mail server for the domain

KEY TERMINOLOGY
─────────────────────────────────────────────────────────────────────
• TTL (Time To Live): Duration a DNS record is cached before refresh
• Cache Hit: Domain found in local cache
• Cache Miss: Domain not found, full resolution required
• Nameserver: Server storing DNS records for a domain
• Zone: Collection of DNS records for a domain

PERFORMANCE INSIGHTS
─────────────────────────────────────────────────────────────────────
${
  result.cacheHit
    ? "✓ Cache hit achieved! Resolution was fast using local cached data."
    : `✗ Cache miss occurred. Full resolution process was required.\n  Resolution took ${result.totalTime}ms across ${result.steps.length} steps.`
}

RECOMMENDATIONS
─────────────────────────────────────────────────────────────────────
${result.totalTime > 100 ? "• Consider using a faster DNS resolver (e.g., 1.1.1.1, 8.8.8.8)" : "• Resolution time is good!"}
${stats.hits > stats.misses ? "• Cache is working well, hit rate is strong" : "• Many cache misses - consider longer TTL values"}

Generated: ${new Date().toLocaleString()}
═════════════════════════════════════════════════════════════════════
`

    return report
  }

  const downloadAsText = async () => {
    try {
      setIsDownloading(true)
      const report = generateReport()
      const blob = new Blob([report], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `DNS_Report_${result.domain}_${Date.now()}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAsJSON = async () => {
    try {
      setIsDownloading(true)
      const data = {
        timestamp: new Date().toISOString(),
        query: {
          domain: result.domain,
          queryType: result.queryType,
        },
        result: {
          ip: result.ip,
          cacheHit: result.cacheHit,
          totalTime: result.totalTime,
        },
        steps: result.steps,
        statistics: {
          hits: stats.hits,
          misses: stats.misses,
          hitRate: stats.hits + stats.misses > 0 ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(2) : "0",
        },
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `DNS_Report_${result.domain}_${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Card
      data-download-section
      className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-400 p-8 space-y-6 shadow-lg shadow-cyan-400/20"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-cyan-300">Download Report</h3>
        <p className="text-sm text-cyan-200">Export detailed DNS resolution data in your preferred format</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={downloadAsText}
          disabled={isDownloading}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 hover:shadow-lg hover:shadow-cyan-500/60 font-bold py-3 transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95 text-base"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? "Downloading..." : "Download as Text"}
        </Button>
        <Button
          onClick={downloadAsJSON}
          disabled={isDownloading}
          className="bg-gradient-to-r from-green-500 to-cyan-500 text-slate-900 hover:shadow-lg hover:shadow-green-500/60 font-bold py-3 transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95 text-base"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? "Downloading..." : "Download as JSON"}
        </Button>
      </div>
    </Card>
  )
}
