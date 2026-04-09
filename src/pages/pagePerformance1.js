import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import listCots from "./listCots";

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
  const tabYearSorted = [...tabYear].sort((a,b) => b.localeCompare(a)); // tri décroissant
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabnumMonth = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).sort((a,b) => b.localeCompare(a));
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);
  const tabService = ["DYMOLA ::C2A","Eclipse ::C2A","FLOWMASTER ::C2A","Hyperworks_Suite_AH","SaberRD ::C2A","Scade ::C2A",
    "TeXstudio ::C2A","Visual Studio ::C2A"];

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

  //------------------------------

  const mttrByMonth = {};

  filteredData.slice(1).forEach(row => {
    const [number, service, week, openedStr, resolvedStr, mttr8days] = row;

    if (!openedStr || !mttr8days) return;

    const opened = new Date(openedStr);
    const year = opened.getFullYear().toString();
    const month = String(opened.getMonth() + 1).padStart(2, "0");

    const key = `${year}-${month}`;

    if (!mttrByMonth[key]) {
      mttrByMonth[key] = {
        count: 0,
        total: 0
      };
    }

    mttrByMonth[key].count += 1;
    mttrByMonth[key].total += parseFloat(mttr8days);
  });


  const mttrByService = {};

  filteredData.slice(1).forEach(row => {
    const [number, service, week, openedStr, resolvedStr, mttr8days] = row;

    if (!service || !mttr8days) return;

    if (!mttrByService[service]) {
      mttrByService[service] = {
        count: 0,
        total: 0
      };
    }

    mttrByService[service].count += 1;
    mttrByService[service].total += parseFloat(mttr8days);
});

  //********************************************************************* */

  return (
    <div style={{ marginLeft:'220px',marginBottom:'5px',textAlign:'left',}}>

      <h2 style={{ display: 'inline-block',fontweight:'bold',marginLeft:'500px',marginRight:50}}>PERFORMANCE - MTTR</h2>
      

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <button style={styles.btnImport} onClick={handleClick}>Import</button>

      <p style={styles.p2}> Last import : {dateLastImport}</p><br />

      <br />

      <div style={{ display: 'flex'}}>

        {/* TABLEAU 1*/ } 
        <table style={{ borderCollapse : 'collapse'}}>
          <tbody>

            <tr>
              <th
                colSpan={6}
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  backgroundColor: "lightgreen",
                  padding: 3
                }}
              >
              <label style={{ marginRight: 3}}>Year&nbsp;
          <select value={selectedYear} onChange={handleSelectYearChange}>
            <option value="">--All--</option>
            {tabYear.map((libYear,index)=> <option key={index} value={libYear}>{libYear}</option>)}
          </select>
        </label>

        <label style={{ marginRight: 3 }}>Month&nbsp;
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
            {listCots.map((cot, index) => (
              <option key={index} value={cot}>{cot}</option>
            ))}        
          </select>
        </label>

        <button style={styles.btnUpdate} onClick={handleFilterClick}>Filter</button>
              </th>
            </tr>

            {filteredData.map((row,rowIndex)=> (
              <tr key={rowIndex}>
                {row.map((cell,cellIndex)=> (
                  rowIndex===0
                    ? <th key={cellIndex} style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:3 }}>{cell}</th>
                    : <td key={cellIndex} 
                        style={{border:"1px solid black",padding:3,
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


        {/* TABLEAU 2*/ } 
        <table style={{ borderCollapse : 'collapse', marginLeft:'50px',height:'fit-content' }}>
          <tbody>
            <tr>
              <th
                colSpan={4}
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  backgroundColor: "lightgreen",
                  padding: 3
                }}
              >
                <label style={{ marginRight: 3 }}>Service&nbsp;
                  <select value={selectedYear} onChange={handleSelectYearChange}>
                    <option value="">--All--</option>
                    {listCots.map((cot, index) => (
                      <option key={index} value={cot}>{cot}</option>
                    ))}
                  </select>
                </label>
                
                <label style={{ marginRight: 5}}>Year&nbsp;
                  <select value={selectedYear} onChange={handleSelectYearChange}>
                    <option value="">--All--</option>
                    {tabYear.map((libYear,index)=> <option key={index} value={libYear}>{libYear}</option>)}
                  </select>
                </label>

                <label style={{ marginRight: 5 }}>Month&nbsp;
                  <select value={selectedMonth} onChange={handleSelectMonthChange}>
                    <option value="">--All--</option>
                    {tabLibMonth.map((libMonth,index)=> <option key={index} value={String(index+1).padStart(2,'0')}>{libMonth}</option>)}
                  </select>
                </label>

                <button style={styles.btnUpdate2} onClick={null}>Filter</button>
              </th>
            </tr>

            <tr>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:3 }}>Service</th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:3 }}>Incidents</th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:3 }}>Mttr8Days</th>
            </tr>

            <tr>
              <th style={{ textAlign:"center", border:"1px solid black", padding:3 }}></th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3 }}>{filteredData.length}</th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3 }}>2,5</th>
            </tr>
                
            {listCots.map((cot, index) => (
              <tr key={index} >
                <td style={{ border:"1px solid black", padding:3, textAlign:"left" }}>
                  {cot}
                </td>

                <td style={{ border:"1px solid black", padding:3, textAlign:"center" }}>
                  {mttrByService[cot]?.count || 0}
                </td>

                <td 
                  style={{ border:"1px solid black", padding:3, textAlign:"center", 
                          backgroundColor: mttrByService[cot] && (mttrByService[cot].total / mttrByService[cot].count) > 8 ? "red" : "transparent",
                          color: mttrByService[cot] && (mttrByService[cot].total / mttrByService[cot].count) > 8 ? "white" : "inherit",
                          fontWeight: mttrByService[cot] && (mttrByService[cot].total / mttrByService[cot].count) > 8 ? "bold" : "normal"
                        }}
                >
                  {mttrByService[cot]
                    ? (mttrByService[cot].total / mttrByService[cot].count).toFixed(2)
                    : ""}
                </td>

              </tr>
            ))}
                
            
          </tbody>
        </table>


      </div>
    </div>
  );
};

export default DivPagePerformance1;