import logo from './logo.svg';
import './App.css';

function App() {
  const currDate = new Date();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {' '}
          <h1>Hello World</h1>
          <h2>The time now is {currDate.toLocaleTimeString()}.</h2>
        </div>
      </header>
    </div>
  );
}

export default App;
