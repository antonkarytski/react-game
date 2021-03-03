import styled, {css, keyframes} from 'styled-components'

const getScale=(width) =>{
    if(width > 600) {
        return 600/width
    }
    return 1
}

const move = (frameWidth, selfWidth) => keyframes`
  0%{
    left: ${frameWidth}px;
  }
  100%{
    left: -150px;
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
${props => move(props.frameWidth, props.width)} ${props => props.frameWidth/props.speed * getScale(props.frameWidth)}s linear
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
  ${animationSet};
  left: -100px;
  z-index: 19;
  
  @keyframes move {
 
`