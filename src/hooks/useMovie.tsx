import React, { createContext, useContext, useState } from "react";
import CountryWatchedMovies from "../interfaces/CountryWatchedMovies";
import Movie from "../interfaces/Movie";

interface Props {
    children: React.ReactNode
}

interface MovieContextType {
    movies: Movie[],
    updateMovies: (movies: Movie[]) => void,
    countriesWatchedMovies: CountryWatchedMovies[],
    updateCountriesWatchedMovies: (countriesWatchedMovies: CountryWatchedMovies[]) => void
}

const initialValue: MovieContextType = {
    movies: [],
    updateMovies: () => { },
    countriesWatchedMovies: [],
    updateCountriesWatchedMovies: () => { }
}

const MovieContext = createContext<MovieContextType>(initialValue);

export const MovieProvider = ({ children }: Props) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [countriesWatchedMovies, setCountriesWatchedMovies] = useState<CountryWatchedMovies[]>([])

    const updateMovies = (movies: Movie[]) => {
        setMovies(movies)
    }

    const updateCountriesWatchedMovies = (countriesWatchedMovies: CountryWatchedMovies[]) => {
        setCountriesWatchedMovies(countriesWatchedMovies)
    }

    return (
        <MovieContext.Provider
            value={{
                movies,
                updateMovies,
                countriesWatchedMovies,
                updateCountriesWatchedMovies
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}

export const useMovie = () => useContext(MovieContext)