import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter } from "react-router-dom";
import MainRouter from './components/MainRouter'
import ErrorBoundary from "./components/ErrorBoundary"

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);


