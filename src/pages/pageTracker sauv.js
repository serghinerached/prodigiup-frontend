import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPageTracker = () => {

  const [excelData, setExcelData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [appliedYear, setAppliedYear] = useState("");
  const [appliedMonth, setAppliedMonth] = useState("");
  const [appliedWeek, setAppliedWeek] = useState("");
  const [appliedType, setAppliedType] = useState("");
  const [dateLastImport, setDateLastImport] = useState("");
  const hiddenFileInput = useRef(null);

  const tabYear = ["2022", "2023", "2024", "2025","2026"];
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);
  const tabType = ["Incident", "Request"];

  // Calculer la semaine ISO
  const getISOWeek = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7; // lundi=0
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = new Date(target.getFullYear(),0,4);
    const weekNumber = 1 + Math.round(((target - firstThursday)/86400000 - 3 + ((firstThursday.getDay()+6)%7))/7);
    return weekNumber;
  };

  // Formatter date dd/mm/yyyy
  const formatDateFR = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  // Charger les incidents depuis l'API
  const fetchIncidents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/incidents`);
      const data = await response.json();

      const tableData = [
        ["Week","Opened","Number","Assigned To","State","Assignment Group","Requested For","Resolved","Closed","Service"],
        ...data.map(inc => {
          const week = getISOWeek(inc.opened);
          const opened = inc.opened || "";
          return [
            week,
            opened,
            inc.number || "",
            inc.assignedTo || "",
            inc.state || "",
            inc.assignmentGroup || "",
            inc.requestedfor || "",
            inc.resolved || "",
            inc.closed || "",
            inc.service || ""
          ];
        })
      ];

      setExcelData(tableData);

    } catch (error) {
      console.error("Erreur fetch incidents :", error);
      setExcelData([["Week","Opened","Number","Assigned To","State","Assignment Group","Requested For","Resolved","Closed","Service"]]);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [dateLastImport]);

  // Handlers sélection
  const handleSelectYearChange = (event) => setSelectedYear(event.target.value);
  const handleSelectMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleSelectWeekChange = (event) => setSelectedWeek(event.target.value);
  const handleSelectTypeChange = (event) => setSelectedType(event.target.value);

  // Import Excel
  const handleClick = () => hiddenFileInput.current.click();

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/incidents/import-excel`, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert(result);

      setDateLastImport(new Date().toLocaleString());

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'import");
    }

    event.target.value = null;
  };

  // Appliquer les filtres au clic sur Filter
  const handleFilterClick = () => {
    setAppliedYear(selectedYear);
    setAppliedMonth(selectedMonth);
    setAppliedWeek(selectedWeek);
    setAppliedType(selectedType);
  };

  // Filtrage côté front
  const filteredData = excelData.map((row,index) => {
    if(index===0) return row; // header

    const [openedStr, weekStr, number, assignedTo, state, assignmentGroup, requestedFor, resolvedStr, closedStr, service] = row;
    const opened = openedStr ? new Date(openedStr) : null;
    const week = weekStr || "";

    if(appliedYear && opened && opened.getFullYear().toString() !== appliedYear) return null;
    if(appliedMonth && opened && (opened.getMonth()+1).toString().padStart(2,'0') !== appliedMonth) return null;
    if(appliedWeek && week.toString() !== appliedWeek) return null;

    if(appliedType && appliedType!=="") {
      if(appliedType==="Incident" && !number.toLowerCase().includes("inc")) return null;
      if(appliedType==="Request" && !number.toLowerCase().includes("req")) return null;
    }

    return row;
  }).filter(Boolean);

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

      <button style={styles.btnImport} onClick={handleClick}>Import</button>

      <p style={styles.p2}> Last import : {dateLastImport}</p><br />

      <label style={{ marginRight: 15 }}>Year&nbsp;
        <select value={selectedYear} onChange={handleSelectYearChange}>
          <option value="">--All--</option>
          {tabYear.map((libYear,index)=> <option key={index} value={libYear}>{libYear}</option>)}
        </select>
      </label>

      <label style={{ marginRight: 15 }}>Month&nbsp;
        <select value={selectedMonth} onChange={handleSelectMonthChange}>
          <option value="">--All--</option>
          {tabLibMonth.map((libMonth,index)=> <option key={index} value={String(index+1).padStart(2,'0')}>{libMonth}</option>)}
        </select>
      </label>

      <label>Week&nbsp;
        <select value={selectedWeek} onChange={handleSelectWeekChange}>
          <option value="">--All--</option>
          {tabNumWeek.map((numWeek,index)=> <option key={index} value={numWeek}>{numWeek}</option>)}
        </select>
      </label>

      <label>&nbsp;&nbsp;Type&nbsp;
        <select value={selectedType} onChange={handleSelectTypeChange}>
          <option value="">--All--</option>
          {tabType.map((numType,index)=> <option key={index} value={numType}>{numType}</option>)}
        </select>
      </label>

      <button style={styles.btnUpdate} onClick={handleFilterClick}>Filter</button>

      <br /><br />

      <table style={styles.tableIncidents}>
        <tbody>
          {filteredData.map((row,rowIndex)=> (
            <tr key={rowIndex}>
              {row.map((cell,cellIndex)=> (
                rowIndex===0
                  ? <th key={cellIndex} style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:5 }}>{cell}</th>
                  : <td key={cellIndex} style={{ border:"1px solid black", padding:5 }}>
                      {(cellIndex===1 || cellIndex ===7 || cellIndex ===8) && cell ? formatDateFR(cell) : cell}
                    </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DivPageTracker;