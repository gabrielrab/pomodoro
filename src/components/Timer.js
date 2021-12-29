import React from "react";
import styled from "styled-components";

import useTimer from "@hooks/useTimer";

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const TickTimer = styled.h1``;
const SessionCount = styled.span`
  padding: 4px 15px;
  font-size: 11px;
  background-color: #eeeeee;
  border-radius: 15px;
`;

export default function Timer() {
  const { min, sec, session, endAt, onPause } = useTimer();
  return (
    <TimerWrapper>
      <TickTimer>
        {`${min}`.padStart(2, "0")}:{`${sec}`.padStart(2, "0")}
      </TickTimer>
      {!onPause && (
        <SessionCount>
          Session: {session} - Termina às {endAt}
        </SessionCount>
      )}
    </TimerWrapper>
  );
}
