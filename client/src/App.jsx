import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import GenreChoice from "./pages/GenreChoice.jsx";
import AnimeChoice from "./pages/AnimeChoice.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Recommandation from "./pages/Recommandation.jsx";
import Trending from "./pages/Trending.jsx";
import Community from "./pages/Community.jsx";
import Favorite from "./pages/Favorite.jsx";
import Bookmark from "./pages/Bookmark.jsx";
import WatchList from "./pages/WatchList.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/recommandation",
                element: <Recommandation />
            },
            {
                path: "/trending",
                element: <Trending />
            },
            {
                path: "/community",
                element: <Community />,
            },
            {
                path: "/favorite",
                element: <Favorite />
            },
            {
                path: "/bookmark",
                element: <Bookmark />
            },
            {
                path: "/watchlist",
                element: <WatchList />,
            }
        ],
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/choice-genres",
        element: <GenreChoice />
    },
    {
        path: "/choice-animes",
        element: <AnimeChoice />
    }
]);

function Layout() {
    return (
        <>
            <Sidebar />
            <Navbar />
            <Outlet/>
            <Footer />
        </>
    )
}

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App
