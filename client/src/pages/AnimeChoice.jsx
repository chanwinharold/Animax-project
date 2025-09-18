import ThemeButton from "../components/ThemeButton.jsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useIntersection} from "@mantine/hooks";

function AnimeChoice() {
    const [Animes, setAnimes] = useState([])
    const [page, setPage] = useState(1)
    const [lastElementId, setLastElementId] = useState(null)
    const lastAnimeRef = useRef(null)
    const [isEnough, setIsEnough] = useState(true)
    const Navigate = useNavigate()

    const {ref, entry} = useIntersection({
        root: lastAnimeRef.current,
        threshold: 0
    })

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`)
                const resData = res.data['data']

                setLastElementId(resData.at(-5).mal_id)
                setAnimes(prevState => {
                    const existingID = new Set(prevState.map(anime => anime.mal_id))
                    const newAnimes = resData.filter(anime => !existingID.has(anime.mal_id))
                    return [...prevState, ...newAnimes]
                })
            } catch (e) { return e }
        }
        handleFetch().then(error => error && console.error(error))
    }, [page]);

    useEffect(() => {
        entry && entry.isIntersecting && setPage(v => v + 1)
    }, [entry]);

    const handleSave = () => {
        Navigate("/")
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
                            Animes.map(anime => (
                                <Anime
                                    key={`${anime.mal_id}-${anime.title.replace(' ', '')}`}
                                    id={anime.mal_id}
                                    image={anime.images.jpg.image_url}
                                    anime={anime.title}
                                    animeRef={anime.mal_id === lastElementId ? ref : null}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className={"w-50 h-50 inline-grid place-items-center m-auto"}>
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                )
            }
            {isEnough ? <SaveButton onSave={() => handleSave()}/> : null}
        </div>
    );
}
export default AnimeChoice;


function Anime({id, image, anime, animeRef}) {
    return (
        <div tabIndex={0} id={id} ref={animeRef} className={"animate-choice cursor-pointer justify-self-center max-w-[155px] max-h-[195px] w-fit inline-grid gap-y-4 place-items-center m-4"}>
            <img className={"hover:scale-110 duration-500 self-center w-32 h-32 rounded-full object-cover"} src={image} alt={"genre d'anime"} />
            <span className={"max-w-38 text-center font-bold text-dark-neutral-100 dark:text-light-neutral-100"}>
                {anime.length > 25 ? anime.slice(0, 25) + '...' : anime}
            </span>
        </div>
    )
}
function SaveButton({onSave}) {
    return (
        <div className={"animate-btn-save backdrop-blur-sm fixed z-50 bg-[#A1A1A11F] bottom-0 right-0 left-0 h-18 inline-grid"}>
            <span onClick={onSave} className={"cursor-pointer relative z-10 px-6 py-3 m-auto rounded-lg text-white bg-primary-accent-4 font-bold inline-grid place-items-center"}>
                Save
            </span>
        </div>
    );
}
