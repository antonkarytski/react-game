import React from 'react'
import InnerMenu from "./InnerMenu";
import classesCss from "./Menu.module.scss"

export default function StatisticMenu({onBackHandler, statistic}) {

    const scoreData = {

    }
    if (statistic.scoreHistory) {
        if (typeof statistic.scoreHistory === "string") {
            statistic.scoreHistory = statistic.scoreHistory.split(",");
        }
        scoreData.bestScore = '0'.repeat(8 - (statistic.bestScore + '').length) + statistic.bestScore
        scoreData.scoreHistory = statistic.scoreHistory.map((score) => {
            return '0'.repeat(8 - (score + '').length) + score
        })
    } else {
        scoreData.noGame = "No one game played yet"
    }

    return (
        <InnerMenu
            menuClasses={classesCss.StatisticMenu}
            onBackHandler={onBackHandler}
        >
            {scoreData.bestScore ?
                <div className={classesCss.BestScore}>BEST SCORE: {scoreData.bestScore}</div> : null
            }
            <div  className={classesCss.ScoreHistory}>
            {scoreData.scoreHistory ?

                scoreData.scoreHistory.map((gameScore, index) => {
                    return <div key={"scoreValue"+index}>{index+1}{'.'.repeat(35 - ((index+1 + "").length)*3)}{gameScore}</div>
                })
                :<div>{scoreData.noGame}</div>
            }
            </div>
        </InnerMenu>
    )
}