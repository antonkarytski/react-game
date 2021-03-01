import React from 'react'
import classesCss from './styles/Layouts.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'


function InfoLayout() {
    return (
        <div className={classesCss.InfoLayout}>
            <p><a href={"#controls"}>Controls</a></p>
            {/*<p><a href={"#about"}>About</a></p>*/}
            <p><a href={"#credits"}>Credits</a></p>
            <div id={"controls"}>
                <h3>Controls</h3>
                <div className={classesCss.InfoRow}>
                    <div className={classesCss.ControlBlock}>
                        <img alt="swipeUp" src={process.env.PUBLIC_URL + "assets/helpers/swipeJump.png"}/>
                        Jump
                    </div>
                    <div className={classesCss.ControlBlock}>
                        <img alt="swipeSides" src={process.env.PUBLIC_URL + "assets/helpers/swipeMove.png"}/>
                        Move right and left
                    </div>
                    <div className={classesCss.ControlBlock}>
                        <img alt="swipeDown" src={process.env.PUBLIC_URL + "assets/helpers/swipeSit.png"}/>
                        Sit down
                    </div>
                </div>
                <div className={classesCss.InfoRow}>
                    <div className={classesCss.ControlBlock} style={{width: '40%', margin: "auto"}}>
                        <img alt="buttons" src={process.env.PUBLIC_URL + "assets/helpers/buttons.png"}/>
                        Jump
                    </div>

                </div>
            </div>
            {/*<div id={"about"}>*/}
            {/*    <h3>About</h3>*/}

            {/*</div>*/}
            <div id={"credits"}>
                <h3>Credits</h3>
                <div className={classesCss.InfoRow}>
                    <div className={classesCss.Credits}>
                        <div>
                            <a href={"https://rs.school/js/"}>
                                <img alt="Rss" src={process.env.PUBLIC_URL + "assets/helpers/rs_school_js.svg"}/>
                            </a>
                        </div>
                        <div>Author:
                            <a href={"https://github.com/heyheyjude"}> <FontAwesomeIcon icon={faGithub}/> Anton Karytski</a>
                        </div>
                        <div>
                            2021. Gybopic sosat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoLayout