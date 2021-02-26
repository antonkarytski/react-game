import React from 'react'
import classesCss from './PickMenu.module.scss'

export default function PickMenu(props){

    const {
        selected,
        className,
        pickItem,
        label,
        index,
        preview,
        previewType
        } = props;

    const previewImage = {backgroundImage : `url(${process.env.PUBLIC_URL + preview})`}

    const onClickHandler = () => {
        if(!selected){
            pickItem(index)
        }
    }

    const classes = [classesCss.PickItem];
    classes.push(className);
    if(selected) classes.push(classesCss.Selected, "selected")

    return(
        <div
            style={previewType === "full"? previewImage : null}
            onClick={() => onClickHandler()}
            className={classes.join(' ')}
        >
            <div
                style={previewType === "card"? previewImage : null}
                className={classesCss.Preview}
            />
            <span className={"label"}>{label}</span>
        </div>
    )
}