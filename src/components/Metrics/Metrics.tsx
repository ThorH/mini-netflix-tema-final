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
    const { movies, updateMovies, countriesWatchedMovies, updateCountriesWatchedMovies } = useMovie()
    const navigate = useNavigate()

    //let userLastFiveMovies: WatchedMovie[] = []
    const lastWatchedMovies: Movie[] = []

    const userLastFiveMovies = userLogged?.watchedMovies.slice(0, 5)

    //const lastWatchedMoviesFind = userLastFiveMovies.map((lastWatchedMovie) => movies.find(movie => movie.id == lastWatchedMovie.id))

    userLastFiveMovies?.forEach(watchedMovie => {
        const foundMovie = movies.find(movie => movie.id == watchedMovie.id)

        if (foundMovie) lastWatchedMovies.push(foundMovie)
    })

    const topFiveCategories = (category: string) => {
        let moviesCategory = movies.filter(movie => movie.category === category)
        moviesCategory.sort((movieLower, movieHigher) => movieHigher.timesWatched - movieLower.timesWatched)
        moviesCategory = moviesCategory.slice(0, 5)

        return moviesCategory
    }

    const moviesFantasy = topFiveCategories("Fantasy")
    const moviesHorror = topFiveCategories("Horror")
    const moviesScifi = topFiveCategories("Sci-fi")

    const topCountry = (country: string) => {
        const topCountryMovies: Movie[] = []
        let countryWatchedMovies = countriesWatchedMovies.find(countryWatchedMovie => countryWatchedMovie.country === country)
        countryWatchedMovies?.watchedMovies.sort((watchedMovieLower, watchedMovieHigher) => watchedMovieHigher.timesWatched - watchedMovieLower.timesWatched)
        const topFiveWatchedMovies = countryWatchedMovies?.watchedMovies.slice(0, 5)

        topFiveWatchedMovies?.forEach(watchedMovie => {
            const foundMovie = movies.find(movie => movie.id == watchedMovie.id)

            if (foundMovie) topCountryMovies.push(foundMovie)
        })

        return topCountryMovies
    }

    const topBrazilMovies = topCountry("Brazil")
    const topUSAMovies = topCountry("USA")

    const metricsList: Metric[] = [
        {
            id: uuidv4(),
            title: "Last watched movies",
            movies: lastWatchedMovies
        },
        {
            id: uuidv4(),
            title: "Top movies watched in Brazil",
            movies: topBrazilMovies
        },
        {
            id: uuidv4(),
            title: "Top movies watched in USA",
            movies: topUSAMovies
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

    const playMovie = (idMovie: string) => {
        if (!userLogged) return

        const foundCountryWatchedMovies = countriesWatchedMovies.find(countryWatchedMovie => countryWatchedMovie.country === userLogged.country)

        if (foundCountryWatchedMovies) {
            let updatedCountryWatchedMovies = foundCountryWatchedMovies

            if (updatedCountryWatchedMovies.watchedMovies.some(watchedMovie => watchedMovie.id === idMovie)) {
                updatedCountryWatchedMovies = {
                    ...updatedCountryWatchedMovies,
                    watchedMovies: updatedCountryWatchedMovies.watchedMovies.map(watchedMovie =>
                        watchedMovie.id === idMovie ?
                            { ...watchedMovie, timesWatched: watchedMovie.timesWatched + 1 } :
                            watchedMovie
                    )
                }
            } else {
                updatedCountryWatchedMovies = { ...updatedCountryWatchedMovies, watchedMovies: [...updatedCountryWatchedMovies.watchedMovies, { id: idMovie, timesWatched: 1 }] }
            }

            const updatedCountriesWatchedMovies = countriesWatchedMovies.map(countryWatchedMovies => countryWatchedMovies.country === userLogged.country ? updatedCountryWatchedMovies : countryWatchedMovies)
            updateCountriesWatchedMovies(updatedCountriesWatchedMovies)
            localStorage.setItem('countriesWatchedMovies', JSON.stringify(updatedCountriesWatchedMovies))
        }

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

    return (
        <MetricsContainer>
            <MetricContainer data-testid="metricContainer">
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
                <MetricContainer key={metric.id} data-testid="metricContainer">
                    {metric.movies.length &&
                        <>
                            <h3>{metric.title}</h3>
                            <MoviesContainer>
                                {metric.movies.map(movie =>
                                    <MovieContainer
                                        key={movie.id}
                                        onClick={() => playMovie(movie.id)}
                                        data-testid="movieContainer"
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

