import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import AuthLayout from './components/AuthLayout'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { loginUser, registerUser, setLoading } from './slices/userSlice'
import NotFound from './pages/NotFound'
import UserHome from './pages/UserHome'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const verifySession = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get('/api/v1/user/profile');
        if (response.data.success) {
          dispatch(loginUser());
          const { firstName, lastName, email } = response.data.data;
          const userDetails = { firstName, lastName, email };
          dispatch(registerUser(userDetails));
        }
      } catch (error) {
        console.error("User not logged in or session expired", error);
      } finally {
        dispatch(setLoading(false)); // Ensure loading is set to false
      }
    };

    verifySession();
  }, [dispatch]);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/login" element={<AuthLayout authentication={false}>
        <UserLogin />
      </AuthLayout>} />
      <Route path="/user/signup" element={<AuthLayout authentication={false}>
        <UserSignup />
      </AuthLayout>} />
      <Route path="/captain/login" element={<AuthLayout authentication={false}>
        <CaptainLogin />
      </AuthLayout>} />
      <Route path="/captain/signup" element={<AuthLayout authentication={false}>
        <CaptainSignup />
      </AuthLayout>} />
      <Route path='/user/home' element={<AuthLayout authentication={true}>
        <UserHome />
      </AuthLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>)
}

export default App
