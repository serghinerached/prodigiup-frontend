import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPagePerformance1 = () => {

  const [excelData, setExcelData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [appliedYear, setAppliedYear] = useState("");
  const [appliedMonth, setAppliedMonth] = useState("");
  const [appliedWeek, setAppliedWeek] = useState("");
  const [dateLastImport, setDateLastImport] = useState("");
  const hiddenFileInput = useRef(null);

  const tabYear = ["2022", "2023", "2024", "2025"];
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);

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

  // Charger les Performance1s depuis l'API
  const fetchPerformance1s = async () => {
    try {
      const response = await fetch(`${API_URL}/api/performance1s`);
      const data = await response.json();

      const tableData = [
        ["Opened","Week","Number","Service","opened","resolved","mttr8days"],
        ...data.map(perf => {
          const opened = perf.opened || "";
          const week = getISOWeek(opened);
          return [
            opened,
            week,
            perf.number || "",
            perf.service || "",
            perf.resolved || "",
            perf.mttr8days || "",
          ];
        })
      ];

      setExcelData(tableData);

    } catch (error) {
      console.error("Erreur fetch Performance1s :", error);
      setExcelData([["Opened","Week","Number","Service","opened","resolved","mttr8days"]]);
    }
  };

  useEffect(() => {
    fetchPerformance1s();
  }, [dateLastImport]);

  // Handlers sélection
  const handleSelectYearChange = (event) => setSelectedYear(event.target.value);
  const handleSelectMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleSelectWeekChange = (event) => setSelectedWeek(event.target.value);

  // Import Excel
  const handleClick = () => hiddenFileInput.current.click();

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/Performance1s/import-excel`, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert("Result: " + result);

      setDateLastImport(new Date().toLocaleString());
      fetchPerformance1s();

    } catch (error) {
      console.error("Error import : " + error);
      alert("Erreur lors de l'import");
    }

    event.target.value = null;
  };

  // Appliquer les filtres au clic sur Filter
  const handleFilterClick = () => {
    setAppliedYear(selectedYear);
    setAppliedMonth(selectedMonth);
    setAppliedWeek(selectedWeek);
  };

  // Filtrage côté front
  const filteredData = excelData.map((row,index) => {
    if(index===0) return row; // header

    const [openedStr, weekStr, number, service,resolvedStr, mttr8daysStr] = row;
    const opened = openedStr ? new Date(openedStr) : null;
    const week = weekStr || "";

    // Filtre Year
    if(appliedYear && opened && opened.getFullYear().toString() !== appliedYear) return null;

    // Filtre Month
    if(appliedMonth && opened && (opened.getMonth()+1).toString().padStart(2,'0') !== appliedMonth) return null;

    // Filtre Week
    if(appliedWeek && week.toString() !== appliedWeek) return null;

    return row;
  }).filter(Boolean);

  return (
    <div style={styles.divImport}>

      <h2 style={styles.title}>PERFORMANCE - MTTR/8</h2>
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
     
      <button style={styles.btnUpdate} onClick={handleFilterClick}>Filter</button>

      <br /><br />

      <table style={styles.tableIncidents}>
        <tbody>
          {filteredData && filteredData.length>0 && filteredData.map((row,rowIndex)=> (
            <tr key={rowIndex}>
              {row.map((cell,cellIndex)=> (
                rowIndex===0
                  ? <th key={cellIndex} style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:5 }}>{cell}</th>
                  : <td key={cellIndex} style={{ border:"1px solid black", padding:5 }}>
                      {cellIndex===0 && cell ? new Date(cell).toLocaleDateString('fr-FR') : cell}
                    </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DivPagePerformance1;