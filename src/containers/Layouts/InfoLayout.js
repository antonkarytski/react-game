import React from 'react'
import classesCss from './styles/Layouts.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'


function InfoLayout() {
    return (
        <div className={classesCss.InfoLayout}>
            <p><a href={"#controls"}>Controls</a></p>
            <p><a href={"#about"}>About</a></p>
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
            <div id={"about"}>
                <h3>About</h3>
                <ul>
                    <li>2. Анимации: перемещение персонажа, движение перпятствий и бэкграунда,
                        анимированы некоторые кнопки (пуск, рестарт)</li>
                    <li>4. Звуки и музыка: Регулеровка громкости, кнопка включение/отключения звука.
                        Могут быть заданы звуковые эффект для начала раунда и прыжка</li>
                    <li>5. Настройки игры: выбор локации, смена персонажа</li>
                    <li>6. Статистика: сохраняется лучший результат,
                        записываются результаты 10 последних игры в тыблице Statistics, доступное через меню</li>
                    <li>7. Сохранение состояния игры: сохраняется уровень звука,
                        его включение/отключение, выбранный персонаж и локация, лучший результат</li>
                    <li>8. Клавиатура: Управление стрелками, Пауза/продолжение/рестарт - пробел, включить/отклбючить
                        звук - M, управлени на смартфоне с помощью сенсора</li>
                </ul>
            </div>
            <div id={"credits"}>
                <h3>Credits</h3>
                <div className={classesCss.InfoRow}>
                    <div className={classesCss.Credits}>
                        <div>
                            <a href={"https://rs.school/js/"}>
                                <img alt="Rss" src={process.env.PUBLIC_URL + "assets/helpers/rs_school_js.svg"}/>
                            </a>
                        </div>
                        <div>
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