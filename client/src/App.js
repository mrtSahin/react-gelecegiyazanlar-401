import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



import Navbar from './components/Navbar';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id='content'>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}


export default App;
