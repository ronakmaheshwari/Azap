"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause } from "lucide-react"

import NavigationArrow from "./navigation-arrow"
import { useTouchSwipe } from "./use-touch-swipe"
import CarouselDot from "./CarouselDot"

const slides = [
  {
    id: 1,
    title: "Seamless Banking",
    description: "Experience smooth and fast crypto banking services with our trusted partners.",
    image: "https://coingate.com/app/uploads/2024/03/Best_crypto_debit_card_blog.png",
  },
  {
    id: 2,
    title: "Secure Transactions",
    description: "Your security is our top priority. Transact with confidence anytime.",
    image: "https://images.unsplash.com/photo-1611078489935-0cb9642dc76b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Recurring Payments",
    description: "Automate your crypto top-ups with flexible recurring options.",
    image: "https://coingate.com/app/uploads/2024/03/Best_crypto_debit_card_blog.png",
  },
]

const AUTOPLAY_INTERVAL = 5000

export default function CryptoCard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [])

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
    setProgress(0)
  }, [])

  // Touch/swipe functionality
  const { handleTouchStart, handleTouchEnd } = useTouchSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  })

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    intervalRef.current = setInterval(nextSlide, AUTOPLAY_INTERVAL)

    // Progress animation
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 0
        return prev + 0.02
      })
    }, 100)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [isPlaying, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === " ") {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, isPlaying])

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0)
    setImageLoading(true)
  }, [activeIndex])

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden group">
      {/* Image Container with Navigation */}
      <div
        className="relative h-[300px] w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Image with loading state */}
        <div className="relative w-full h-full">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
            </div>
          )}
          <img
            src={slides[activeIndex]?.image ?? ""}
            alt={slides[activeIndex]?.title ?? ""}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Navigation Arrows */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavigationArrow direction="left" onClick={prevSlide} />
          <NavigationArrow direction="right" onClick={nextSlide} />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 opacity-0 group-hover:opacity-100"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-gray-700" /> : <Play className="w-4 h-4 text-gray-700" />}
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Content with Animation */}
      <div className="p-6 text-center">
        <div className="transform transition-all duration-500 ease-out">
          <h3 className="text-2xl font-bold text-purple-700 mb-3 leading-tight">{slides[activeIndex]?.title ?? ""}</h3>
          <p className="text-gray-600 text-lg leading-relaxed">{slides[activeIndex]?.description ?? ""}</p>
        </div>
      </div>

      {/* Enhanced Dots Navigation */}
      <div className="flex justify-center items-center gap-3 pb-6">
        {slides.map((_, idx) => (
          <CarouselDot
            key={idx}
            active={activeIndex === idx}
            progress={activeIndex === idx ? progress : 0}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}
