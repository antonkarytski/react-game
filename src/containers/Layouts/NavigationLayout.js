import React from 'react'
import classes from './Layouts.module.scss'
import '../../styles/styles.scss'
import Counter from "../../components/Navigation/Counter/Counter";
import MenuButton from "../../components/Navigation/MenuButton";

const NavigationLayout = () => {
    return(
        <div className={classes.NavigationLayout}>
            <MenuButton className={"menu"} />
            <Counter className={"counter"} bestScore={false}/>
        </div>
    )
}

export default NavigationLayout