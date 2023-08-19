import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
})

export default client
