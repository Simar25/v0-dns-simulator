"use client"

import { Download, BookOpen, Users, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onOpenModal: (modalName: "learn" | "developedBy" | "help") => void
  onDownload?: () => void
}

export default function Header({ onOpenModal, onDownload }: HeaderProps) {
  const handleDownloadClick = () => {
    const downloadSection = document.querySelector("[data-download-section]")
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="relative z-50 border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-xl sticky top-0">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

      <div className="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
            <span className="font-black text-white text-lg">DNS</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black font-mono tracking-tight text-cyan-400">DNS Resolution</h1>
            <p className="text-xs gradient-text-accent font-semibold text-cyan-300">Simulator</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onOpenModal("learn")}
            variant="outline"
            className="border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/15 hover:text-indigo-300 hover:border-indigo-500 transition-all duration-300 font-semibold text-sm"
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            Learn
          </Button>
          <Button
            onClick={() => onOpenModal("developedBy")}
            variant="outline"
            className="border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/15 hover:text-indigo-300 hover:border-indigo-500 transition-all duration-300 font-semibold text-sm"
          >
            <Users className="w-4 h-4 mr-1.5" />
            Developed By
          </Button>
          <Button
            onClick={() => onOpenModal("help")}
            variant="outline"
            className="border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/15 hover:text-indigo-300 hover:border-indigo-500 transition-all duration-300 font-semibold text-sm"
          >
            <HelpCircle className="w-4 h-4 mr-1.5" />
            Help
          </Button>
          <Button
            onClick={handleDownloadClick}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 font-bold text-sm transition-all duration-300 ml-2"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Download
          </Button>
        </div>
      </div>
    </header>
  )
}
