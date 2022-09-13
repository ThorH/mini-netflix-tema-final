import WatchedMovie from "./WatchedMovie"

export default interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    country: string,
    picture: string,
    watchedMovies: WatchedMovie[]
}