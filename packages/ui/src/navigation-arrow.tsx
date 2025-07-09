"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationArrowProps {
  direction: "left" | "right"
  onClick: () => void
  disabled?: boolean
}

export default function NavigationArrow({ direction, onClick, disabled = false }: NavigationArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "left" ? "left-4" : "right-4"
      } z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500`}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      <Icon className="w-5 h-5 text-gray-700" />
    </button>
  )
}
