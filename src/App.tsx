import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BreedPicker from './components/BreedPicker/BreedPicker';
import './App.scss'


// react-query client
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header>
          <h1>Dog App by James Ritzman</h1>
        </header>
        <main>
          <BreedPicker />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
