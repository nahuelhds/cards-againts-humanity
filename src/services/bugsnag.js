import React, { Fragment } from "react";
import bugsnag from "@bugsnag/js";
import bugsnagReact from "@bugsnag/plugin-react";

const apiKey = process.env.REACT_APP_BUGSNAG_API_KEY;
let ErrorBoundary;

if (!apiKey) {
  ErrorBoundary = ({ children }) => <Fragment>{children}</Fragment>;
  console.warn("ATTENTION! Cannot start bugsnag. Api key not found.");
} else {
  const bugsnagClient = bugsnag();
  bugsnagClient.use(bugsnagReact, React);
  ErrorBoundary = bugsnagClient.getPlugin("react");
}

export { ErrorBoundary };
