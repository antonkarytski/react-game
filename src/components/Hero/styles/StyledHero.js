import styled from 'styled-components'

export default styled.div` 

  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  -webkit-animation: animMove .3s steps(3) infinite;
  background-position-y: 0;  

  ${props => props.jump ? `animation: jump ${0.75 * 1.5}s cubic-bezier(0.310, 0.440, 0.445, 1.050)` : null};
  ${props => props.sit ? `animation: sitMove ${0.3}s steps(3) infinite` : null};
    
    
@keyframes animMove {
  0%{
    background-position: 0 0;  
  }
  100%{
    background-position: -130px 0;  
  }
}

@keyframes jump {
  0%, 100%{
    bottom: 0;
  }
  50%{
    bottom: 100px;
  }
}

@keyframes sitMove {
  0%{
    background-position: -135px -10px;  
  }
  100%{
    background-position: -295px -10px;  
  }
}
`