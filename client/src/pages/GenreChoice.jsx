import React from 'react';
import image from "/assets/images/demon_slayer.png"
import ThemeButton from "../components/ThemeButton.jsx";
import {Link} from "react-router-dom";

function GenreChoice() {

    return (
        <div className={"choice-wrapper max-lg:mt-16 grid place-items-center gap-y-12 p-8"}>
            <ThemeButton />
            <h1 className={"font-railey text-4xl text-center text-primary-accent-4 font-black"}>
                Choisissez au moins 5 de vos genres préférés
            </h1>
            <Link className={"text-red-500"} to={"/choice-animes"}>Choix Animés</Link>
            <div className={"w-full min-[768px]:grid min-[768px]:place-items-center min-[768px]:grid-cols-4 min-[768px]:justify-between flex flex-wrap justify-around"}>
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
                <Genre image={image} genre={"Fantastique guerre viking"} />
            </div>
        </div>
    );
}

function Genre({image, genre}) {

    return (
        <div className={"w-fit inline-grid gap-y-4 place-items-center m-4"}>
            <img className={"self-center w-32 h-32 rounded-full object-cover"} src={image} alt={"genre d'anime"} />
            <span className={"text-center font-bold text-dark-neutral-100 dark:text-light-neutral-100"}>{genre}</span>
        </div>
    )
}

export default GenreChoice;