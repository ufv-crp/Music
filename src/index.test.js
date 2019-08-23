import React from "react";
import ReactDOM from "react-dom";
import ApolloProvider from "./ApolloProvider";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(ApolloProvider, div);
  ReactDOM.unmountComponentAtNode(div);
});
