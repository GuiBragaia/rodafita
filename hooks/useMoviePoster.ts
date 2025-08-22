import { useState, useEffect } from "react"

interface MovieDetails {
  posterUrl: string
  trailerUrl: string | null
  budget: number | null
  revenue: number | null
  runtime: number | null
  voteAverage: number | null
  voteCount: number | null
  popularity: number | null
  status: string | null
  releaseDate: string | null
  productionCompanies: string[]
  genres: string[]
  whereToWatch: {
    provider: string
    logo: string
    type: "stream" | "rent" | "buy"
  }[]
  isLoading: boolean
  error: string | null
}

export default function useMovieDetails(tmdbId: number | undefined): MovieDetails {
  const [details, setDetails] = useState<MovieDetails>({
    posterUrl: "",
    trailerUrl: null,
    budget: null,
    revenue: null,
    runtime: null,
    voteAverage: null,
    voteCount: null,
    popularity: null,
    status: null,
    releaseDate: null,
    productionCompanies: [],
    genres: [],
    whereToWatch: [],
    isLoading: false,
    error: null,
  })

  useEffect(() => {
    if (!tmdbId) {
      setDetails(prev => ({ ...prev, posterUrl: "", isLoading: false }))
      return
    }

    const fetchMovieDetails = async () => {
      setDetails(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
        if (!apiKey) {
          throw new Error("TMDB API key não configurada")
        }

        console.log(`Buscando detalhes para o filme com TMDB ID: ${tmdbId}`)

        // Buscar detalhes principais do filme
        const movieUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=pt-BR&append_to_response=videos,credits,watch/providers`
        console.log(`Fazendo requisição para: ${movieUrl}`)
        
        const movieResponse = await fetch(movieUrl)

        if (!movieResponse.ok) {
          const errorText = await movieResponse.text()
          console.error(`Erro na resposta da API: ${movieResponse.status} ${movieResponse.statusText}`)
          console.error(`Resposta: ${errorText}`)
          throw new Error(`Erro ao buscar dados do filme (${movieResponse.status}): ${movieResponse.statusText}`)
        }

        const movieData = await movieResponse.json()
        console.log(`Dados recebidos para filme ${tmdbId}:`, movieData.title || 'Sem título')

        // Buscar onde assistir (streaming) - opcional, não falhar se der erro
        let whereToWatch: MovieDetails["whereToWatch"] = []
        try {
          const watchProvidersResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers?api_key=${apiKey}`
          )

          if (watchProvidersResponse.ok) {
            const providersData = await watchProvidersResponse.json()
            const brProviders = providersData.results?.BR || {}
            
            whereToWatch = [
              ...(brProviders.flatrate || []).map((p: any) => ({
                provider: p.provider_name,
                logo: `https://image.tmdb.org/t/p/original${p.logo_path}`,
                type: "stream" as const,
              })),
              ...(brProviders.rent || []).map((p: any) => ({
                provider: p.provider_name,
                logo: `https://image.tmdb.org/t/p/original${p.logo_path}`,
                type: "rent" as const,
              })),
              ...(brProviders.buy || []).map((p: any) => ({
                provider: p.provider_name,
                logo: `https://image.tmdb.org/t/p/original${p.logo_path}`,
                type: "buy" as const,
              })),
            ]
          }
        } catch (providerError) {
          console.warn(`Erro ao buscar provedores de streaming para filme ${tmdbId}:`, providerError)
          // Não falhar se não conseguir buscar provedores
        }

        // Buscar trailer do YouTube
        const videos = movieData.videos?.results || []
        const trailer = videos.find((video: any) => 
          video.type === "Trailer" && 
          video.site === "YouTube" &&
          (video.name.toLowerCase().includes("trailer") || video.name.toLowerCase().includes("oficial"))
        )

        // Formatar orçamento e receita
        const formatCurrency = (amount: number) => {
          if (!amount) return null
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(amount)
        }

        // Formatar duração
        const formatRuntime = (minutes: number) => {
          if (!minutes) return null
          const hours = Math.floor(minutes / 60)
          const mins = minutes % 60
          return `${hours}h ${mins}min`
        }

        setDetails({
          posterUrl: movieData.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
            : "",
          trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
          budget: movieData.budget,
          revenue: movieData.revenue,
          runtime: movieData.runtime,
          voteAverage: movieData.vote_average,
          voteCount: movieData.vote_count,
          popularity: movieData.popularity,
          status: movieData.status,
          releaseDate: movieData.release_date,
          productionCompanies: movieData.production_companies?.map((company: any) => company.name) || [],
          genres: movieData.genres?.map((genre: any) => genre.name) || [],
          whereToWatch,
          isLoading: false,
          error: null,
        })

      } catch (error) {
        console.error(`Erro ao buscar detalhes do filme ${tmdbId}:`, error)
        setDetails(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        }))
      }
    }

    fetchMovieDetails()
  }, [tmdbId])

  return details
}

// Hook legado para compatibilidade
export function useMoviePoster(tmdbId: number | undefined): string {
  const details = useMovieDetails(tmdbId)
  return details.posterUrl
}
