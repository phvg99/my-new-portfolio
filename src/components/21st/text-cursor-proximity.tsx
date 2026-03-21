"use client"

import React, { CSSProperties, forwardRef, useCallback, useEffect, useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number
}

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T]
  to: CSSPropertiesWithValues[T]
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>
  }>
  containerRef: React.RefObject<HTMLDivElement | null>
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian"
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      label,
      styles,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
    const cachedLetterRects = useRef<DOMRect[]>([])
    const cachedContainerRect = useRef<DOMRect | null>(null)
    const cachedBoundsRect = useRef<{ left: number; top: number; right: number; bottom: number } | null>(null)
    const isProximityDirty = useRef(false)
    const mousePositionRef = useMousePositionRef(containerRef)
    const shouldReduceMotion = useReducedMotion()

    const refreshRects = useCallback(() => {
      cachedLetterRects.current = letterRefs.current.map(
        (ref) => ref?.getBoundingClientRect() ?? new DOMRect()
      )
      if (containerRef.current) {
        cachedContainerRect.current = containerRef.current.getBoundingClientRect()
      }
      // Compute combined bounding box of all letters
      const rects = cachedLetterRects.current
      if (rects.length > 0) {
        let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity
        for (const r of rects) {
          if (r.width === 0) continue
          left = Math.min(left, r.left)
          top = Math.min(top, r.top)
          right = Math.max(right, r.right)
          bottom = Math.max(bottom, r.bottom)
        }
        if (cachedContainerRect.current) {
          const cr = cachedContainerRect.current
          cachedBoundsRect.current = {
            left: left - cr.left - radius,
            top: top - cr.top - radius,
            right: right - cr.left + radius,
            bottom: bottom - cr.top + radius,
          }
        }
      }
    }, [containerRef, radius])

    // Populate rects after first paint, refresh on resize
    useEffect(() => {
      const rafId = requestAnimationFrame(() => refreshRects())
      let debounceTimer: ReturnType<typeof setTimeout>
      const handleResize = () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(refreshRects, 200)
      }
      window.addEventListener("resize", handleResize)
      return () => {
        cancelAnimationFrame(rafId)
        clearTimeout(debounceTimer)
        window.removeEventListener("resize", handleResize)
      }
    }, [refreshRects])

    const letterProximities = useRef(
      Array(label.replace(/\s/g, "").length)
        .fill(0)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        .map(() => useMotionValue(0))
    )

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    const calculateFalloff = (distance: number): number => {
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)

      switch (falloff) {
        case "exponential":
          return Math.pow(normalizedDistance, 2)
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2)
        case "linear":
        default:
          return normalizedDistance
      }
    }

    useAnimationFrame(() => {
      if (shouldReduceMotion) return
      if (!cachedContainerRect.current) return

      const mx = mousePositionRef.current.x
      const my = mousePositionRef.current.y

      // Early-exit: skip per-letter math when mouse is far from all letters
      const bounds = cachedBoundsRect.current
      if (bounds && (mx < bounds.left || mx > bounds.right || my < bounds.top || my > bounds.bottom)) {
        if (isProximityDirty.current) {
          letterProximities.current.forEach((p) => p.set(0))
          isProximityDirty.current = false
        }
        return
      }

      const cr = cachedContainerRect.current
      cachedLetterRects.current.forEach((rect, index) => {
        const letterCenterX = rect.left + rect.width / 2 - cr.left
        const letterCenterY = rect.top + rect.height / 2 - cr.top

        const distance = calculateDistance(mx, my, letterCenterX, letterCenterY)
        const proximity = calculateFalloff(distance)
        letterProximities.current[index]?.set(proximity)
      })
      isProximityDirty.current = true
    })

    const words = label.split(" ")
    let letterIndex = 0

    return (
      <span
        ref={ref}
        className={`${className} inline`}
        onClick={onClick}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++
              const proximity = letterProximities.current[currentLetterIndex]

              const transformedStyles = Object.entries(styles).reduce(
                (acc, [key, value]) => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  acc[key] = useTransform(proximity, [0, 1], [
                    value.from as string,
                    value.to as string,
                  ])
                  return acc
                },
                {} as Record<string, ReturnType<typeof useTransform<number, string>>>
              )

              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[currentLetterIndex] = el
                  }}
                  className="inline-block"
                  aria-hidden="true"
                  style={{ ...transformedStyles, willChange: "transform" }}
                >
                  {letter}
                </motion.span>
              )
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    )
  }
)

TextCursorProximity.displayName = "TextCursorProximity"
export default TextCursorProximity
