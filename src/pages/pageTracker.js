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

  // Formatter date
  const formatDateFR = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  // FETCH DATA
  const fetchIncidents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tracker`);
      const data = await response.json();

      // 🔥 TRI décroissant sur "opened"
      data.sort((a, b) => new Date(b.opened) - new Date(a.opened));

      const tableData = [
        ["Week","Opened","Number","Type","Assigned To","State","Assignment Group","Requested For","Resolved","Closed","Service"],
        ...data.map(inc => {
          return [
            inc.week ?? "",
            inc.opened ?? "",
            inc.number ?? "",
            inc.type ?? "",
            inc.assignedTo ?? "",
            inc.state ?? "",
            inc.assignmentGroup ?? "",
            inc.requestedFor ?? "",
            inc.resolved ?? "",
            inc.closed ?? "",
            inc.service ?? ""
          ];
        })
      ];

      setExcelData(tableData);

    } catch (error) {
      console.error("Erreur fetch incidents :", error);
      setExcelData([["Week","Opened","Number","Type","Assigned To","State","Assignment Group","Requested For","Resolved","Closed","Service"]]);
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
      const response = await fetch(`${API_URL}/api/tracker/import-excel`, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      console.log(result);

      if (!response.ok) {
        alert("Erreur import: " + result);
        return;
      }

      setDateLastImport(new Date().toLocaleString());

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'import");
    }

    event.target.value = null;
  };

  // Appliquer filtres
  const handleFilterClick = () => {
    setAppliedYear(selectedYear);
    setAppliedMonth(selectedMonth);
    setAppliedWeek(selectedWeek);
    setAppliedType(selectedType);
  };

  // FILTRAGE
  const filteredData = excelData.map((row,index) => {
    if(index===0) return row;

    const [weekStr, openedStr, number, type,assignedTo, state, assignmentGroup, requestedFor, resolvedStr, closedStr, service] = row;

    const opened = openedStr ? new Date(openedStr) : null;
    const week = weekStr || "";

    if(appliedYear && opened && opened.getFullYear().toString() !== appliedYear) return null;
    if(appliedMonth && opened && (opened.getMonth()+1).toString().padStart(2,'0') !== appliedMonth) return null;
    if(appliedWeek && week.toString() !== appliedWeek) return null;
    if(appliedType && type !== appliedType) return null;

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

      <table style={styles.tableStyle}>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                rowIndex === 0 ? (
                  <th key={cellIndex} style={styles.thStyle}>
                    {cell}
                  </th>
                ) : (
                  <td
                    key={cellIndex}
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      whiteSpace: "nowrap",
                      textAlign:
                        cellIndex === 3 || cellIndex === 7 || cellIndex === 10
                          ? "left"
                          : "center",
                      maxWidth:
                        cellIndex === 7 || cellIndex === 10 ? "150px" : "none",
                      overflow:
                        cellIndex === 7 || cellIndex === 10 ? "hidden" : "visible",
                      textOverflow:
                        cellIndex === 7 || cellIndex === 10 ? "ellipsis" : "clip"
                    }}
                  >
                    {(cellIndex === 1 || cellIndex === 8 || cellIndex === 9) && cell
                      ? formatDateFR(cell)
                      : cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DivPageTracker;