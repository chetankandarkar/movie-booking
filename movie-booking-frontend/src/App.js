import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login';
import AddMovie from './Components/AddMovie';
import HomePage from './Components/HomePage';
import Cookie from 'universal-cookie';
import HomeAdmin from './Components/HomeAdmin';
import Register from './Components/Register';
import BookTicket from './Components/BookTicket';
import CheckTickets from './Components/CheckTickets';
import ResetPassword from './Components/ResetPassword';
import SearchMovie from './Components/SearchMovie';
import PageNotFound from './Components/PageNotFound';



function App() {

  const cookies = new Cookie();
  console.log(cookies.get('accessToken'));
  console.log(cookies.get('username'));

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Navigate to="/" replace/>} />
        <Route path="/home" token={cookies.get('accessToken')} isLoggedIn={cookies.get('roles')} username={cookies.get('username')} element={<HomePage/>} />
        <Route path='/homeadmin' element={<HomeAdmin />}/>
        <Route path='/movieadd' element={<AddMovie/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/searchmovie' element={<SearchMovie/>} />
        <Route path='/resetpassword' element={<ResetPassword/>} />
        <Route path='/bookticket/:movieName/:theatreName' element={<BookTicket/>} />
        <Route path='/checktickets/:movieName' element={<CheckTickets/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
