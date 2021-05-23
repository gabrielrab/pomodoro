import React from "react";
import Layout from "@components/Layout";

import useTimer from "@hooks/useTimer";

export default function Index() {
  const { session } = useTimer();
  return (
    <Layout>
      Hello World, here its index page!
      <br />
      Timer: {session}
    </Layout>
  );
}
