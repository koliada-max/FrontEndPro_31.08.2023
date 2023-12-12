import './App.css';
import MyForm from './MyForm';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <MyForm />
      </div>
    </ErrorBoundary>
  );
}

export default App;
