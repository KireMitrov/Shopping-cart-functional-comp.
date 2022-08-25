import './App.css';
import Header from './components/Header/Header';
import "@fontsource/raleway";
import All from './pages/All';
import Clothes from './pages/Clothes';
import { Routes, Route, Navigate} from "react-router";
import Tech from './pages/Tech';
import Product from './components/Product/Product';

function App() {
  
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="all" element={<All></All>}></Route>
        <Route path="all/:product" element={<Product></Product>}></Route>
        <Route path="tech" element={<Tech></Tech>}></Route>
        <Route path="clothes" element={<Clothes></Clothes>}></Route>
        <Route path="*" element={<Navigate to="/all" replace/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
