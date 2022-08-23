import './App.css';
import Header from './components/Header/Header';
import "@fontsource/raleway";
import All from './pages/All';
import Clothes from './pages/Clothes';
import Tech from './pages/Tech';

function App() {
  
  return (
    <div>
      <Header></Header>
      <All></All>
      <Clothes></Clothes>
      <Tech></Tech>
    </div>
  );
}

export default App;
