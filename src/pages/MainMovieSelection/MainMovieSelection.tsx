import { useEffect } from "react"
import {
    MainMovieSelectionContainer,
    UserLoggedContainer,
} from "./MainMovieSelectionStyle"
import { useUser } from "../../hooks/useUser"
import { useMovie } from "../../hooks/useMovie"
import { getMoviesStorage } from "../../services/storage"
import { Link } from "react-router-dom"
import Metrics from "../../components/Metrics/Metrics"

function MainMovieSelection() {
    const { userLogged, updateUserLogged } = useUser()
    const { updateMovies } = useMovie()

    useEffect(() => {
        updateMovies(getMoviesStorage())
    }, [])

    const logout = () => {
        localStorage.removeItem('userLogged')
        updateUserLogged(undefined)
    }

    return (
        <MainMovieSelectionContainer>
            <UserLoggedContainer>
                <Link
                    data-test-target="profileLink"
                    to="/profile"
                >
                    <img src={userLogged?.picture} />
                </Link>
                <p
                    data-test-target="logout"
                    onClick={() => logout()}>
                    Logout
                </p>
            </UserLoggedContainer>
            <Metrics />
        </MainMovieSelectionContainer>
    )
}

export default MainMovieSelection