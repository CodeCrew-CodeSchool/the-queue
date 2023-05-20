import './App.css';
import Queue from './Queue';
// import QueueControls from './QueueControls';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header'>The Queue</h1>
      </header>
      <Queue/>
    </div>
  );
}

export default App;
