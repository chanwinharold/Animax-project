import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import GenreChoice from "./pages/GenreChoice.jsx";
import AnimeChoice from "./pages/AnimeChoice.jsx";

function App() {

    return (
        <BrowserRouter>

            <Routes>
                <Route path={"/"} element={<Home />}></Route>
                <Route path={"/signup"} element={<Signup />}></Route>
                <Route path={"/login"} element={<Login />}></Route>
                <Route path={"/choice-genres"} element={<GenreChoice />}></Route>
                <Route path={"/choice-animes"} element={<AnimeChoice />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
