import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPagePerformance1 = () => {

  const [excelData, setExcelData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [appliedYear, setAppliedYear] = useState("");
  const [appliedMonth, setAppliedMonth] = useState("");
  const [appliedWeek, setAppliedWeek] = useState("");
  const [appliedService, setAppliedService] = useState("");
  const [dateLastImport, setDateLastImport] = useState("");
  const hiddenFileInput = useRef(null);

  const tabYear = ["2022", "2023", "2024", "2025","2026"];
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);
  const tabService = ["visual Studio ::C2A", "Eclispe ::C2A"];

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

  // Calculer Mttr8Days (jours ouvrés)
  const calculateMttr8Days = (openedStr, resolvedStr) => {
    if (!openedStr || !resolvedStr) return "";

    const start = new Date(openedStr);
    const end = new Date(resolvedStr);

    let totalMs = 0;
    let current = new Date(start);

    while (current < end) {
      const day = current.getDay();

      // Si jour ouvré
      if (day !== 0 && day !== 6) {
        // fin de la journée (23:59:59)
        const endOfDay = new Date(current);
        endOfDay.setHours(23, 59, 59, 999);

        const segmentEnd = end < endOfDay ? end : endOfDay;

        totalMs += (segmentEnd - current);
      }

      // passer au jour suivant à minuit
      current.setHours(0, 0, 0, 0);
      current.setDate(current.getDate() + 1);
    }

    // conversion ms → jours
    const days = totalMs / (1000 * 60 * 60 * 24);

    return Number(days).toFixed(2);
  };

  // Charger les performance1s depuis l'API
  const fetchPerformance1s = async () => {
    try {
      const response = await fetch(`${API_URL}/api/performance1s`);
      const data = await response.json();

      const tableData = [
        ["Number","Service","Week","Opened","Resolved","Mttr8Days"],
        ...data.map(inc => {
          const opened = inc.opened || "";
          const resolved = inc.resolved || "";
          const week = getISOWeek(opened);
          const mttr8days = calculateMttr8Days(opened,resolved);
          return [
            inc.number || "",
            inc.service || "",
            week,
            opened,
            resolved,
            mttr8days
          ];
        })
      ];

      setExcelData(tableData);

    } catch (error) {
      console.error("Erreur fetch performance1s :", error);
      setExcelData([["Number","Service","Week","Opened","Resolved","Mttr8Days"]]);
    }
  };

  useEffect(() => {
    fetchPerformance1s();
  }, [dateLastImport]);

  // Handlers sélection
  const handleSelectYearChange = (event) => setSelectedYear(event.target.value);
  const handleSelectMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleSelectWeekChange = (event) => setSelectedWeek(event.target.value);
  const handleSelectServiceChange = (event) => setSelectedService(event.target.value);

  // Import Excel
  const handleClick = () => hiddenFileInput.current.click();

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/performance1s/import-excel`, {
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
    setAppliedService(selectedService);
  };

  // Filtrage côté front
  const filteredData = excelData.map((row,index) => {
    if(index===0) return row; // header

    const [number, service, weekStr, openedStr, resolvedStr, mttr8days] = row;
    const opened = openedStr ? new Date(openedStr) : null;

    // ✅ FILTRE GLOBAL : exclure si Resolved vide
    if(!resolvedStr || resolvedStr === "") return null;

    // Filtres utilisateur
    if(appliedYear && opened && opened.getFullYear().toString() !== appliedYear) return null;
    if(appliedMonth && opened && (opened.getMonth()+1).toString().padStart(2,'0') !== appliedMonth) return null;
    if(appliedWeek && weekStr.toString() !== appliedWeek) return null;
    if(appliedService && appliedService !== "" && service !== appliedService) return null;

    return row;
  }).filter(Boolean);

  //********************************************************************* */

  return (
    <div style={styles.divImport}>

      <h2 style={styles.title}>PERFORMANCE - MTTR</h2>
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

      <label>&nbsp;&nbsp;Service&nbsp;
        <select value={selectedService} onChange={handleSelectServiceChange}>
          <option value="">--All--</option>
          {tabService.map((numService,index)=> <option key={index} value={numService}>{numService}</option>)}
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
                  : <td key={cellIndex} style={{border:"1px solid black",padding:5,
                                                ...(cellIndex===5 && parseFloat(cell) > 8 ? { backgroundColor:"red", color:"white", fontWeight:"bold" } : {})
                                              }}
                    >
                    {(cellIndex===3 || cellIndex===4) && cell ? formatDateFR(cell) : cell}
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