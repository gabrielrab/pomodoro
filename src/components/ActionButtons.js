import React from "react";
import styled from "styled-components";

import useTimer from "@hooks/useTimer";

const ActionButtonsWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 30px;
  border: none;
  border-radius: 3px;
  margin: 8px;
`;

const ActionResetButton = styled.button`
  background-color: transparent;
  border: none;
`;

export default function ActionButtons() {
  const { reset, pause, start, onPause } = useTimer();
  return (
    <ActionButtonsWrapper>
      {onPause ? (
        <>
          <ActionButton onClick={start}>Start</ActionButton>
          <ActionResetButton onClick={reset}>Reset</ActionResetButton>
        </>
      ) : (
        <ActionButton onClick={pause}>Pause</ActionButton>
      )}
    </ActionButtonsWrapper>
  );
}
