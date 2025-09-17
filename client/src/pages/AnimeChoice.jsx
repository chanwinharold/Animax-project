import ThemeButton from "../components/ThemeButton.jsx";
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

function AnimeChoice() {
    const [Animes, setAnimes] = useState([])
    const [page, setPage] = useState(1)
    const lastElementRef = useRef(null)

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`)
                const resData = res.data['data']

                setAnimes(prevState => {
                    const existingID = new Set(prevState.map(anime => anime.mal_id))
                    const newAnimes = resData.filter(anime => !existingID.has(anime.mal_id))
                    return [...prevState, ...newAnimes]
                })
            } catch (e) { return e }
        }
        handleFetch().then(error => error && console.error(error))
    }, [page]);

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
                Animes.length !== 0 ? (
                    <div className={"w-full min-[768px]:grid min-[768px]:grid-cols-4 min-[768px]:justify-between flex flex-wrap justify-around"}>
                        {
                            Animes.map((anime, index) => (
                                <Anime
                                    key={`${anime.mal_id}-${anime.title.replace(' ', '')}`}
                                    image={anime.images.jpg.image_url}
                                    anime={anime.title}
                                    // ref={index === Animes.length - 1 ? lastElementRef : null}
                                />
                            ))
                        }
                        <div className={"inline-flex place-items-center"}>
                            <p onClick={() => setPage(x => x+1)} className={"cursor-pointer"}>Suivant</p>
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
