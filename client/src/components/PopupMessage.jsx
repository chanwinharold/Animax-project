import React from 'react';

function PopupMessage({children}) {
    window.scroll({top: 0});
    return (
        <div className={"absolute top-6 left-1/2 -translate-x-1/2 bg-primary-accent-3 popup-animation px-8 py-4 rounded-lg text-white font-semibold text-center"}>
            <p className="">{children}</p>
        </div>
    );
}

export default PopupMessage;