import ThemeButton from "../components/ThemeButton.jsx";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function AnimeChoice() {
    const [Animes, setAnimes] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const handleFetch = async () => {
            return await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`)}
        handleFetch()
            .then(res => {
                setAnimes(res.data['data'])
            })
    }, [page]);

    const handlePage = (increment) => {
        if (increment) {
            setPage(prevState => prevState+1)
        } else setPage(prevState => prevState>0 ? prevState-1 : 1)
        scrollTo(0, 0)
    }
    const handleSave = () => {
        return 0
    }

    return (
        <div className={"choice-wrapper max-lg:mt-16 grid place-items-center gap-y-12 p-8"}>
            <ThemeButton />

            <h1 className={"font-railey text-4xl text-center text-primary-accent-4 font-black"}>
                Choisissez au moins 5 de vos animés préférés
            </h1>
            {
                Animes ? (
                    <div className={"relative w-full min-[768px]:grid min-[768px]:grid-cols-4 min-[768px]:justify-between flex flex-wrap justify-around"}>
                        {
                            Animes.map(anime => (
                                <Anime
                                    key={`${anime.mal_id}-${anime.title.replace(' ', '')}`}
                                    image={anime.images.jpg.image_url}
                                    anime={anime.title}
                                />
                            ))
                        }
                        <div className={"inline-flex justify-between place-items-center"}>
                            <p onClick={() => handlePage(false)} className={"cursor-pointer"}>Précédent</p>
                            <p onClick={() => handlePage(true)} className={"cursor-pointer"}>Suivant</p>
                        </div>
                    </div>
                ) : (
                    <div className={"w-50 h-50 inline-grid place-items-center m-auto"}>
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                )
            }
            {<Link to={"/"}><SaveButton onSave={() => handleSave()} /></Link>}
        </div>
    );
}
export default AnimeChoice;

function Anime({image, anime}) {

    return (
        <div className={"animate-choice justify-self-center max-w-[155px] max-h-[195px] w-fit inline-grid gap-y-4 place-items-center m-4"}>
            <img className={"self-center w-32 h-32 rounded-full object-cover"} src={image} alt={"genre d'anime"} />
            <span className={"max-w-38 text-center font-bold text-dark-neutral-100 dark:text-light-neutral-100"}>{anime.length > 25 ? anime.slice(0, 25) + '...' : anime}</span>
        </div>
    )
}
function SaveButton({onSave}) {
    return (
        <div onClick={onSave} className={"animate-btn-save backdrop-blur-sm fixed z-50 bg-[#A1A1A11F] bottom-0 right-0 left-0 h-18 inline-grid"}>
            <span className={"relative z-10 px-6 py-3 m-auto rounded-lg text-white bg-primary-accent-4 font-bold inline-grid place-items-center"}>Save</span>
        </div>
    );
}
