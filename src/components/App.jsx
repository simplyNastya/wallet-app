import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';

import AuthLayout from './AuthLayout/AuthLoyout';
import UserRoutes from '../UserRoutes';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthLayout>
            <UserRoutes />
          </AuthLayout>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
