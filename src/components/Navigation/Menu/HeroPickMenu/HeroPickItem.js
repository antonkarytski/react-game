import React from 'react'
import classesCss from './HeroPick.module.scss'

export default function HeroPickItem({index, selected, label, preview, selectHero}){

    preview = {backgroundImage : `url(${process.env.PUBLIC_URL + preview})`}

    const onClickHandler = () => {
        if(!selected && selectHero){
            selectHero(index)
        }
    }

    const classes = [classesCss.HeroPickItem]
    if(selected) classes.push(classesCss.Selected)

    return(
        <div
            onClick={() => onClickHandler()}
            className={classes.join(' ')}
        >
            <div className={classesCss.Preview} style={preview}/>
            <span>{label}</span>
        </div>
    )
}