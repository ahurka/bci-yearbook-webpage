import React from "react";
import ReactDOM from "react-dom";
import SelectorBar from './SelectorBar.js';

console.log("Hello?");
ReactDOM.render(
  <SelectorBar name="Grade 9" options={["9A", "9B", "9C", "9D", "9E"]}/>,
  document.getElementById("root")
);
