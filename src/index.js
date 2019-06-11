import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import {store} from "./store/RootStore";
import { addArticle, addStudent } from "./actions/RootAction";

window.store = store;
window.addStudent = addStudent;

ReactDOM.render((
    <Provider store={store}>
      <App/>
    </Provider>
  ), document.getElementById('root'));

//store.subscribe(() => console.log('Look ma, Redux!!'))

//store.dispatch( addStudent({  Email: "Riya", Gender: "Female", Country: "India", Hobby: ["Dance"]  }) )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
