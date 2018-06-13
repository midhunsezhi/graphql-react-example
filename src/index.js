import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache({ addTypename: true, });

const httpLink = new HttpLink({
    uri: 'http://localhost:3030/graphql',
});

const stateLink = withClientState({
    cache,
    defaults: {
        app: {
            __typename: "App",
        },
    },
    resolvers: {},
});

const client = new ApolloClient({
    link: ApolloLink.from([ stateLink, httpLink ]), cache, connectToDevTools: true,
});

ReactDOM.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>, document.getElementById('root'));
