import styled from 'styled-components'

export default styled.div` 

  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;

  ${props => props.jump ? `animation: jump ${0.75 * 1.5}s cubic-bezier(0.310, 0.440, 0.445, 1.050)` : null};
    
  @keyframes jump {
  0%, 100%{
    bottom: 0;
  }
  50%{
    bottom: 100px;
  }
}
`