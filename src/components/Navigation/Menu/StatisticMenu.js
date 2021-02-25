import React from 'react'
import Button from "../Buttons/Button";
import classesCss from "../../../containers/Layouts/styles/Layouts.module.scss";

export default function StatisticMenu({onBack}){
    console.log(onBack)
    return(
        <div>
            <h2>Statistic</h2>
            <Button
                style={{fontSize: "15px"}}
                onClick={onBack}
                className={classesCss.SelectButton}
                valueDefault={"BACK"}
            />
        </div>
    )
}