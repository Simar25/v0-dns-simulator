"use client"

import { useState, useRef } from "react"
import Header from "@/components/header"
import DnsSimulator from "@/components/dns-simulator"
import LearnModal from "@/components/modals/learn-modal"
import DevelopedByModal from "@/components/modals/developed-by-modal"
import HelpModal from "@/components/modals/help-modal"

export default function Home() {
  const [modals, setModals] = useState({
    learn: false,
    developedBy: false,
    help: false,
  })

  const dnsSimulatorRef = useRef<any>(null)

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }))
  }

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }))
  }

  const handleDownload = () => {
    // Trigger download section by scrolling and clicking first download button
    const downloadSection = document.querySelector("[data-download-section]")
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: "smooth" })
      const firstButton = downloadSection.querySelector("button")
      if (firstButton) {
        setTimeout(() => firstButton.click(), 500)
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-dns-darkest via-dns-dark to-dns-darkest">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-dns-neon/5 rounded-full filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-dns-cyan/5 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Header onOpenModal={openModal} onDownload={handleDownload} />
      <DnsSimulator ref={dnsSimulatorRef} />

      <LearnModal isOpen={modals.learn} onClose={() => closeModal("learn")} />
      <DevelopedByModal isOpen={modals.developedBy} onClose={() => closeModal("developedBy")} />
      <HelpModal isOpen={modals.help} onClose={() => closeModal("help")} />
    </main>
  )
}
