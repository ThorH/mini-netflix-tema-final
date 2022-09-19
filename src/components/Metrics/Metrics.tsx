import {
    MetricsContainer,
    MetricContainer,
    MoviesContainer,
    MovieContainer,
    UsersContainer,
    UserContainer
} from "./MetricsStyle"
import { useUser } from "../../hooks/useUser"
import { useMovie } from "../../hooks/useMovie"
import { useNavigate } from "react-router-dom"
import Metric from "../../interfaces/Metric"
import { v4 as uuidv4 } from 'uuid';
import Movie from "../../interfaces/Movie"
import WatchedMovie from "../../interfaces/WatchedMovie"
import User from "../../interfaces/User"

function Metrics() {
    const { userLogged, users, updateUserLogged, updateUsers } = useUser()
    const { movies, updateMovies } = useMovie()
    const navigate = useNavigate()

    //let userLastFiveMovies: WatchedMovie[] = []
    const lastWatchedMovies: Movie[] = []

    const userLastFiveMovies = userLogged?.watchedMovies.slice(0, 5)

    //const lastWatchedMoviesFind = userLastFiveMovies.map((lastWatchedMovie) => movies.find(movie => movie.id == lastWatchedMovie.id))

    userLastFiveMovies?.forEach(WatchedMovie => {
        const foundMovie = movies.find(movie => movie.id == WatchedMovie.id)

        if (foundMovie) lastWatchedMovies.push(foundMovie)
    })

    const descendingOrder = (movieLower: Movie, movieHigher: Movie) => movieHigher.timesWatched - movieLower.timesWatched

    const topFiveCategories = (category: string) => {
        let moviesCategory = movies.filter(movie => movie.category === category)
        moviesCategory.sort(descendingOrder)
        moviesCategory = moviesCategory.slice(0, 5)

        return moviesCategory
    }

    const moviesFantasy = topFiveCategories("Fantasy")

    const moviesHorror = topFiveCategories("Horror")

    const moviesScifi = topFiveCategories("Sci-fi")

    const playMovie = (idMovie: string) => {
        if (!userLogged) return

        let updatedWatchedMovies: WatchedMovie[]
        let updatedUserLogged: User
        const movieIndex = userLogged.watchedMovies.findIndex(movie => movie.id === idMovie)

        if (movieIndex >= 0) {
            const movieWatched = userLogged.watchedMovies[movieIndex]
            movieWatched.timesWatched++

            updatedWatchedMovies = userLogged.watchedMovies.filter(movie => movie.id !== idMovie)
            updatedWatchedMovies.unshift(movieWatched)
        } else {
            updatedWatchedMovies = [{ id: idMovie, timesWatched: 1 }, ...userLogged.watchedMovies]
        }

        updatedUserLogged = { ...userLogged, watchedMovies: updatedWatchedMovies }
        updateUserLogged(updatedUserLogged)
        localStorage.setItem('userLogged', JSON.stringify(updatedUserLogged))

        const updatedUsers = users.map(user => user.id === userLogged.id ? userLogged : user)
        updateUsers(updatedUsers)
        localStorage.setItem('users', JSON.stringify(updatedUsers))


        const updatedMovies = movies.map(movie => movie.id === idMovie ? { ...movie, timesWatched: movie.timesWatched + 1 } : movie)
        updateMovies(updatedMovies)
        localStorage.setItem('movies', JSON.stringify(updatedMovies))

        navigate(`/play/${idMovie}`)
    }

    const metricsList: Metric[] = [
        {
            id: uuidv4(),
            title: "Last watched movies",
            movies: lastWatchedMovies
        },
        {
            id: uuidv4(),
            title: "Fantasy",
            movies: moviesFantasy
        },
        {
            id: uuidv4(),
            title: "Horror",
            movies: moviesHorror
        },
        {
            id: uuidv4(),
            title: "Sci-fi",
            movies: moviesScifi
        }
    ]

    let topUsers = users.sort((userLower, userHigher) =>
        userHigher.watchedMovies.reduce((previousValue, currentMovie) => previousValue + currentMovie.timesWatched, 0)
        -
        userLower.watchedMovies.reduce((previousValue, currentMovie) => previousValue + currentMovie.timesWatched, 0)
    )
    topUsers = topUsers.slice(0, 3)

    return (
        <MetricsContainer>
            <MetricContainer>
                <h3>Top users</h3>
                <UsersContainer>
                    {topUsers.map(user =>
                        <UserContainer key={user.id}>
                            <img src={user.picture} alt={`${user.name} picture`} />
                            <p>{user.name}</p>
                        </UserContainer>
                    )}
                </UsersContainer>
            </MetricContainer>
            {metricsList.map(metric =>
                <MetricContainer key={metric.id}>
                    {metric.movies.length &&
                        <>
                            <h3>{metric.title}</h3>
                            <MoviesContainer>
                                {metric.movies.map(movie =>
                                    <MovieContainer
                                        key={movie.id}
                                        onClick={() => playMovie(movie.id)}
                                    >
                                        <img src={movie.picture} alt={`${movie.title} picture`} />
                                        <p>{movie.title}</p>
                                    </MovieContainer>
                                )}
                            </MoviesContainer>
                        </>
                    }
                </MetricContainer>
            )}
        </MetricsContainer>
    )
}

export default Metrics

