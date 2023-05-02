import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = useSelector(state => state.user.token);

  // show unauthorized screen if there is no token in user state
  if (!token) {
    return (
      <Container sx={{ textAlign: 'center' }}>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </Container>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;