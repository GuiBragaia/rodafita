"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  TrendingUp, 
  Star, 
  Users, 
  Clock, 
  Calendar,
  BarChart3,
  Award
} from "lucide-react"

interface MovieStatsProps {
  budget: number | null
  revenue: number | null
  voteAverage: number | null
  voteCount: number | null
  popularity: number | null
  runtime: number | null
  releaseDate: string | null
  status: string | null
  productionCompanies: string[]
}

export function MovieStats({
  budget,
  revenue,
  voteAverage,
  voteCount,
  popularity,
  runtime,
  releaseDate,
  status,
  productionCompanies
}: MovieStatsProps) {
  const formatCurrency = (amount: number) => {
    if (!amount) return "Não informado"
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatRuntime = (minutes: number) => {
    if (!minutes) return "Não informado"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}min`
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Não informado"
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatVoteCount = (count: number) => {
    if (!count) return "0"
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getProfitMargin = () => {
    if (!budget || !revenue || budget === 0) return null
    const profit = revenue - budget
    const margin = (profit / budget) * 100
    return margin
  }

  const profitMargin = getProfitMargin()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {/* Informações Financeiras */}
      <Card className="glass">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
            Informações Financeiras
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Orçamento:</span>
            <span className="font-medium text-xs sm:text-sm">{formatCurrency(budget || 0)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Receita:</span>
            <span className="font-medium text-xs sm:text-sm">{formatCurrency(revenue || 0)}</span>
          </div>
          
          {profitMargin !== null && (
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Lucro:</span>
              <Badge 
                variant="secondary" 
                className={`text-xs sm:text-sm ${profitMargin >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
              >
                {profitMargin >= 0 ? "+" : ""}{profitMargin.toFixed(1)}%
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Avaliações e Popularidade */}
      <Card className="glass">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Star className="w-4 h-4 sm:w-5 sm:h-5" />
            Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Nota Média:</span>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-xs sm:text-sm">{voteAverage?.toFixed(1) || "N/A"}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Total de Votos:</span>
            <span className="font-medium text-xs sm:text-sm">{formatVoteCount(voteCount || 0)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Popularidade:</span>
            <Badge variant="secondary" className="bg-primary/20 text-primary text-xs sm:text-sm">
              {popularity?.toFixed(0) || "N/A"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Informações Técnicas */}
      <Card className="glass">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            Informações Técnicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Duração:</span>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium text-xs sm:text-sm">{formatRuntime(runtime || 0)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Data de Lançamento:</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium text-xs sm:text-sm">{formatDate(releaseDate || "")}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-muted-foreground">Status:</span>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {status || "Não informado"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Produtoras */}
      {productionCompanies.length > 0 && (
        <Card className="glass">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              Produtoras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {productionCompanies.map((company, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {company}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
