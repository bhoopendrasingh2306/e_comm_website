import Nav from './components/Nav';
import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Products from './components/ProductsList';
import Login from './components/Login';
import AddProduct from './components/AddProducts';
import UpdateProduct from './components/UpdateProduct';
import PrivateComponent from './components/PrivateComponents';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>   

        {/* in this route named privatecomponent we will contain all the route which we want to restrict to enter the user if the user is not logged in */}
        <Route element={<PrivateComponent/>}>  
        {/* path of Route must be same as specified in nav.js link to="  " */}
        <Route path='/' element={<Products/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}></Route>
        <Route path='/logout' element={<h1> logout</h1>}></Route>
        <Route path='/profile/:id' element={<Profile/>}/>


        </Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
