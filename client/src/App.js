import './App.css';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Navbar from './components/Navbar';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import PrivateRoute from './pages/PrivateRoute';
import Basket from './pages/Basket';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

function App() {


  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div id='content'>
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/basket" element={<Basket />} />
            <Route path='/profile' element={<PrivateRoute ><Profile /></PrivateRoute>} ></Route>
            <Route path='/admin' element={<PrivateRoute admin={true}><Admin /></PrivateRoute>} ></Route>
            <Route path="*" element={<NotFound />} /> {/**  * hic biri ile eslesmeme durumuna denk geliyor   */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
