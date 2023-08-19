import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import ContactProvider from "./context/contactContext.tsx"
import { ApolloProvider } from "@apollo/client"
import { client } from "@/api"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContactProvider>
        <App />
      </ContactProvider>
    </ApolloProvider>
  </React.StrictMode>
)
