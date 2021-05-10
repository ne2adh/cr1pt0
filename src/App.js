import './App.css';
import SimetricoForm from './SimetricoForm';
import ASimetricoForm from './ASimetricoForm';

function App() {
    return (
    <div className="App">
      <header className="App-header">        
        <p>
         Aplicacion realizada por Giancarlo Delgadillo Coca <span style={{fontSize: '14px', color: 'aqua'}}> (giancarlodcwork@gmail.com) </span>
        </p>       
      </header>
      <SimetricoForm />
      <ASimetricoForm />
    </div>
  );
}

export default App;
