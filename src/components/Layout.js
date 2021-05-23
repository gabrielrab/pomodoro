import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  background-color: #f5f8fa;
  min-width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export default function Layout({ children }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
