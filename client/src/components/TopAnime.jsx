import React from 'react';
import playBtnUrl from "../assets/icons/icon-play-button.png";
import plusBtnUrl from "../assets/icons/icon-plus.svg";
import favoriteUrl from "../assets/icons/icon-favorite-inactive.svg";

function TopAnime({anime}) {
    return (
        <section className={`min-w-screen snap-start text-white relative min-sm:min-h-[500px] bg-cover bg-center py-16 px-28 max-md:px-8 flex flex-col min-lg:flex-row-reverse min-lg:justify-between`}>
            <img className={"absolute inset-0 opacity-90 w-full h-full z-1 object-cover object-center"} src={anime.images.jpg.large_image_url} alt=""/>

            <div className={"z-5 flex gap-x-4 h-fit"}>
                <span className={"uppercase text-3xl max-sm:text-xl font-bold"}>N°</span>
                <strong className={"text-8xl max-sm:text-6xl -mt-2"}>{anime.rank}</strong>
            </div>

            <article className={"z-5 max-w-2xl flex flex-col gap-y-4"}>
                <h1 className={"text-4xl max-w-[575px] max-sm:text-3xl font-bold uppercase my-4"}>{anime.title}</h1>
                <p className={"font-semibold max-w-[600px] max-h-[120px] overflow-y-auto"}>{anime.synopsis}</p>
                <div className={"flex gap-4 flex-wrap"}>
                    <button className={"btn-purple"}>See more <img width={24} height={24} src={`${playBtnUrl}`} alt="play button"/></button>
                    <button className={"btn-purple"}>My list <img width={24} height={24} src={`${plusBtnUrl}`} alt="plus button"/></button>
                    <img className={""} src={`${favoriteUrl}`} alt="a heart"/>
                </div>
                <div className={"flex items-center gap-x-4"}>
                    <div className={"flex gap-x-2 items-center hover:scale-110 duration-300"}>
                        <span className={"uppercase font-bold text-black text-xs bg-primary-note p-1 rounded-md"}>Note</span>
                        <em className={"text-primary-note font-black not-italic text-lg"}>{anime.score || "..."}</em>
                    </div>
                    <span className={"font-bold hover:scale-110 duration-300 border-2 rounded-md px-2 p-px"}>{anime.year || "..."}</span>
                    <span className={"font-bold hover:scale-110 duration-300"}>
                        {anime.genres.map(genre => (
                            genre.name + (anime.genres[anime.genres.length-1] === genre ? "" : " - ")
                        ))  || "..."}
                    </span>
                </div>
            </article>
        </section>
    );
}

export default TopAnime;