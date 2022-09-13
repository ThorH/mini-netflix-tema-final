import React, { createContext, useContext, useState } from "react";
import Movie from "../interfaces/Movie";

interface Props {
    children: React.ReactNode
}

interface MovieContextType {
    movies: Movie[],
    updateMovies: (users: Movie[]) => void,
}

const initialValue: MovieContextType = {
    movies: [],
    updateMovies: () => { },
}

const MovieContext = createContext<MovieContextType>(initialValue);

export const MovieProvider = ({ children }: Props) => {
    const [movies, setMovies] = useState<Movie[]>([])

    const updateMovies = (movies: Movie[]) => {
        setMovies(movies)
    }

    return (
        <MovieContext.Provider
            value={{
                movies,
                updateMovies
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}

export const useMovie = () => useContext(MovieContext)