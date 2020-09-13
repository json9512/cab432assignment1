import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import MainPage from './screen/MainPage';
import ResultPage from './screen/Result';
import { createGlobalStyle }  from 'styled-components';

// Global Style sheet injection
const GlobalStyle = createGlobalStyle`
  body {
    background: white;
    width: 100vw;
    height 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
  }
`

export default function App() {

  return (
    <Router>
        {/**
         * Creates Routes for / and /result
         */}
        <GlobalStyle />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/result' render={(props) => <ResultPage {...props} />} />
            <Redirect to="/" />
          </Switch>
    </Router>
  );
  };
