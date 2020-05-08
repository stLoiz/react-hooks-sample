import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth/Auth';
import { AuthContext } from './context/auth-context';

const App = () => {
  const authContext = useContext(AuthContext);

  return <>{authContext.isAuth ? <Ingredients /> : <Auth />}</>;
};

export default App;
