import React from 'react'

export default function Audio({src, id, loop}) {

    return (
        <audio id={id} preload={"auto"} loop={loop || false}>
            <source src={process.env.PUBLIC_URL + src} type={"audio/mp3"} />
        </audio>
    )
}