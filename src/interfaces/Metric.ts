import Movie from "./Movie"

export default interface Metric {
    id: string
    title: string,
    movies: Movie[]
}