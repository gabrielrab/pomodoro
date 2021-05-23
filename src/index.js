import React from "react";
import ReactDOM from "react-dom";
import "./theme/base.css";
import App from "./App";
import { combine } from "./utils/components";

const ctx = require.context("./", true, /\/providers\/.+\.js$/);
const providers = ctx
  .keys()
  .map((i) => ctx(i).default)
  .sort((a, b) => (a.priority ? 0 : -1))
  .sort((a, b) => b.priority - a.priority);
const BootstrappedApp = combine(providers, App);

ReactDOM.render(
  <React.StrictMode>
    <BootstrappedApp />
  </React.StrictMode>,
  document.getElementById("root")
);
