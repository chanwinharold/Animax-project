import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

function App() {

    return (
        <BrowserRouter>

            <Routes>
                <Route path={"/"} element={<Home />}></Route>
                <Route path={"/signup"} element={<Signup />}></Route>
                <Route path={"/login"} element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
