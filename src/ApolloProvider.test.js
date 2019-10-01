// React
import React from "react";

import ReactDOM from "react-dom";

// App + GraphQL
import ApolloProvider from "./ApolloProvider";

it("renders without crashing", () => {
  const div = document.createElement("div");

  document.body.appendChild(div);
  
  ReactDOM.render(ApolloProvider, div);

  ReactDOM.unmountComponentAtNode(div);
});
