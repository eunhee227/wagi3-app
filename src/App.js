import './App.css';
import {Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';

const App= () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/@:username">
        <Route index element={<Home/>}/>
        <Route path=":homeId" element={<home/>}/>
      </Route>
    </Routes>
  );
};

export default App;
