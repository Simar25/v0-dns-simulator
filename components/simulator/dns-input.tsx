"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

interface DnsInputProps {
  onResolve: (domain: string, queryType: string, cacheEntries: string[]) => void
  isLoading: boolean
}

export default function DnsInput({ onResolve, isLoading }: DnsInputProps) {
  const [domain, setDomain] = useState("")
  const [queryType, setQueryType] = useState("A")
  const [cacheEntries, setCacheEntries] = useState<string[]>(["google.com", "github.com"])
  const [newCache, setNewCache] = useState("")

  const handleResolve = () => {
    if (!domain.trim()) return
    onResolve(domain, queryType, cacheEntries)
  }

  const addCacheEntry = () => {
    if (newCache.trim() && !cacheEntries.includes(newCache)) {
      setCacheEntries([...cacheEntries, newCache])
      setNewCache("")
    }
  }

  const removeCacheEntry = (entry: string) => {
    setCacheEntries(cacheEntries.filter((e) => e !== entry))
  }

  return (
    <Card className="bg-slate-900 border-2 border-cyan-400 p-7 space-y-6 sticky top-24 shadow-xl shadow-cyan-400/40">
      {/* Domain Input */}
      <div className="space-y-3">
        <label className="block text-base font-bold text-cyan-100 uppercase tracking-wider">Domain Name</label>
        <Input
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleResolve()}
          className="bg-slate-700 border-2 border-cyan-500 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:ring-cyan-400/50 focus:ring-2 transition-all duration-300"
        />
      </div>

      {/* Query Type */}
      <div className="space-y-3">
        <label className="block text-base font-bold text-green-100 uppercase tracking-wider">Query Type</label>
        <div className="grid grid-cols-2 gap-2.5">
          {["A", "AAAA", "CNAME", "MX"].map((type) => (
            <button
              key={type}
              onClick={() => setQueryType(type)}
              className={`py-2.5 px-3 rounded-lg font-mono text-sm font-semibold transition-all duration-300 border-2 ${
                queryType === type
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/80 border-green-300"
                  : "bg-slate-700 border-slate-500 text-green-200 hover:border-green-400 hover:bg-slate-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Local Cache */}
      <div className="space-y-3">
        <label className="block text-base font-bold text-indigo-100 uppercase tracking-wider">Local DNS Cache</label>
        <div className="flex gap-2">
          <Input
            placeholder="Add domain..."
            value={newCache}
            onChange={(e) => setNewCache(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCacheEntry()}
            className="bg-slate-700 border-2 border-indigo-500 text-white placeholder:text-slate-300 focus:border-indigo-300 focus:ring-indigo-400/50 focus:ring-2 text-sm transition-all duration-300"
          />
          <Button
            onClick={addCacheEntry}
            size="sm"
            className="bg-indigo-600 text-white hover:bg-indigo-500 border border-indigo-400 font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/40"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {cacheEntries.map((entry) => (
            <div
              key={entry}
              className="px-3 py-2 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border-2 border-cyan-400 text-cyan-100 rounded-lg text-xs font-mono flex items-center gap-2 group hover:border-cyan-300 hover:bg-cyan-500/30 transition-all duration-300 shadow-md shadow-cyan-500/40"
            >
              {entry}
              <button
                onClick={() => removeCacheEntry(entry)}
                className="opacity-70 group-hover:opacity-100 text-cyan-300 hover:text-cyan-100 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Resolve Button */}
      <Button
        onClick={handleResolve}
        disabled={!domain.trim() || isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/60 font-bold py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-base border border-indigo-400"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Resolving...
          </span>
        ) : (
          "Resolve Domain"
        )}
      </Button>
    </Card>
  )
}
