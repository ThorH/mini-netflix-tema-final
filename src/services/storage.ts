import usersMock from '../../mocks/users.json';
import moviesMock from '../../mocks/movies.json';
import countriesWatchedMoviesMock from '../../mocks/countriesWatchedMovies.json';
import User from '../interfaces/User';
import Movie from '../interfaces/Movie';
import CountryWatchedMovies from '../interfaces/CountryWatchedMovies';

export const getUsersStorage = () => {
    let usersStorage = localStorage.getItem('users')
    let users: User[] = []

    if (!usersStorage) {
        localStorage.setItem('users', JSON.stringify(usersMock))
        usersStorage = localStorage.getItem('users')
    }

    if (usersStorage) users = JSON.parse(usersStorage)

    return users
}

export const getUserLogged = () => {
    const userLoggedStorage = localStorage.getItem('userLogged')

    if (userLoggedStorage) {
        const userLogged: User = JSON.parse(userLoggedStorage)

        return userLogged
    }
}

export const getMoviesStorage = () => {
    let moviesStorage = localStorage.getItem('movies')
    let movies: Movie[] = []

    if (!moviesStorage) {
        localStorage.setItem('movies', JSON.stringify(moviesMock))
        moviesStorage = localStorage.getItem('users')
    }

    if (moviesStorage) movies = JSON.parse(moviesStorage)

    return movies
}

export const getCountriesWatchedMovies = () => {
    let countriesWatchedMoviesStorage = localStorage.getItem('countriesWatchedMovies')
    let countriesWatchedMovies: CountryWatchedMovies[] = []

    if (!countriesWatchedMoviesStorage) {
        localStorage.setItem('countriesWatchedMovies', JSON.stringify(countriesWatchedMoviesMock))
        countriesWatchedMoviesStorage = localStorage.getItem('countriesWatchedMovies')
    }

    if (countriesWatchedMoviesStorage) countriesWatchedMovies = JSON.parse(countriesWatchedMoviesStorage)

    return countriesWatchedMovies
}