import styled from 'styled-components'

export default styled.div`

  position: absolute;
  animation: bgMove 3s linear infinite;
  background-size: cover;
  
    
  @keyframes bgMove {
  0%{
    background-position: 0;
  }
  100%{
    background-position: -600px;
  }
}
`