import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

import Login from './pages/Login';
import Categories from './pages/Categories';
import Pagina404 from './pages/Pagina404';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute isPrivate exact path="/" component={Categories} />
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/categories" component={Categories} />
      <Route>
        <Pagina404 />
      </Route>
    </Switch>
  );
}
