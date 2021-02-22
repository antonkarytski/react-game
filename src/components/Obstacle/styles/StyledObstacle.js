import styled from 'styled-components'

export default styled.div`

  position: absolute;
  animation: move 3s linear;
  left: -100px;
  
  @keyframes move {
  0%{
    left: 600px;
  }
  100%{
    left: -100px;
  }
`