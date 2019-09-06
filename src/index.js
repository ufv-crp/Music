// React
import ReactDOM from "react-dom";

// Apollo
import ApolloProvider from "./ApolloProvider";

// Service worker
import * as serviceWorker from "./serviceWorker";

// Service Worker
//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below
serviceWorker.register();

// Renders the application already configured to graphql
ReactDOM.render(ApolloProvider, document.getElementById("root"));
