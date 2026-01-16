import './App.css';
import {Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import MapPage from './pages/MapPage';
import FriendPage from './pages/FriendPage';
import ProtectedRoute from './routes/ProtectedRoute';

const App= () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/friend" element={<FriendPage />} />
      <Route path="/@:username">
        <Route index element={<HomePage/>}/>
        <Route path=":homeId" element={<HomePage/>}/>
      </Route>
    </Routes>
  );
};

export default App;
