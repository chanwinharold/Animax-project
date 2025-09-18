import React, {useEffect, useState} from 'react';
import ThemeButton from "../components/ThemeButton.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function GenreChoice() {
    const [Genres, setGenres] = useState(null)
    const [isEnough, setIsEnough] = useState(true)
    const Navigate = useNavigate()

    useEffect(() => {
        const handleFetch = async () => {
            return await axios.get('https://api.jikan.moe/v4/genres/anime')}
        handleFetch()
            .then(res => {
                setGenres(res.data['data'])
            })
    }, []);

    const handleSave = () => {
        Navigate("/choice-animes")
    }

    return (
        <div className={"choice-wrapper max-lg:mt-16 grid place-items-center gap-y-12 p-8"}>
            <ThemeButton />

            <h1 className={"font-railey text-4xl text-center text-primary-accent-4 font-black"}>
                Choisissez au moins 5 de vos genres préférés
            </h1>
            {
                Genres ? (
                    <div className={"w-full flex gap-8 flex-wrap justify-center"}>
                        {
                            Genres.map(genre => (
                                <Genre
                                    key={`${genre.mal_id}-${genre.name.replace(' ', '')}`}
                                    genre={genre.name}
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

export default GenreChoice;

function Genre({genre}) {

    return (
        <div tabIndex={0} className={"hover:scale-110 hover:opacity-70 duration-400 cursor-pointer animate-choice dark:bg-[url(/assets/images/bg-genre-dark.jpeg)] bg-[url(/assets/images/bg-genre-light.jpeg)] justify-self-center w-48 h-80 rounded-lg shadow-xl border-5 inline-grid gap-y-4 place-items-center m-4"}>
            <span className={"text-neon uppercase text-xl px-8 text-wrap max-w-50 wrap-break-word text-center font-bold"}>
                {genre}
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