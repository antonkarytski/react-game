import React from 'react'
import classesCss from './LocationPick.module.scss'

export default function LocationPickItem({index, selected, label, preview, selectLocation}){

    preview = {backgroundImage : `url(${process.env.PUBLIC_URL + preview})`}

    const onClickHandler = () => {
        if(!selected && selectLocation){
            selectLocation(index)
        }
    }

    const classes = [classesCss.LocationPickItem]
    if(selected) classes.push(classesCss.Selected)

    return(
        <div
            style={preview}
            onClick={() => onClickHandler()}
            className={classes.join(' ')}
        >
            <div className={classesCss.Preview}/>
            <span>{label}</span>
        </div>
    )
}