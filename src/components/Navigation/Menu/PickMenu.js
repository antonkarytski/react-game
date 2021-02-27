import React from 'react'
import classesCss from "./PickMenu.module.scss";
import BackButton from "../Buttons/BackButton";
import PickItem from "./PickItem";

export default function PickMenu(props){

    const {
        menuClasses,
        itemClasses,
        navigationClasses,
        itemData,
        onBackHandler,
        previewType,
        children} = props;


    const menuClassesWrap = [classesCss.PickMenu];
    menuClassesWrap.push(menuClasses)

    const itemClassesWrap = [];
    itemClassesWrap.push(itemClasses)

    const navigationClassesWrap = [classesCss.NavigationBlock];
    navigationClassesWrap.push(navigationClasses)

    return(
        <div className={menuClassesWrap.join(" ")}>
            <div className={classesCss.PickWindow}>
                {
                    itemData.itemSet.map((item, index) => {
                        return(
                            <PickItem
                                selected = {index === itemData.currentIndex}
                                className = {itemClassesWrap.join(" ")}
                                pickItem = {itemData.selectHandler}
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