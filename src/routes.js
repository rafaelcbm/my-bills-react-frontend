import React, { useContext } from 'react';
import {
  Switch, Route, Redirect, Link
} from 'react-router-dom';

import { Container, Grid } from '@mui/material';
import { AuthContext } from './Context/AuthContext';
import './App/App.css';

import { Categories } from './pages/Categories';
import Page404 from './pages/Page404';
import Header from './components/Header';
import MonthlyBills from './pages/MonthlyBills.page';
import { Wallets } from './pages/Wallets';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg">
          <Route {...rest} />
        </Container>
      </Grid>
    </Grid>

  );
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute isPrivate exact path="/" component={MonthlyBills} />
      <CustomRoute isPrivate exact path="/wallets" component={Wallets} />
      <CustomRoute isPrivate exact path="/categories" component={Categories} />
      <CustomRoute isPrivate exact path="/monthly-bills" component={MonthlyBills} />
      <Route>
        <Page404 />
      </Route>
    </Switch>
  );
}
