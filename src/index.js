import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './Style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './components/redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "https://oldmovie.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:5000";
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
