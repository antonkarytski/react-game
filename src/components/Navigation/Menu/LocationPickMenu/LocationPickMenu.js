import React from 'react'
import Button from "../../Buttons/Button";
import classesCss from "./LocationPick.module.scss"
import LocationPickItem from "./LocationPickItem";

export default function LocationPickMenu({onBack, locationSet, selectLocation, currentLocation}){
    return(
        <div className={[classesCss.MenuModule, classesCss.LocationPickMenu].join(" ")}>
            <div className={classesCss.PickWindow}>
                {
                    locationSet.map((location, index) => {
                        if( index === currentLocation){
                            return(
                                <LocationPickItem
                                    selected = {true}
                                    label = {location.label}
                                    key = {index}
                                    index = {index}
                                    preview={location.preview}
                                />
                            )
                        }
                        return(
                            <LocationPickItem
                                selectLocation={selectLocation}
                                label = {location.label}
                                key = {index}
                                index = {index}
                                preview={location.preview}
                            />
                        )
                    })
                }
            </div>
            <div className={classesCss.NavigationBlock}>
                <Button
                    style={{fontSize: "15px"}}
                    onClick={onBack}
                    valueDefault={"BACK"}
                />
            </div>


        </div>
    )
}