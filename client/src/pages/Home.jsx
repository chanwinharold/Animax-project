import React, {useEffect, useState} from 'react';
import axios from "axios";

import PopupMessage from "../components/PopupMessage.jsx";
import TopAnime from "../components/TopAnime.jsx";

function Home() {
    const [topAnime, setTopAnime] = useState(null)
    const [popupError, setPopupError] = useState(null)
    const [scrollWidth, setScrollWidth] = useState(window.innerWidth)

    const handleFetch = () => {
        try {
            const res = axios.get('https://api.jikan.moe/v4/top/anime')
            if (res) {return res} else {return null}
        } catch (e) {return e}
    }
    useEffect(() => {
        handleFetch()
            .then(res => {
                if (res) setTopAnime(res.data.data)
                else {
                    setPopupError("Failed to load data")
                    setTopAnime(null)
                }
            }).catch(() => {setPopupError("An error occurred ! Please refresh your browser.")
        })
    }, []);

    // Pour gérer l'affichage du popup d'erreur : Disparaît après 6s.
    useEffect(() => {
        setTimeout(() => {
            setPopupError(null)
        }, 6000)
    }, [popupError]);

    useEffect(() => {
        const container = document.getElementById("topAnimeContainer")
        if (container && scrollWidth && scrollWidth !== window.innerWidth * topAnime.length) {
            const timerInterval = setInterval(() => {
                container.scrollTo({left: scrollWidth, behavior:"smooth"})
                setScrollWidth(v => v + window.innerWidth)
            }, 5000)
            return () => clearInterval(timerInterval);
        }
    }, [topAnime, scrollWidth]);

    return topAnime ? (
        <main className={"text-dark-neutral-100 dark:text-light-neutral-100"}>
            {popupError ? <PopupMessage>{popupError}</PopupMessage>: null}
            <div id={"topAnimeContainer"}
                 onClick={() => setScrollWidth(null)}
                 className={"flex max-w-screen overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hidden"}
            >
                {
                    topAnime.map(anime => (
                        <TopAnime
                            key={`${anime.mal_id}-${anime.title.replace(' ', '')}`}
                            anime={anime}
                        />
                    ))
                }
            </div>

            <section className={"min-h-fit py-20 px-4 grid place-items-center"}>
                <div className={"canvas-area"}>
                    {
                        topAnime.map(anime => (
                            <img key={`${anime.mal_id}-${anime.title.replace(' ', '')}`} className={"polygon-image"} src={`${anime.images.jpg.image_url}`} alt="Anime image"/>
                        ))
                    }
                </div>
            </section>
        </main>
    ) : (
        <div className={"w-full min-h-screen inline-grid place-items-center m-auto"}>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    );
}

export default Home;