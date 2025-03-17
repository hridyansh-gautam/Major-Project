import './App.css';
import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
    </Route>
  )
);

const App=()=> {
  return <RouterProvider router={router}/>;
}

export default App;
