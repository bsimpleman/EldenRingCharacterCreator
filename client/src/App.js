import './App.css';
import Button from './components/button/Button.jsx'
import backgroundImg from './images/EldenRingFull.jpg'

function App() {
  return (
    <div className="App">
        <div className="main-container">
            <Button text={"Sign in"}/>
            <img src={backgroundImg}/>
        </div>
    </div>
  );
}

export default App;
