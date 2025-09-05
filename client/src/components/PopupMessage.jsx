import React from 'react';

function PopupMessage({children}) {
    return (
        <div className={"absolute top-6 bg-primary-accent-3 popup-animation px-8 py-4 rounded-lg text-white font-semibold"}>
            <p className="">{children}</p>
        </div>
    );
}

export default PopupMessage;