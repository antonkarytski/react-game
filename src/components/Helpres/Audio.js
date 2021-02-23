import React from 'react'

export default function Audio({src, id}) {

    return (
        <audio id={id} preload={"auto"} loop>
            <source src={`${process.env.PUBLIC_URL + src}`} type={"audio/mp3"} />
        </audio>
    )
}