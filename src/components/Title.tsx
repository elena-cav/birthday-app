import React from "react";
import styled from "styled-components";
const Title = styled.h1`
  text-align: center;
  margin: 0;
  line-height: 1.15;
  font-size: ${({ size }) => size || "4rem"};
  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
`;
export default ({ text, size }) => {
  return <Title size={size}>{text}</Title>;
};
