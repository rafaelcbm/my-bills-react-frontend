import React, { useContext } from 'react';
import {
  Switch, Route, Redirect, Link
} from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

import './App.css';

import Login from './pages/Login';
import Categories from './pages/Categories';
import Page404 from './pages/Page404';
import Bills from './pages/Bills';
import Logout from './components/Logout';

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
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/bills">Bills</Link>
          </li>
          <li className="logout">
            <Logout />
          </li>
        </ul>
      </nav>
      <div className="App">
        <Switch>
          <CustomRoute isPrivate exact path="/" component={Categories} />
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute isPrivate exact path="/categories" component={Categories} />
          <CustomRoute isPrivate exact path="/bills" component={Bills} />
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
