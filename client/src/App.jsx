import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import { Clients } from './components/Clients';
import AddClientModal from './components/AddClientModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Projects } from './components/Projects';




const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:3200/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <AddClientModal />
            <Projects />
            <Clients />
            {/* <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes> */}
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;