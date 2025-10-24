import React, {useEffect, useState} from 'react';
import axios from "axios";

import favoriteUrl from "../assets/icons/icon-favorite-inactive.svg"
import playBtnUrl from "../assets/icons/icon-play-button.png"
import plusBtnUrl from "../assets/icons/icon-plus.svg"

import animeBgUrl from "/assets/images/background.jpg"
import clipUrl from "/assets/images/demon_slayer.png"
import PopupMessage from "../components/PopupMessage.jsx";

function Home() {
    const [topAnime, setTopAnime] = useState(null)
    const [popupError, setPopupError] = useState(null)

    useEffect(() => {
        handleFetch()
            .then(res => {
                if (res) setTopAnime(res.data.data)
                else setPopupError("Failed to load data")
            }).catch(() => {
                setPopupError("An error occurred ! Please refresh your browser.")
            })
    }, []);

    // Pour gérer l'affichage du popup d'erreur : Disparaît après 6s.
    useEffect(() => {
        setTimeout(() => {
            setPopupError(null)
        }, 6000)
    }, [popupError]);

    const handleFetch = () => {
        try {
            const res = axios.get('https://api.jikan.moe/v4/top/anime')
            if (res) return res
            else return null
        } catch (e) {
            return e
        }
    }

    return (
        <main className={"text-dark-neutral-100 dark:text-light-neutral-100"}>
            {popupError ? <PopupMessage>{popupError}</PopupMessage>: null}
            <section className={`text-white relative min-sm:h-[500px] bg-cover bg-center py-16 px-28 max-md:px-8 flex flex-wrap-reverse min-md:justify-between`}>
                <img className={"absolute inset-0 opacity-90 w-full h-full z-1 object-cover object-center"} src={animeBgUrl} alt=""/>

                <article className={"z-5 max-w-2xl flex flex-col gap-y-4"}>
                    <h1 className={"text-4xl max-sm:text-3xl font-bold uppercase my-4"}>Demon Slayer</h1>
                    <p className={"font-semibold"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aspernatur
                        dicta dolor esse, ex magni maxime minima molestias nam nostrum quas soluta
                        tempore? Ea iure neque obcaecati perferendis quod! Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Dicta doloribus, repellat?</p>
                    <div className={"flex gap-4 flex-wrap"}>
                        <button className={"btn-purple"}>See more <img width={24} height={24} src={`${playBtnUrl}`} alt="play button"/></button>
                        <button className={"btn-purple"}>My list <img width={24} height={24} src={`${plusBtnUrl}`} alt="plus button"/></button>
                        <img className={""} src={`${favoriteUrl}`} alt="a heart"/>
                    </div>
                    <div className={"flex items-center gap-x-4"}>
                        <div className={"flex gap-x-2 items-center hover:scale-110 duration-300"}>
                            <span className={"uppercase font-bold text-black text-xs bg-primary-note p-1 rounded-md"}>Note</span>
                            <em className={"text-primary-note font-black not-italic text-lg"}>7.7</em>
                        </div>
                        <span className={"font-bold hover:scale-110 duration-300 border-2 rounded-md px-2 p-px"}>2018</span>
                        <span className={"font-bold hover:scale-110 duration-300"}>Action - Samurai</span>
                    </div>
                </article>

                <div className={"z-5 flex gap-x-4"}>
                    <span className={"uppercase text-3xl max-sm:text-xl font-bold"}>N°</span><strong className={"text-8xl max-sm:text-6xl -mt-2"}>1</strong>
                </div>
            </section>

            <section className={"min-h-fit py-20 px-4 grid place-items-center"}>
                <div className={"canvas-area"}>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                    <img className={"polygon-image"} src={`${clipUrl}`} alt="Anime image"/>
                </div>
            </section>
        </main>
    );
}

export default Home;