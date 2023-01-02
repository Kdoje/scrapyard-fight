import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Papa, { ParseResult } from "papaparse"
import units from './units.csv'
import stratagems from './stratagems.csv'
import reportWebVitals from './reportWebVitals';
import { UnitCard, UnitCardProps } from './UnitCard';
import { StratagemCard, StratagemCardProps } from './StratagemCard';
 

const getUnits = () => {
  Papa.parse(units, {
    header: true,
    download: true,
    complete: (fileResults: ParseResult<UnitCardProps>) => {
      let root = ReactDOM.createRoot(
        document.getElementById('unit-root') as HTMLElement
      );
      root.render(
        <React.StrictMode>
          <div className="card-grid">
            {fileResults.data.map(unitData =>
              <UnitCard {...unitData} />
            )}
          </div>
        </React.StrictMode>
      );
    },
  })
}

const getStratagems = () => {
  Papa.parse(stratagems, {
    header: true,
    download: true,
    complete: (fileResults: ParseResult<StratagemCardProps>) => {
      let root = ReactDOM.createRoot(
        document.getElementById('stratagem-root') as HTMLElement
      );
      root.render(
        <React.StrictMode>
           <div className="card-grid">
            {fileResults.data.map(unitData =>
              <StratagemCard {...unitData} />
            )}
          </div>
        </React.StrictMode>
      );
    },
  })
}

getUnits();
getStratagems();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
