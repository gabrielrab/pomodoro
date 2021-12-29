import React from "react";
import coding from "@assets/coding.gif";
import sleep from "@assets/sleep.gif";
import pause from "@assets/firefighters.gif";

import styled from "styled-components";

import useTimer from "@hooks/useTimer";

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

export default function SessionStatus() {
  const { onBreak, onPause } = useTimer();
  if (onPause) {
    return (
      <SessionStatusWrapper>
        <ImageRelaxWrapper src={pause} alt="Pause time" />
      </SessionStatusWrapper>
    );
  }

  return (
    <SessionStatusWrapper>
      {onBreak ? (
        <ImageRelaxWrapper src={sleep} alt="Break time" />
      ) : (
        <ImageCodingWrapper src={coding} alt="Focus time" />
      )}
    </SessionStatusWrapper>
  );
}
