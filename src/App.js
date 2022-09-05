import './App.css';
import "@fontsource/raleway";
import { Routes, Route, Navigate } from "react-router";
import Cart from './pages/Cart';
import Category from './pages/Category-page/Category';
import ProductPage from './pages/Product-page';
import Navbar from './components/Navbar/Navbar';


function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/:categoryName" element={<Category></Category>}></Route>
        <Route path="/:categoryName/:product" element={<ProductPage></ProductPage>}></Route>
        <Route path="cart" element={<Cart></Cart>}></Route>
        <Route path="*" element={<Navigate to="/all" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
