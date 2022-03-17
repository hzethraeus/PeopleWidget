import './App.css';
import PeopleCount from './component/PeopleCount';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
function App() {

  const client = new ApolloClient({
    uri: 'https://api.datacake.co/graphql/',
    cache: new InMemoryCache(),
    headers: {
      authorization: 'Token dc1e418843f2b9d4c77933d96da47afd1fce6575',
    }
  })
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <PeopleCount />
      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
