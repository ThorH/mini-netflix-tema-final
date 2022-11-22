import { MovieProvider, useMovie } from '../hooks/useMovie'
import { renderHook, act } from '@testing-library/react-hooks'
import { mockMovie, mockCountryWatchedMovies } from '../test/testMocks'

interface Props {
    children: React.ReactNode
}

const wrapper = ({ children }: Props) => <MovieProvider>{children}</MovieProvider>

describe('Movie hooks tests', () => {

    it('Should update movies', () => {
        const { result } = renderHook(() => useMovie(), { wrapper })

        act(() => {
            result.current.updateMovies([mockMovie])
        })

        expect(result.current.movies).toContain(mockMovie)
    })

    it('Should update countriesWatchedMovies', () => {
        const { result } = renderHook(() => useMovie(), { wrapper })

        act(() => {
            result.current.updateCountriesWatchedMovies([mockCountryWatchedMovies])
        })

        expect(result.current.countriesWatchedMovies).toContain(mockCountryWatchedMovies)
    })
})