import styled from 'styled-components'

export default styled.div` 
  
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;

  ${props => props.jump ? `animation: jump 0.75s cubic-bezier(0.310, 0.440, 0.445, 1.050)` : null};
    
  @keyframes jump {
  0%, 100%{
    bottom: 0;
  }
  50%{
    bottom: 100px;
  }
}
`