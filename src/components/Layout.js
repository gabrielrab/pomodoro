import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

export default function Layout({ children }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
