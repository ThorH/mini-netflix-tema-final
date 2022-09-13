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

    let lastFiveMovies: WatchedMovie[] = []

    if (userLogged) lastFiveMovies = userLogged.watchedMovies.slice(0, 5)

    const lastWatchedMovies = lastFiveMovies?.map((lastWatchedMovie) => movies.find(movie => movie.id === lastWatchedMovie.id))

    const descendingOrder = (movieLower: Movie, movieHigher: Movie) => movieHigher.timesWatched - movieLower.timesWatched

    let topUsers = users.sort((userLower, userHigher) =>
        userHigher.watchedMovies.reduce((previousValue, currentMovie) => previousValue + currentMovie.timesWatched, 0)
        -
        userLower.watchedMovies.reduce((previousValue, currentMovie) => previousValue + currentMovie.timesWatched, 0)
    )
    topUsers = topUsers.slice(0, 3)

    let moviesFantasy = movies.filter(movie => movie.category === "Fantasy")
    moviesFantasy.sort(descendingOrder)
    moviesFantasy = moviesFantasy.slice(0, 5)

    let moviesHorror = movies.filter(movie => movie.category === "Horror")
    moviesHorror.sort(descendingOrder)
    moviesHorror = moviesHorror.slice(0, 5)

    let moviesScifi = movies.filter(movie => movie.category === "Sci-fi")
    moviesScifi.sort(descendingOrder)
    moviesScifi = moviesScifi.slice(0, 5)

    const PlayMovie = (idMovie: string) => {
        if (!userLogged) return

        let updatedWatchedMovies: WatchedMovie[]
        let updatedUserLogged: User

        if (userLogged.watchedMovies.some(movie => movie.id === idMovie)) {
            updatedWatchedMovies = userLogged.watchedMovies.map(watchedMovie => watchedMovie.id === idMovie ? { ...watchedMovie, timesWatched: watchedMovie.timesWatched + 1 } : watchedMovie)
            updatedUserLogged = { ...userLogged, watchedMovies: updatedWatchedMovies }
            updateUserLogged(updatedUserLogged)
        } else {
            updatedWatchedMovies = [{ id: idMovie, timesWatched: 1 }, ...userLogged.watchedMovies]
            updatedUserLogged = { ...userLogged, watchedMovies: updatedWatchedMovies }
            updateUserLogged(updatedUserLogged)
        }

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
            {lastWatchedMovies.length &&
                <MetricContainer>
                    <h3>Last watched movies</h3>
                    <MoviesContainer>
                        {lastWatchedMovies.map((movie, index) =>
                            <MovieContainer
                                key={index}
                                onClick={() => { if (movie) PlayMovie(movie.id) }}
                            >
                                <img src={movie?.picture} alt={`${movie?.title} picture`} />
                                <p>{movie?.title}</p>
                            </MovieContainer>
                        )}
                    </MoviesContainer>
                </MetricContainer>
            }
            {metricsList.map(metric =>
                <MetricContainer key={metric.id}>
                    <h3>{metric.title}</h3>
                    <MoviesContainer>
                        {metric.movies.map(movie =>
                            <MovieContainer
                                key={movie.id}
                                onClick={() => PlayMovie(movie.id)}
                            >
                                <img src={movie.picture} alt={`${movie.title} picture`} />
                                <p>{movie.title}</p>
                            </MovieContainer>
                        )}
                    </MoviesContainer>
                </MetricContainer>
            )}
        </MetricsContainer>
    )
}

export default Metrics

