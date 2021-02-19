import styled from 'styled-components'

export default styled.div`

  position: absolute;
  animation: move 3s linear infinite;
  
  @keyframes move {
    0% {
     right: 0;
    }
    
   100% {
    right: 600px;
   }
  }

`