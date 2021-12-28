import React from "react";
import Layout from "@components/Layout";
import SessionStatus from "@components/SessionStatus";

import useTimer from "@hooks/useTimer";

// // Requisitos
// A cada 1 session - 5 min de descanso
// A cada 4 sessions - 1 stop (stop session)

//  // Dados
// Stop session - 30 min
// Session interval - 5 min

//  // Ideias extras
// Quando estiver em tempo de working, apresentar uma animação de uma pessoa codando
// Colocar abaixo da imagem uma barra de progresso
// Colocar o horário que vai terminar a sessão

export default function Index() {
  const { reset, min, sec, timerId, start, session, onBreak } = useTimer();
  return (
    <Layout>
      <SessionStatus onBreak={onBreak} />
      <br />
      Timer: {`${min}`.padStart(2, "0")}:{`${sec}`.padStart(2, "0")}
      <br />
      Session: {session}
      <div>
        <button onClick={start}>Start</button>
        <button onClick={() => clearInterval(timerId)}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    </Layout>
  );
}
