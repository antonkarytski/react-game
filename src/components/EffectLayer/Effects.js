import styled, { css, keyframes } from "styled-components";

const effectLayout = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const discoKeyframe = () => keyframes`
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
`;

const playState = (paused) => css`
  ${paused ? "paused" : "running"}
`;

const Effects = {
  disco: styled.div`
    animation: ${discoKeyframe} 10s steps(6) infinite;
    animation-play-state: ${({ paused }) => playState(paused)};
    ${effectLayout};
  `,
};

export default Effects;
