import React from "react";
import coding from "@assets/coding.gif";
import sleep from "@assets/sleep.gif";

import styled from "styled-components";

const SessionStatusWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ImageCodingWrapper = styled.img`
  max-height: 300px;
  transition: 0.2s linear;
`;

const ImageRelaxWrapper = styled.img`
  max-height: 300px;
  transition: 0.2s linear;
`;

export default function SessionStatus({ onBreak }) {
  return (
    <SessionStatusWrapper>
      {onBreak ? (
        <ImageRelaxWrapper src={sleep} alt="Focus time" />
      ) : (
        <ImageCodingWrapper src={coding} alt="Focus time" />
      )}
    </SessionStatusWrapper>
  );
}
