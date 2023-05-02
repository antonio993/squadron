import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import AppMenu from '../AppMenu/AppMenu';
import SnackbarComponent from '../errors/Snackbar';

const App = () => {

  return (
    <Fragment>
      <AppMenu />
      <SnackbarComponent />
      <Outlet />
    </Fragment>
  );
};

export default App;