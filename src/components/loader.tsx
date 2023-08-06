import React from 'react';

export function Loader () {
    return (
        <div className="ml-[50%]">
            <img
                className={"w-[28px] h-[30px]"}
                alt="back"
                src={require("../assets/images/loader.gif")}
            />
        </div>
    )
}