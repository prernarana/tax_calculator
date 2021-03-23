import './App.css';
import TaxCalculator from './components/taxCalculator/TaxCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Tax Calculator</h3>
      </header>
      <main>
        <TaxCalculator />
      </main>
    </div>
  );
}

export default App;
