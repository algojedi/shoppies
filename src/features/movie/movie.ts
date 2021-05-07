export interface Movie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}
export interface MovieResultsResponse {
    Search: Movie[]
    totalResults: string
    Response: string
}
