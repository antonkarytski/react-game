import styled, {keyframes} from 'styled-components'

const getScale=(width) =>{
    if(width > 600) {
        return 600/width
    }
    return 1
}

const bgMove = (width) => keyframes`
  0%{
    background-position: 0 0;
  }
  100%{
    background-position: -${width}px 0;
  }
`

const party = () => keyframes`
 0%{
 background-color: rgba(243,61,255,0.3);
 }
 20%{
 background-color: rgba(255,255,23,0.3);
 }
 40%{
 background-color: rgba(38,65,255,0.3);
 }
 60%{
 background-color: rgba(255,49,17,0.3);
 }
 80%{
 background-color: rgba(255,255,255,0.3);
 }
 100%{
 background-color: rgba(47, 255, 75, 0.3);
 }
`
export const StyledLayer = styled.div`
animation: ${party} 10s steps(6) infinite;
`

export default styled.div`

  position: absolute;
  animation: ${props => bgMove(props.bgWidth)} ${props => props.bgTime}s linear infinite;
 
`

