"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, Shuffle, Moon, Sun, Filter, Play, Star, Sparkles, Film, Clock, Users, Award, Grid3x3 } from "lucide-react"
import { useTheme } from "next-themes"
import moviesData from "@/data/movies.json"
import Image from "next/image"
import useMovieDetails from "@/hooks/useMoviePoster"
import { Particles } from "@/components/ui/particles"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast, CustomToast } from "@/components/ui/custom-toast"
import { TrailerModal } from "@/components/ui/trailer-modal"
import { WhereToWatch } from "@/components/ui/where-to-watch"
import { MovieStats } from "@/components/ui/movie-stats"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"

interface Movie {
  id: number
  title: string
  year: number
  duration: string
  genres: string[]
  director: string
  cast: string[]
  synopsis: string
  whyWatch: string
  tmdbId: number
}

export default function QualVaiSer() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [showMovie, setShowMovie] = useState(false)
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { toast, toasts } = useToast()
  
  // Estado para controlar filmes recentes e melhorar aleatoriedade
  const [recentMovies, setRecentMovies] = useState<number[]>([])
  const [movieWeights, setMovieWeights] = useState<Map<number, number>>(new Map())

  // Usar o hook para buscar detalhes completos do filme atual
  const movieDetails = useMovieDetails(currentMovie?.tmdbId)

  useEffect(() => {
    setMounted(true)
    const savedFavorites = localStorage.getItem("movie-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
    
    // Carregar filmes recentes do localStorage
    const savedRecentMovies = localStorage.getItem("movie-recent")
    if (savedRecentMovies) {
      setRecentMovies(JSON.parse(savedRecentMovies))
    }
    
    // Inicializar pesos dos filmes
    initializeMovieWeights()
  }, [])

  const initializeMovieWeights = () => {
    const weights = new Map<number, number>()
    moviesData.forEach(movie => {
      weights.set(movie.id, 1.0) // Peso inicial para todos os filmes
    })
    setMovieWeights(weights)
  }

  const getFilteredMovies = () => {
    if (selectedGenre === "all") return moviesData
    return moviesData.filter((movie) =>
      movie.genres.some((genre) => genre.toLowerCase() === selectedGenre.toLowerCase()),
    )
  }

  const getRandomMovie = () => {
    setIsLoading(true)
    setShowMovie(false)
    setTimeout(() => {
      const filteredMovies = getFilteredMovies()
      
      // Filtrar filmes que não foram vistos recentemente (últimos 10)
      const availableMovies = filteredMovies.filter(movie => 
        !recentMovies.includes(movie.id)
      )
      
      // Se todos os filmes foram vistos recentemente, resetar a lista
      const moviesToUse = availableMovies.length > 0 ? availableMovies : filteredMovies
      
      // Aplicar sistema de pesos para melhorar aleatoriedade
      const weightedMovies = moviesToUse.map(movie => ({
        ...movie,
        weight: movieWeights.get(movie.id) || 1.0
      }))
      
      // Calcular peso total
      const totalWeight = weightedMovies.reduce((sum, movie) => sum + movie.weight, 0)
      
      // Gerar número aleatório ponderado
      let random = Math.random() * totalWeight
      let selectedMovie = weightedMovies[0]
      
      for (const movie of weightedMovies) {
        random -= movie.weight
        if (random <= 0) {
          selectedMovie = movie
          break
        }
      }
      
      // Atualizar pesos - diminuir peso do filme selecionado
      const newWeights = new Map(movieWeights)
      newWeights.set(selectedMovie.id, Math.max(0.1, (newWeights.get(selectedMovie.id) || 1.0) * 0.7))
      
      // Aumentar peso dos outros filmes gradualmente
      moviesData.forEach(movie => {
        if (movie.id !== selectedMovie.id) {
          const currentWeight = newWeights.get(movie.id) || 1.0
          newWeights.set(movie.id, Math.min(2.0, currentWeight * 1.05))
        }
      })
      
      setMovieWeights(newWeights)
      
      // Atualizar lista de filmes recentes
      const newRecentMovies = [selectedMovie.id, ...recentMovies.slice(0, 9)]
      setRecentMovies(newRecentMovies)
      localStorage.setItem("movie-recent", JSON.stringify(newRecentMovies))
      
      setCurrentMovie(selectedMovie)
      setIsLoading(false)
      setTimeout(() => setShowMovie(true), 100)
    }, 1500)
  }

  const toggleFavorite = (movieId: number) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId]

    setFavorites(newFavorites)
    localStorage.setItem("movie-favorites", JSON.stringify(newFavorites))
    
    if (favorites.includes(movieId)) {
      toast.success("Removido dos favoritos", "Filme removido da sua lista de favoritos")
    } else {
      toast.success("Adicionado aos favoritos", "Filme adicionado à sua lista de favoritos")
    }
  }

  const shareMovie = () => {
    if (currentMovie && navigator.share) {
      navigator.share({
        title: `Recomendação: ${currentMovie.title}`,
        text: `Que tal assistir "${currentMovie.title}" (${currentMovie.year})? ${currentMovie.whyWatch}`,
        url: window.location.href,
      }).then(() => {
        toast.success("Compartilhado com sucesso", "Filme compartilhado via API nativa")
      }).catch(() => {
        toast.error("Erro ao compartilhar", "Tente novamente ou copie o link manualmente")
      })
    } else if (currentMovie) {
      navigator.clipboard.writeText(
        `Que tal assistir "${currentMovie.title}" (${currentMovie.year})? ${currentMovie.whyWatch} - Roda a Fita`,
      ).then(() => {
        toast.success("Link copiado", "Link do filme copiado para a área de transferência")
      }).catch(() => {
        toast.error("Erro ao copiar", "Não foi possível copiar o link")
      })
    }
  }

  const resetRandomness = () => {
    // Resetar filmes recentes
    setRecentMovies([])
    localStorage.removeItem("movie-recent")
    
    // Resetar pesos dos filmes
    initializeMovieWeights()
    
    toast.success("Sistema resetado", "Aleatoriedade do sorteio foi resetada")
  }

  const allGenres = [...new Set(moviesData.flatMap((movie) => movie.genres))]

  if (!mounted) return null

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Animated particles */}
      <Particles />

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <header className="text-center mb-12 sm:mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full sm:w-56 glass border-border/30 focus-ring">
                  <Filter className="w-4 h-4 mr-2 text-primary" />
                  <SelectValue placeholder="Filtrar por gênero" />
                </SelectTrigger>
                <SelectContent className="glass border-border/30">
                  <SelectItem value="all">🎬 Todos os gêneros</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass border-border/30 hover:bg-primary/10 focus-ring cursor-pointer"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-serif bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 sm:mb-8 tracking-tight animate-gradient">
                Roda a Fita
              </h1>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light px-4">
              Descubra sua próxima <span className="text-primary font-semibold">obra-prima cinematográfica</span> entre os melhores filmes da história
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-lg text-muted-foreground px-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
                <span>160 filmes curados</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-primary rounded-full"></div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
                <span>Melhores da história</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-primary rounded-full"></div>
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>Gêneros variados</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-primary rounded-full"></div>
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>Sorteio inteligente</span>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <div className="text-center mb-12 sm:mb-16">
          {!currentMovie && (
            <div className="mb-12 sm:mb-16">
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto card-shadow">
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <Film className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                  Clique no botão mágico e receba uma <span className="text-primary font-semibold">sugestão incrível</span> de filme para sua próxima sessão cinematográfica
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Seleção instantânea</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Para todos os gostos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-4 px-4">
            <Button
              onClick={getRandomMovie}
              disabled={isLoading}
              size="lg"
              className="text-lg sm:text-xl px-8 sm:px-12 md:px-16 py-8 sm:py-10 rounded-2xl sm:rounded-3xl card-shadow hover:shadow-primary/30 transition-all duration-500 transform hover:scale-105 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary border-0 font-bold focus-ring cursor-pointer w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="lg" className="mr-2 sm:mr-4" />
                  <span className="text-sm sm:text-base">Escolhendo sua próxima obra-prima...</span>
                </>
              ) : (
                <>
                  <Shuffle className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-4" />
                  <span className="text-sm sm:text-base">Descobrir Filme Incrível</span>
                </>
              )}
            </Button>
            
            <Button
              onClick={resetRandomness}
              variant="outline"
              size="sm"
              className="text-sm px-4 sm:px-6 py-2 rounded-full glass border-border/30 hover:bg-primary/10 focus-ring cursor-pointer"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Resetar Aleatoriedade
            </Button>
          </div>
        </div>

        {/* Enhanced Movie Card */}
        {currentMovie && (
          <div className={`max-w-6xl mx-auto transition-all duration-1000 ${showMovie ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="overflow-visible card-shadow glass border-0">
              <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
                {/* Enhanced Movie Poster */}
                <div className="lg:w-2/5 relative mb-6 lg:mb-0">
                  <div className="aspect-[2/3] relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl max-w-sm mx-auto lg:max-w-none">
                    <Image
                      src={movieDetails.posterUrl || "/placeholder.svg"}
                      alt={`Poster de ${currentMovie.title}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl sm:rounded-2xl"></div>
                    <SimpleTooltip content="Assistir trailer" side="top">
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-500 rounded-xl sm:rounded-2xl cursor-pointer"
                        onClick={() => movieDetails.trailerUrl && setIsTrailerOpen(true)}
                      >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm transform hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                        </div>
                      </div>
                    </SimpleTooltip>
                    {/* Movie info overlay */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm text-xs sm:text-sm">
                          {currentMovie.year}
                        </Badge>
                        <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 backdrop-blur-sm text-xs sm:text-sm">
                          {currentMovie.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Movie Details */}
                <div className="lg:w-3/5">
                  <CardHeader className="p-0 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6">
                      <div className="flex-1">
                        <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-serif leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {currentMovie.title}
                        </CardTitle>
                        <CardDescription className="text-base sm:text-lg md:text-xl text-muted-foreground">
                          Dirigido por <span className="text-primary font-semibold">{currentMovie.director}</span>
                        </CardDescription>
                      </div>

                      <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end relative overflow-visible z-10">
                        {movieDetails.trailerUrl && (
                          <SimpleTooltip content="Assistir trailer oficial" side="left">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsTrailerOpen(true)}
                              className="gap-2 cursor-pointer text-xs sm:text-sm"
                            >
                              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Trailer</span>
                            </Button>
                          </SimpleTooltip>
                        )}
                        <SimpleTooltip 
                          content={favorites.includes(currentMovie.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"} 
                          side="bottom"
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleFavorite(currentMovie.id)}
                            className={`glass border-border/30 hover:bg-card transition-all duration-300 focus-ring cursor-pointer ${
                              favorites.includes(currentMovie.id) 
                                ? "text-red-500 border-red-500/50 bg-red-500/10" 
                                : "hover:text-primary"
                            }`}
                          >
                            <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${favorites.includes(currentMovie.id) ? "fill-current" : ""}`} />
                          </Button>
                        </SimpleTooltip>
                        <SimpleTooltip content="Compartilhar filme" side="right">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={shareMovie}
                            className="glass border-border/30 hover:bg-card hover:text-primary transition-all duration-300 focus-ring cursor-pointer"
                          >
                            <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                          </Button>
                        </SimpleTooltip>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                      {currentMovie.genres.map((genre) => (
                        <Badge key={genre} variant="secondary" className="bg-primary/20 text-primary border-primary/30 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h3 className="font-semibold text-lg sm:text-xl mb-3 text-primary flex items-center gap-2">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                          Elenco Principal
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{currentMovie.cast.slice(0, 4).join(", ")}</p>
                      </div>

                      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h3 className="font-semibold text-lg sm:text-xl mb-3 text-primary flex items-center gap-2">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                          Direção
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{currentMovie.director}</p>
                      </div>
                    </div>

                    <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <h3 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-primary">Sinopse</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">{currentMovie.synopsis}</p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/15 to-accent/15 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-primary/20 relative overflow-hidden">
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary/50" />
                      </div>
                      <h3 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-primary flex items-center gap-2">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-primary" />
                        Por que assistir?
                      </h3>
                      <p className="text-foreground leading-relaxed text-sm sm:text-base md:text-lg font-medium">{currentMovie.whyWatch}</p>
                    </div>

                    {/* Estatísticas do Filme */}
                    {movieDetails.isLoading ? (
                      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
                        <LoadingSpinner size="lg" className="mx-auto mb-4" />
                        <p className="text-muted-foreground text-sm sm:text-base">Carregando informações detalhadas...</p>
                      </div>
                    ) : (
                      <>
                        <MovieStats
                          budget={movieDetails.budget}
                          revenue={movieDetails.revenue}
                          voteAverage={movieDetails.voteAverage}
                          voteCount={movieDetails.voteCount}
                          popularity={movieDetails.popularity}
                          runtime={movieDetails.runtime}
                          releaseDate={movieDetails.releaseDate}
                          status={movieDetails.status}
                          productionCompanies={movieDetails.productionCompanies}
                        />

                        {/* Onde Assistir */}
                        <WhereToWatch providers={movieDetails.whereToWatch} />
                      </>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Enhanced Footer */}
        <footer className="text-center mt-16 sm:mt-20 md:mt-24 text-muted-foreground space-y-4">
          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl mb-3 sm:mb-4">Baseado nas melhores listas de cinema do mundo</p>
            {favorites.length > 0 && (
              <p className="text-base sm:text-lg flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 text-red-500" />
                {favorites.length} filme{favorites.length > 1 ? "s" : ""} favoritado{favorites.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </footer>
      </div>
      
      {/* Toast notifications */}
      {toasts.map((toast) => (
        <CustomToast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={toast.onClose}
        />
      ))}

      {/* Trailer Modal */}
      {currentMovie && (
        <TrailerModal
          trailerUrl={movieDetails.trailerUrl}
          movieTitle={currentMovie.title}
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </div>
  )
}
