import React from 'react'
import PickItem from "./PickItem";
import InnerMenu from "../InnerMenu";

export default function PickMenu(props) {
    const {
        menuClasses,
        itemClasses,
        navigationClasses,
        itemData,
        onBackHandler,
        previewType
    } = props;

    const itemClassesWrap = [];
    itemClassesWrap.push(itemClasses)

    return (
        <InnerMenu
            menuClasses={menuClasses}
            navigationClasses={navigationClasses}
            onBackHandler={onBackHandler}
        >
            {
                itemData.itemSet.map((item, index) => {
                    return (
                        <PickItem
                            selected={index === itemData.currentIndex}
                            className={itemClassesWrap.join(" ")}
                            selectHandler={() => itemData.selectHandler(index)}
                            label={item.label}
                            key={index}
                            index={index}
                            preview={item.preview}
                            previewType={previewType} //full, card
                        />
                    )
                })
            }
        </InnerMenu>
    )
}