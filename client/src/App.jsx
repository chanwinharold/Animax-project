import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {

    return (
        <BrowserRouter>
            <Signup />
            {/*<Login />*/}
        </BrowserRouter>
    );
}

export default App
