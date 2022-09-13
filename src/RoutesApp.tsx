import { Routes, Route } from "react-router-dom";
import MainMovieSelection from "./pages/MainMovieSelection/MainMovieSelection";
import Play from "./pages/Play/Play";
import Profile from "./pages/Profile/Profile";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<MainMovieSelection />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/play/:id" element={<Play />} />
        </Routes>
    )
}

export default RoutesApp