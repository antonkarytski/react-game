import styled, {css, keyframes} from 'styled-components'

const animMove = (spritePositions) => keyframes`
  0%{
    background-position: -${spritePositions[0].x}px -${spritePositions[0].y}px;
  }
  100%{
    background-position: -${spritePositions[1].x}px -${spritePositions[1].y}px;
  } 
`

const animSitMove = (spritePositions) => keyframes`
  0%{
    background-position: -${spritePositions[0].x}px -${spritePositions[0].y}px;
  }
  100%{
    background-position: -${spritePositions[1].x}px -${spritePositions[1].y}px;
  }
`

const jump = (height) => keyframes`
  0%, 100%{
    bottom: 0;
  }
  50%{
    bottom: ${height * 2}px;
  }
`

const sitAnimation = css`
  animation: ${props => animSitMove(props.spriteSitPositions)} 0.3s steps(3) infinite
`

const jumpAnimation = css`
  animation: ${props => jump(props.heroSizes.default.h)} ${0.75 * 1.5}s cubic-bezier(0.310, 0.440, 0.445, 1.050)
`

const StyledHero = styled.div` 

  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  -webkit-animation: ${props => animMove(props.spriteRunPositions)} .3s steps(${props => props.spriteRunSteps}) infinite;
  background-position-y: 0;  

  ${props => props.jump ? jumpAnimation : null};
  ${props => props.sit ? sitAnimation : null};
    

@keyframes sitMove {
  
}
`

export default StyledHero
