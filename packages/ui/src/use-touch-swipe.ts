"use client"

import type React from "react"

import { useRef, useCallback } from "react"

interface UseTouchSwipeProps {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  threshold?: number
}

export function useTouchSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseTouchSwipeProps) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return

      if (!e.changedTouches[0]) return
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY

      const deltaX = touchStartX.current - touchEndX
      const deltaY = touchStartY.current - touchEndY

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          onSwipeLeft()
        } else {
          onSwipeRight()
        }
      }

      touchStartX.current = null
      touchStartY.current = null
    },
    [onSwipeLeft, onSwipeRight, threshold],
  )

  return { handleTouchStart, handleTouchEnd }
}
