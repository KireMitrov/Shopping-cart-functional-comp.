import './App.css';
import Header from './components/Header/Header';
import "@fontsource/raleway";
import { Routes, Route, Navigate } from "react-router";
import Cart from './pages/Cart';
import Category from './pages/Category-page/Category';
import ProductPage from './pages/Product-page';

function App() {

  return (
    <div>
      <Header></Header>
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
