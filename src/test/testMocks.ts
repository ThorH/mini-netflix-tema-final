import User from "../interfaces/User"

export const mockUserLogged: User = {
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