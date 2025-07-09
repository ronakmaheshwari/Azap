"use client"

interface CarouselDotProps {
  active: boolean
  onClick: () => void
  progress?: number
}

export default function CarouselDot({ active, onClick, progress = 0 }: CarouselDotProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        active ? "bg-purple-700 scale-110" : "bg-gray-300 hover:bg-gray-400"
      }`}
      aria-label={`Go to slide ${active ? "current" : "next"}`}
    >
      {active && (
        <div
          className="absolute inset-0 rounded-full border-2 border-purple-300"
          style={{
            background: `conic-gradient(from 0deg, transparent ${progress * 360}deg, rgba(147, 51, 234, 0.3) ${progress * 360}deg)`,
          }}
        />
      )}
    </button>
  )
}