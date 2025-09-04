import React from 'react';

function PopupMessage({message}) {
    return (
        <div className={"absolute top-6 popup-animation px-8 py-4 rounded-lg text-white font-semibold"}>
            <p className="">{message}</p>
        </div>
    );
}

export default PopupMessage;