import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './services/router/router';
import { store } from './store/store';

import reportWebVitals from './reportWebVitals';

// import i18n (needs to be bundled ;))
import './i18n/i18n';

import './index.css';
import './styles/fonts/Goldman-Bold.ttf';
import './styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
