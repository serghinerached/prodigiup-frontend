import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';

const DivPageTracker = () => {

  const [excelData, setExcelData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [dateLastImport, SetDateLastImport] = useState();
  const hiddenFileInput = useRef(null);

  // SELECT YEAR
  const tabYear = ["2022", "2023", "2024", "2025"];
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);
  const tabType = ["Incident", "Request"];

  // Charger les incidents depuis l'API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/incidents");
        const data = await response.json();

        if (data && data.length > 0) {
          const tableData = [
            ["Number", "Opened", "Assigned To", "State", "Assignment Group", "Requested For", "Resolved", "Closed", "Service"],
            ...data.map(inc => [
              inc.number,
              inc.opened ? new Date(inc.opened).toLocaleDateString() : "",
              inc.assignedTo || "",
              inc.state || "",
              inc.assignementGroup || "",
              inc.requestedfor || "",
              inc.resolved ? new Date(inc.resolved).toLocaleDateString() : "",
              inc.closed ? new Date(inc.closed).toLocaleDateString() : "",
              inc.service || ""
            ])
          ];
          setExcelData(tableData);
        } else {
          setExcelData([["Number", "Opened", "Assigned To", "State", "Assignment Group", "Requested For", "Resolved", "Closed", "Service"]]);
        }
      } catch (error) {
        console.error("Erreur fetch incidents :", error);
        setExcelData([["Number", "Opened", "Assigned To", "State", "Assignment Group", "Requested For", "Resolved", "Closed", "Service"]]);
      }
    };

    fetchIncidents();
  }, [dateLastImport]); // se relance après chaque import

  // Handlers sélection
  const handleSelectYearChange = (event) => setSelectedYear(event.target.value);
  const handleSelectMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleSelectWeekChange = (event) => setSelectedWeek(event.target.value);
  const handleSelectTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedMonth(0);
  };

  // Import Excel
  const handleClick = () => hiddenFileInput.current.click();

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/incidents/import-excel", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert(result);

      // mettre à jour la date du dernier import pour rafraîchir le tableau
      SetDateLastImport(getCurrentDateTimeString());

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'import");
    }

    // reset input pour pouvoir ré-importer le même fichier
    event.target.value = null;
  };

  // Fonction utilitaire pour formater la date
  const getCurrentDateTimeString = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    return `${ dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  // BOUTON UPDATE
  const handleFilterClick = () => {
    
  };

  //**************************************************************** */

  return (
    <div style={styles.divImport}>

      <h2 style={styles.title}>TRACKER</h2>
      <br />

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <button style={styles.btnImport} onClick={handleClick}>
        Import
      </button>

      <p style={styles.p2}> Last import : {dateLastImport}</p><br />

      <label style={{ marginRight: 15 }}>Year&nbsp;
        <select value={selectedYear} onChange={handleSelectYearChange}>
          <option value="">--All--</option>
          {tabYear.map((libYear, index) => (
            <option key={index} value={libYear}>{libYear}</option>
          ))}
        </select>
      </label>

      <label style={{ marginRight: 15 }}>Month&nbsp;
        <select value={selectedMonth} onChange={handleSelectMonthChange}>
          <option value="">--All--</option>
          {tabLibMonth.map((libMonth, index) => (
            <option key={index} value={String(index + 1).padStart(2, '0')}>{libMonth}</option>
          ))}
        </select>
      </label>

      <label>Week&nbsp;
        <select value={selectedWeek} onChange={handleSelectWeekChange}>
          <option value="">--All--</option>
          {tabNumWeek.map((numWeek, index) => (
            <option key={index} value={numWeek}>{String(numWeek)}</option>
          ))}
        </select>
      </label>

      <label>&nbsp;&nbsp;Type&nbsp;
        <select value={selectedType} onChange={handleSelectTypeChange}>
          <option value="">--All--</option>
          {tabType.map((numType, index) => (
            <option key={index} value={numType}>{numType}</option>
          ))}
        </select>
      </label>

      <button style={styles.btnUpdate} onClick={handleFilterClick}>
          Filter  
      </button>
      
      <br/><br/>

      
      <table style={styles.tableIncidents}>
        <tbody>
          {excelData && excelData.length > 0 && excelData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                rowIndex === 0
                  ? <th key={cellIndex} style={{ textAlign: "center", border: "1px solid black", backgroundColor: "cyan", padding: 5 }}>{cell}</th>
                  : <td key={cellIndex} style={{ border: "1px solid black", padding: 5 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DivPageTracker;