import React from 'react'
import Button from "./Button";

export default function BackButton({onBack, className}){

    return(
        <Button
            onClick = {onBack}
            className={className}
            valueDefault={"BACK"}
        />
    )
}