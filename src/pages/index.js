import React from "react";
import Layout from "@components/Layout";
import SessionStatus from "@components/SessionStatus";
import ActionButtons from "@components/ActionButtons";
import Timer from "@components/Timer";

import useTimer from "@hooks/useTimer";

export default function Index() {
  const { onBreak } = useTimer();
  return (
    <Layout>
      <SessionStatus onBreak={onBreak} />
      <Timer />
      <ActionButtons />
    </Layout>
  );
}
