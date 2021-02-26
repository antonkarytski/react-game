import React from 'react'
import classesCss from "./PickMenu.module.scss";
import BackButton from "../Buttons/BackButton";
import PickItem from "./PickItem";

export default function PickMenu(props){

    const {
        menuClasses,
        itemClasses,
        navigationClasses,
        itemSet,
        currentItem,
        pickItemHandler,
        onBackHandler,
        previewType,
        children} = props;


    const menuClassesWrap = [classesCss.PickMenu];
    menuClassesWrap.push(menuClasses)

    const itemClassesWrap = [classesCss.PickItem];
    itemClassesWrap.push(itemClasses)

    const navigationClassesWrap = [classesCss.NavigationBlock];
    navigationClassesWrap.push(navigationClasses)

    return(
        <div className={menuClassesWrap.join(" ")}>
            <div className={classesCss.PickWindow}>
                {
                    itemSet.map((item, index) => {
                        return(
                            <PickItem
                                selected = {index === currentItem}
                                className = {itemClassesWrap.join(" ")}
                                pickItem = {pickItemHandler}
                                label = {item.label}
                                key = {index}
                                index = {index}
                                preview={item.preview}
                                previewType = {previewType} //full, card
                            />
                        )
                    })
                }
            </div>
            <div className={navigationClassesWrap.join(" ")}>
                <BackButton onBack={onBackHandler}/>
                {children}
            </div>
        </div>
    )
}