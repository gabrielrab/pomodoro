import React from "react";
import styled from "styled-components";

import useTimer from "@hooks/useTimer";

const backgroundColorDefinition = {
  onBreak: "#75DBCE",
  onWork: "#fff",
  onPause: "#665C58",
};

const LayoutWrapper = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background-color: ${({ status }) => backgroundColorDefinition[status]};
`;

export default function Layout({ children }) {
  const { onBreak, onPause } = useTimer();
  return (
    <LayoutWrapper
      status={onPause ? "onPause" : onBreak ? "onBreak" : "onWork"}
    >
      {children}
    </LayoutWrapper>
  );
}
