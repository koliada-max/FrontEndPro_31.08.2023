import Contacts from './Contacts';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Contacts />
      </div>
    </ErrorBoundary>
  );
}

export default App;
