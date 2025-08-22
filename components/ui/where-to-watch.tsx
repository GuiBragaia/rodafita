"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Download, ShoppingCart, ExternalLink } from "lucide-react"
import Image from "next/image"

interface WhereToWatchProps {
  providers: {
    provider: string
    logo: string
    type: "stream" | "rent" | "buy"
  }[]
}

const typeConfig = {
  stream: {
    icon: Play,
    label: "Streaming",
    color: "bg-green-500/20 text-green-500 border-green-500/30",
  },
  rent: {
    icon: Download,
    label: "Alugar",
    color: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  },
  buy: {
    icon: ShoppingCart,
    label: "Comprar",
    color: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  },
}

export function WhereToWatch({ providers }: WhereToWatchProps) {
  if (!providers || providers.length === 0) {
    return (
      <Card className="glass">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            Onde Assistir
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Informações de streaming não disponíveis no momento.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Agrupar por tipo
  const groupedProviders = providers.reduce((acc, provider) => {
    if (!acc[provider.type]) {
      acc[provider.type] = []
    }
    acc[provider.type].push(provider)
    return acc
  }, {} as Record<string, typeof providers>)

  return (
    <Card className="glass">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          Onde Assistir
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {Object.entries(groupedProviders).map(([type, typeProviders]) => {
          const config = typeConfig[type as keyof typeof typeConfig]
          const Icon = config.icon

          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">{config.label}</span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {typeProviders.map((provider, index) => (
                  <div
                    key={`${provider.provider}-${index}`}
                    className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-lg bg-card/50 border border-border/30 hover:bg-card/80 transition-colors"
                  >
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded overflow-hidden">
                      <Image
                        src={provider.logo}
                        alt={provider.provider}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{provider.provider}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
