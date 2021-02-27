import styled from 'styled-components'

export default styled.div`

  position: absolute;
  animation: move ${props => ((3 - Math.log(props.speed)/Math.log(50))*props.frameWidth/600).toFixed(2)}s linear;
  left: -100px;
  
  @keyframes move {
  0%{
    left: ${props => props.frameWidth}px;
  }
  100%{
    left: -100px;
  }
`