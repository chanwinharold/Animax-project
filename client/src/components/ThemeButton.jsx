import React, {useEffect, useState} from 'react';

function ThemeButton() {
    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme]);

    document.documentElement.setAttribute('data-theme', theme || 'light')
    const handleTheme = (e) => {
        if (e.target.checked) {
            setTheme('dark')
        } else setTheme('light')
    }

    return (
        <label className={"btn-theme w-26 h-12 flex justify-between items-center px-1 rounded-full bg-neutral-100 dark:bg-neutral-900"}>
            <input value={theme} onChange={handleTheme} className={"hidden"} type={"checkbox"} name={"theme-switcher"}/>
            <span className={"bg-light-wrapper dark:bg-neutral-900 rounded-full w-10 h-10 inline-grid place-items-center"}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path className={"fill-primary-accent-4"} d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"/><path className={"fill-primary-accent-4"} fillRule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75" clipRule="evenodd"/><path className={"fill-primary-accent-4"} d="M4.398 4.398a.75.75 0 0 1 1.061 0l.393.393a.75.75 0 0 1-1.06 1.06l-.394-.392a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.392.393a.75.75 0 0 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.06 0m-1.453 13.748a.75.75 0 0 1 1.061 0l.393.393a.75.75 0 0 1-1.06 1.06l-.394-.392a.75.75 0 0 1 0-1.06m-12.295 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.06 0" opacity=".5"/></svg></span>
            <span className={"dark:bg-neutral-950 rounded-full w-10 h-10 inline-grid place-items-center"}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path className={"dark:fill-white"} d="M19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.48.48 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.48.48 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.48.48 0 0 1-.273-.274zM16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.48.48 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.48.48 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.48.48 0 0 1-.272-.273z"/><path className={"dark:fill-white"} d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"/></svg></span>
        </label>
    );
}

export default ThemeButton;