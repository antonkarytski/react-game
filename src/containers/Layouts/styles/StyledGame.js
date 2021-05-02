import styled, { css, keyframes } from "styled-components";

const bgMove = (width) => keyframes`
  0%{
    background-position: 0 0;
  }
  100%{
    background-position: -${width}px 0;
  }
`;

const bgImageUrl = (bgImage) => css`
  url(${process.env.PUBLIC_URL}/${bgImage})
`;

const bgSize = (width, height) => css`
  ${width}px ${height}px
`;

const playState = (paused) => css`
  ${paused ? "paused" : "running"}
`;

export default styled.div`
  animation: ${({ bgWidth }) => bgMove(bgWidth)} ${({ bgTime }) => bgTime}s
    linear infinite;
  background-image: ${({ bgImage }) => bgImageUrl(bgImage)};
  background-size: ${({ bgWidth, bgHeight }) => bgSize(bgWidth, bgHeight)};
  animation-play-state: ${({ paused }) => playState(paused)};
`;
