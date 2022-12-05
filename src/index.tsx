import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Papa, { ParseResult } from "papaparse"
import App from './App';
import units from './units.csv'
import reportWebVitals from './reportWebVitals';
import { UnitCard, UnitCardProps } from './UnitCard';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const getCSV = () => {
  Papa.parse(units, {
    header: true,
    download: true,
    complete: (fileResults: ParseResult<UnitCardProps>) => {
      root.render(
        <React.StrictMode>
          <div className="card-grid">
            {fileResults.data.map(unitData =>
              <UnitCard {...unitData} />
            )}
          </div>
        </React.StrictMode>
      );

      console.log(fileResults.data)
    },
  })
}

getCSV();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
