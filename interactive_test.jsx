import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import TankTimeCalculator from "./src/TankTimeCalculator.jsx";

const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;

const container = document.getElementById("root");
const root = createRoot(container);
act(() => {
  root.render(<TankTimeCalculator />);
});

// Switch to Pipeline mode: click "fill" tab is default already, need to click "Pipeline receipt" toggle
// Find the pipeline toggle button by text
function findButtonByText(text) {
  return Array.from(document.querySelectorAll("button")).find((b) => b.textContent.includes(text));
}

const pipelineToggle = findButtonByText("Pipeline receipt");
console.log("Found pipeline toggle:", !!pipelineToggle);
act(() => { pipelineToggle.click(); });

// Now find facility - need HTF selected for isPlantationPipeline. Check facility select.
const facilitySelects = Array.from(document.querySelectorAll("select"));
console.log("Selects found:", facilitySelects.length);

// Find the "Different" button for pipelineTestsDiffer toggle to make the switch-time field appear
let switchInput = document.querySelector('input[type="time"]');
console.log("Any time input present after enabling pipeline mode:", !!switchInput);

// Find the specific switch-time input by its preceding label text
const labels = Array.from(document.querySelectorAll("span")).filter(s => s.textContent.includes("Pipeline switched delivery tank"));
console.log("Found switch-time label:", labels.length);
