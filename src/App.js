import React from "react";
import CSVToJsonConverter from "./CSVToJsonConverter";

import "./App.css"; // Import CSS file for styling

import logo from "./logo.webp"; // Import your logo image file

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" /> {/* Logo */}
        <h1>Schedule.json converter</h1>
        <h2>Select your .CSV file:</h2>
        <CSVToJsonConverter />
      </div>
      <div className="faq-section">
        <h2>FAQ</h2>
        <h3 id="use-template">1. How do I use the XLSX template?</h3>
        <p>
          You can download the XLSX template{" "}
          <a href="HBCU_Schedule_Template.xlsx" download>
            here
          </a>
          . Once downloaded, open the template in Microsoft Excel or a
          compatible spreadsheet program.
        </p>
        <p>
          Fill in the schedule information in the template following the
          provided format.
        </p>

        <h3 id="export-csv">2. How do I export the schedule to a CSV file?</h3>
        <ol>
          <li>
            After you have filled in the schedule information in the XLSX
            template, save the file.
          </li>
          <li>
            Open the saved XLSX file in Microsoft Excel or a compatible
            spreadsheet program.
          </li>
          <li>Go to "File" > "Save As".</li>
          <li>
            In the "Save as type" dropdown, select "CSV (Comma delimited)
            (*.csv)".
          </li>
          <li>
            Choose the location where you want to save the CSV file and click
            "Save".
          </li>
        </ol>
        <h3 id="example-csv">3. I'm not sure how the files should look like</h3>
        <p>
          You can download an example CSV file{" "}
          <a href="/HBCU_Schedule_Template.csv" download>
            here
          </a>
          , and the JSON output{" "}
          <a href="/schedule.json" download>
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default App;
