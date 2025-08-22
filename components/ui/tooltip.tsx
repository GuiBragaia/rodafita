"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  delay?: number
  className?: string
}

export function Tooltip({ 
  content, 
  children, 
  side = "top", 
  delay = 300,
  className 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect()
        
        let x = 0
        let y = 0
        
        switch (side) {
          case "top":
            x = triggerRect.left + triggerRect.width / 2
            y = triggerRect.top - 8
            break
          case "bottom":
            x = triggerRect.left + triggerRect.width / 2
            y = triggerRect.bottom + 8
            break
          case "left":
            x = triggerRect.left - 8
            y = triggerRect.top + triggerRect.height / 2
            break
          case "right":
            x = triggerRect.right + 8
            y = triggerRect.top + triggerRect.height / 2
            break
        }
        
        setPosition({ x, y })
        setIsVisible(true)
      }
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className={cn("inline-block", className)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 px-3 py-2 text-sm font-medium text-white rounded-lg shadow-2xl pointer-events-none",
            "bg-gradient-to-r from-primary/95 to-accent/95 backdrop-blur-sm border border-primary/30",
            "animate-in fade-in-0 zoom-in-95",
            side === "top" && "animate-in slide-in-from-bottom-2",
            side === "bottom" && "animate-in slide-in-from-top-2",
            side === "left" && "animate-in slide-in-from-right-2",
            side === "right" && "animate-in slide-in-from-left-2"
          )}
          style={{
            left: side === "top" || side === "bottom" ? position.x - 50 : position.x,
            top: position.y,
            transform: side === "left" || side === "right" ? 'translateY(-50%)' : 'none',
          }}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              "absolute w-2 h-2 bg-gradient-to-r from-primary/95 to-accent/95 rotate-45",
              side === "top" && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
              side === "bottom" && "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
              side === "left" && "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
              side === "right" && "right-full top-1/2 translate-x-1/2 -translate-y-1/2"
            )}
          />
        </div>
      )}
    </>
  )
}
