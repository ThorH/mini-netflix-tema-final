import {
    getUserLogged,
    getUsersStorage,
    getMoviesStorage,
    getCountriesWatchedMovies
} from './storage'
import {
    mockUser,
    mockMovie,
    mockCountryWatchedMovies,
    localStorageMock
} from '../test/testMocks'

Object.defineProperty(window, "localStorage", { value: localStorageMock })

describe("localStorage functions tests", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it("Should getUsersStorage function return users", () => {
        expect(getUsersStorage()).toEqual(
            expect.arrayContaining([
                expect.objectContaining(mockUser)
            ])
        )
    })

    it("Should getUserLogged function return userLogged", () => {
        localStorage.setItem("userLogged", JSON.stringify(mockUser))
        expect(getUserLogged()).toEqual(expect.objectContaining(mockUser))
    })

    it("Should getUserLogged function return undefined", () => {
        expect(getUserLogged()).toBeUndefined()
    })

    it("Should getMoviesStorage function return movies", () => {
        getMoviesStorage()
        expect(getMoviesStorage()).toEqual(
            expect.arrayContaining([
                expect.objectContaining(mockMovie)
            ])
        )
    })

    it("Should getCountriesWatchedMovies function return countriesWatchedMovies", () => {
        expect(getCountriesWatchedMovies()).toEqual(
            expect.arrayContaining([
                expect.objectContaining(mockCountryWatchedMovies)
            ])
        )
    })
})