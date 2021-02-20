import styled from 'styled-components'

export default styled.div`

  position: absolute;
  animation: move 3.2s linear infinite;
  
  @keyframes move {
    0% {
     right: 0;
    }
    
   100% {
    right: ${props => 600 + props.width}px;
   }
  }

`