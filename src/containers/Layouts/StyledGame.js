import styled from 'styled-components'

export default styled.div`

  position: absolute;
  animation: bgMove 3.5s linear infinite;
  
    
  @keyframes bgMove {
  0%{
    background-position: 0;
  }
  100%{
    background-position: -785px;
  }
}
`