import React from "react";

function App() {
  const notify = () => {
    new Notification("Try send notification", {
      body: "Yes, you can send notofication",
    });
  };

  return (
    <>
      Only Electron app runing using react{" "}
      <button onClick={notify}>Click</button>
    </>
  );
}

export default App;
