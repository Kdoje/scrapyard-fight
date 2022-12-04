import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Papa, { ParseResult } from "papaparse"
import App from './App';
import units from './units.csv'
import reportWebVitals from './reportWebVitals';

type Data = {
  name: string
  cost: string
  type: string
  subtype: string
  description: string
  move: string
  health: string
  value: string
  attack: string
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const getCSV = () => {
  Papa.parse(units, {
    header: true,
    download: true,
    complete: (fileResults: ParseResult<Data>) => {
      console.log(fileResults.data)
    },
  })
}

getCSV();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
