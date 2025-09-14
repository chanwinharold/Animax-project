import React, {useEffect, useState} from 'react';
import image from "/assets/images/demon_slayer.png"
import ThemeButton from "../components/ThemeButton.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

function GenreChoice() {
    const [Genres, setGenres] = useState(null)

    useEffect(() => {
        const handleFetch = async () => {
            return await axios.get('https://api.jikan.moe/v4/genres/anime')}
        handleFetch()
            .then(res => {
                setGenres(res.data['data'])
            })
    }, []);

    const handleSave = () => {
        return 0
    }

    return (
        <div className={"choice-wrapper max-lg:mt-16 grid place-items-center gap-y-12 p-8"}>
            <ThemeButton />

            <h1 className={"font-railey text-4xl text-center text-primary-accent-4 font-black"}>
                Choisissez au moins 5 de vos genres préférés
            </h1>
            {
                Genres ? (
                    <div className={"w-full min-[768px]:grid min-[768px]:place-items-center min-[768px]:grid-cols-4 min-[768px]:justify-between flex flex-wrap justify-around"}>
                        {
                            Genres.map(genre => (
                                <Genre
                                    key={`${genre.mal_id}-${genre.name.replace(' ', '')}`}
                                    image={image}
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
            {<Link to={"/choice-animes"}><SaveButton onSave={() => handleSave()}/></Link>}
        </div>
    );
}

export default GenreChoice;

function Genre({image, genre}) {

    return (
        <div className={"animate-choice w-fit inline-grid gap-y-4 place-items-center m-4"}>
            <img className={"self-center w-32 h-32 rounded-full object-cover"} src={image} alt={"genre d'anime"} />
            <span className={"text-center font-bold text-dark-neutral-100 dark:text-light-neutral-100"}>{genre}</span>
        </div>
    )
}

function SaveButton({onSave}) {
    return (
        <div onClick={onSave} className={"animate-btn-save fixed z-50 bg-[#A1A1A11F] bottom-0 right-0 left-0 h-18 inline-grid"}>
            <span className={"relative z-10 px-6 py-3 m-auto rounded-lg text-white bg-primary-accent-4 font-bold inline-grid place-items-center"}>Save</span>
        </div>
    );
}