import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie';
import {App} from './App';

const root = document.getElementById('app');

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  root,
);
