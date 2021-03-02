import styled, {css, keyframes} from 'styled-components'

const calculateSpeed = (speed, width) => {
    return ((3 - Math.log(speed) / Math.log(50)) * width / 600).toFixed(2)
}

const move = (frameWidth) => keyframes`
  0%{
    left: ${frameWidth}px;
  }
  100%{
    left: -100px;
  }
`
const rotation = keyframes`
  100%{
    transform: rotate(-360deg);
  }
`

const backgroundSize = css`
  background-size: ${props => (function (props) {
    if (props.compStyle.bgSize) {
        if (props.compStyle.bgSize === "auto") {

            return `${props.compStyle.w}px ${props.compStyle.h}px`
        }
        return props.compStyle.bgSize
    }
    return 'contain'
})(props)}
`

const animationRotate = css`
,${rotation} 0.4s linear infinite
`
const animationMove = css`
${props => move(props.frameWidth)} ${props => calculateSpeed(props.speed, props.frameWidth)}s linear
`
const animationSet = css`
animation: ${animationMove}${props => props.effect === "rotate" ? animationRotate : null}
`

export default styled.div`

  ${backgroundSize};
  width: ${props => props.compStyle.w}px;
  height: ${props => props.compStyle.h}px;
  bottom: ${props => props.compStyle.altitude}px;
  position: absolute;
  //animation: ${props => move(props.frameWidth)} ${props => calculateSpeed(props.speed, props.frameWidth)}s linear;
  ${animationSet};
  left: -100px;
  z-index: 19;
  
  @keyframes move {
 
`