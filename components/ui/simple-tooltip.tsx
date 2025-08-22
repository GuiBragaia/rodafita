"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SimpleTooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function SimpleTooltip({ 
  content, 
  children, 
  side = "top",
  className 
}: SimpleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div 
      className={cn("relative inline-block group", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-lg shadow-2xl pointer-events-none",
            "bg-gradient-to-r from-primary/95 to-accent/95 backdrop-blur-sm border border-primary/30",
            "transition-all duration-200 ease-out",
            "opacity-100 scale-100",
            side === "top" && "-top-16 sm:-top-20 left-1/2 -translate-x-1/2",
            side === "bottom" && "-bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2",
            side === "left" && "top-1/2 -left-4 sm:-left-6 -translate-y-1/2 -translate-x-full",
            side === "right" && "top-1/2 -right-4 sm:-right-6 -translate-y-1/2 translate-x-full"
          )}
          style={{
            maxWidth: "160px",
            wordWrap: "break-word",
            whiteSpace: "normal",
            textAlign: "center"
          }}
        >
          {content}
          
          {/* Arrow */}
          <div
            className={cn(
              "absolute w-2 h-2 bg-gradient-to-r from-primary/95 to-accent/95 rotate-45 border-l border-t border-primary/30",
              side === "top" && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
              side === "bottom" && "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
              side === "left" && "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
              side === "right" && "right-full top-1/2 translate-x-1/2 -translate-y-1/2"
            )}
          />
        </div>
      )}
    </div>
  )
}
