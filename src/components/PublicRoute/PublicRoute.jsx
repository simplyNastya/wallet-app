import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { isUserLogin } from 'redux/auth/auth-selectors';

export const PublicRoute = () => {
  const isLogin = useSelector(isUserLogin);

  if (isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

