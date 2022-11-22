import { PlayContainer } from "./PlayStyle"
import { BackToHomeContainer } from "../../AppStyles"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Movie from "../../interfaces/Movie"
import { getMoviesStorage } from "../../services/storage"

function Play() {
    const { id } = useParams()
    const [movie, setMovie] = useState<Movie>()

    useEffect(() => {
        const movies = getMoviesStorage()

        const selectedMovie = movies.find(movie => movie.id === id)
        setMovie(selectedMovie)
    }, [])

    return (
        <PlayContainer data-testid="playContainer">
            <BackToHomeContainer>
                <Link to="/">
                    <BiArrowBack size={30} color="#ffffff" />
                </Link>
            </BackToHomeContainer>
            {movie &&
                <iframe width="900px"
                    height="500px"
                    src={movie.linkEmbed}
                    title={`${movie.title} - Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            }
        </PlayContainer>
    )
}

export default Play