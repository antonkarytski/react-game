import styled, {css, keyframes} from 'styled-components'


const getScale=(width) =>{
    if(width > 600) {
        return 600/width
    }
    return 1
}

const move = (frameWidth) => keyframes`
  0%{
    left: ${frameWidth}px;
  }
  100%{
    left: -200px;
  }
`
const rotation = keyframes`
  100%{
    transform: rotate(-360deg);
  }
`

const altitude = (altitude, altitudeFloat) => keyframes`
  0%,100%{
    bottom: ${altitude}px;
  }
  25%{
    bottom: ${altitude + altitudeFloat[0]}px;
  }
  75%{
    bottom: ${altitude + altitudeFloat[1]}px;
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
    return 'cover'
})(props)}
`

const animationRotate = css`
,${rotation} 0.4s linear infinite
`

const animationAltitude = css`
,${props => altitude(props.compStyle.altitude, props.effect.altitude)} ${props => props.effect.time? props.effect.time : 4}s linear infinite
`

const animationMove = css`
${props => move(props.frameWidth)} ${props => props.frameWidth/props.selfSpeed * getScale(props.frameWidth) + 0.3}s linear
`
const animationSet = css`
animation: ${animationMove}${props => props.effect.name === "rotate" ? animationRotate : null}
${props => props.effect.name === "altitude" ? animationAltitude : null}
`

export default styled.div`

  ${backgroundSize};
  width: ${props => props.compStyle.w}px;
  height: ${props => props.compStyle.h}px;
  bottom: ${props => props.compStyle.altitude}px;
  position: absolute;
  ${animationSet};
  left: -100px;
  z-index: 19;
  
  @keyframes move {
 
`