"use client"

import { useState } from "react"
import { X, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TrailerModalProps {
  trailerUrl: string | null
  movieTitle: string
  isOpen: boolean
  onClose: () => void
}

export function TrailerModal({ trailerUrl, movieTitle, isOpen, onClose }: TrailerModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  if (!isOpen || !trailerUrl) return null

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null
  }

  const embedUrl = getYouTubeEmbedUrl(trailerUrl)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto" style={{ paddingTop: '5vh' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mt-4 sm:mt-8">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/50">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Trailer: {movieTitle}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Assista ao trailer oficial
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted/50"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`Trailer de ${movieTitle}`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">Trailer não disponível</p>
                <Button
                  onClick={() => window.open(trailerUrl, '_blank')}
                  className="gap-2 text-xs sm:text-sm"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  Abrir no YouTube
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Dados fornecidos pelo TMDB
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(trailerUrl, '_blank')}
              className="gap-2 text-xs sm:text-sm"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              Abrir no YouTube
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TrailerButton({ 
  trailerUrl, 
  movieTitle, 
  className 
}: { 
  trailerUrl: string | null
  movieTitle: string
  className?: string 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!trailerUrl) return null

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className={cn("gap-2", className)}
      >
        <Play className="w-4 h-4" />
        Trailer
      </Button>

      <TrailerModal
        trailerUrl={trailerUrl}
        movieTitle={movieTitle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
