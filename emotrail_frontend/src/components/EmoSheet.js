import React, { useState, useEffect } from 'react';
import Tabletop from 'tabletop';
import Papa from "papaparse";

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/10leb519G1WKGpNsImOoVDUJePoDy8QsY/edit#gid=100167475';

 
 function showInfo(data, tabletop) {
  // do something with the data
  console.log(data);
  console.log(JSON.stringify(data, null, 2));
}
 
const EmoSheet = () => {
    const [data, setData] = useState([])
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSR_anaes5n_YbQgWCLEhQYOJYiGCloz9fhb9Gnnf2ehqv7ItLmWpaFone2G0DgGg/pub?output=csv", {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      });
      const movies = Array.from(data);

    
  return (

    <>
    <h1>data from google sheets</h1>
        <div></div>
    </>
  )
}

export default EmoSheet