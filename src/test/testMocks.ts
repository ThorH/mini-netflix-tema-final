import User from "../interfaces/User"
import Movie from "../interfaces/Movie"
import CountryWatchedMovies from "../interfaces/CountryWatchedMovies"

interface LocalStorage {
    users: User[],
    userLogged?: User,
    movies: Movie[],
    countriesWatchedMovies: CountryWatchedMovies[]
}

export const localStorageMock = (() => {
    let store: LocalStorage = {
        users: [],
        movies: [],
        userLogged: undefined,
        countriesWatchedMovies: []
    };

    return {
        getItem(key: string) {
            const storeFound = store[key as keyof typeof store]

            return storeFound ? String(storeFound) : undefined
        },

        setItem(key: string, value: any) {
            store[key as keyof typeof store] = value
        },

        clear() {
            store = {
                users: [],
                movies: [],
                userLogged: undefined,
                countriesWatchedMovies: []
            }
        },

        removeItem(key: string) {
            delete store[key as keyof typeof store]
        },

        getAll() {
            return String(store)
        },
    }
})()

export const mockUser: User = {
    id: "1942c8e0-3bca-463b-831e-9851489e81ed",
    name: "Thor Haubert",
    email: "haubertthor@gmail.com",
    password: "senhadothor",
    country: "Brazil",
    picture: "/mockImages/users/thor.jpg",
    watchedMovies: [
        {
            id: "e1f79c82-9539-4401-a767-eb0be373292a",
            timesWatched: 3
        },
        {
            id: "d41c2f55-85c6-4364-91c7-2571ad51296a",
            timesWatched: 4
        },
        {
            id: "4a2db5ed-4008-4acf-94e9-11a2ba01ead2",
            timesWatched: 2
        }
    ]
}

export const mockMovie: Movie = {
    id: "e1f79c82-9539-4401-a767-eb0be373292a",
    title: "Senhor dos anéis: A sociedade do anel",
    picture: "/mockImages/movies/senhordosaneisasociedadedoanel.jpg",
    category: "Fantasy",
    timesWatched: 258,
    durationPerSecond: 10680,
    linkEmbed: "https://www.youtube.com/embed/0i86oM1nHjM"
}

export const mockCountryWatchedMovies: CountryWatchedMovies = {
    country: "Brazil",
    watchedMovies: [
        {
            "id": "e1f79c82-9539-4401-a767-eb0be373292a",
            "timesWatched": 3
        },
        {
            "id": "d41c2f55-85c6-4364-91c7-2571ad51296a",
            "timesWatched": 4
        },
        {
            "id": "4a2db5ed-4008-4acf-94e9-11a2ba01ead2",
            "timesWatched": 2
        },
        {
            "id": "77ea3a32-cea0-422b-bda7-ec4336941630",
            "timesWatched": 2
        },
        {
            "id": "9aba2ed4-fb7c-42b1-b794-3ebbde21ad75",
            "timesWatched": 1
        },
        {
            "id": "802c186d-a839-4e16-ba3a-1a73e3d7bafb",
            "timesWatched": 2
        },
        {
            "id": "f62fa517-f7a4-4165-88dc-28b5f6ab5366",
            "timesWatched": 1
        }

    ]
}