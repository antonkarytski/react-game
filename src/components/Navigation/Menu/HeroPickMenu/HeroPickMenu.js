import React from 'react'
import Button from "../../Buttons/Button";
import classesCss from './HeroPick.module.scss'
import HeroPickItem from "./HeroPickItem";

export default function HeroPickMenu({onBack, heroes, selectHero, currentHero}){
    return(
        <div className={[classesCss.MenuModule, classesCss.HeroPickMenu].join(" ")}>
            <div className={classesCss.PickWindow}>
            {
                heroes.map((hero, index) => {
                    if( index === currentHero){
                        return(
                            <HeroPickItem
                                selected = {true}
                                label = {hero.label}
                                key = {index}
                                index = {index}
                                preview={hero.preview}
                            />
                        )
                    }
                    return(
                        <HeroPickItem
                            selectHero={selectHero}
                            label = {hero.label}
                            key = {index}
                            index = {index}
                            preview={hero.preview}
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