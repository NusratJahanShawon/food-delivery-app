import { ApolloProvider } from "@apollo/client";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { AppProvider } from "@/context/AppContext";
import { client } from "@/lib/apollo-client";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </ApolloProvider>
  );
}