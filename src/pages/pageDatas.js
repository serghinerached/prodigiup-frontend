import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import listCots from "./listCots";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPageDatas = () => {

  const [incidentsDatas, setincidentsDatas] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [appliedYear, setAppliedYear] = useState("");
  const [appliedMonth, setAppliedMonth] = useState("");
  const [appliedWeek, setAppliedWeek] = useState("");
  const [appliedService, setAppliedService] = useState("");

  // ===== TABLEAU 2 =====
  const [selectedYear2, setSelectedYear2] = useState("");
  const [selectedMonth2, setSelectedMonth2] = useState("");
  const [selectedService2, setSelectedService2] = useState("");

  const [appliedYear2, setAppliedYear2] = useState("");
  const [appliedMonth2, setAppliedMonth2] = useState("");
  const [appliedService2, setAppliedService2] = useState("");

  const [dateLastImport, setDateLastImport] = useState("");
  const hiddenFileInput = useRef(null);

  const tabYear = ["2022", "2023", "2024", "2025","2026"];
  const tabYearSorted = [...tabYear].sort((a,b) => b.localeCompare(a));
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabnumMonth = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).sort((a,b) => b.localeCompare(a));
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);
  const tabService = ["DYMOLA ::C2A","Eclipse ::C2A","FLOWMASTER ::C2A","Hyperworks_Suite_AH","SaberRD ::C2A","Scade ::C2A",
    "TeXstudio ::C2A","Visual Studio ::C2A"];

  
  const formatDateFR = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  const fetchIncidents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tracker`);
      const data = await response.json();

        // 🔥 TRI décroissant sur "opened"
      data.sort((a, b) => new Date(b.opened) - new Date(a.opened));

      const tableData = [
        ["Number","Service","Week","Opened","Resolved","Mttr8Days"],
        ...data.map(inc => {
          return [
            inc.number || "",
            inc.service || "",
            inc.week || "",
            inc.opened || "",
            inc.resolved || "",
            inc.mttr || ""
          ];
        })
      ];

      setincidentsDatas(tableData);

    } catch (error) {
      console.error("Erreur fetch IncidentsResolved :", error);
      setincidentsDatas([["Number","Service","Week","Opened","Resolved","Mttr8Days"]]);
    }
  };


  useEffect(() => {
    fetchIncidents();
  }, [dateLastImport]);

  //-----------------

  const handleSelectYearChange = (event) => setSelectedYear(event.target.value);
  const handleSelectMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleSelectWeekChange = (event) => setSelectedWeek(event.target.value);
  const handleSelectServiceChange = (event) => setSelectedService(event.target.value);
  
  const handleFilterClick = () => {
    setAppliedYear(selectedYear);
    setAppliedMonth(selectedMonth);
    setAppliedWeek(selectedWeek);
    setAppliedService(selectedService);
  };

  const handleFilterClick2 = () => {
    setAppliedYear2(selectedYear2);
    setAppliedMonth2(selectedMonth2);
    setAppliedService2(selectedService2);
  };

  //----------------

  const filteredData = incidentsDatas.map((row,index) => {
    if(index===0) return row;

    const [number, service, weekStr, openedStr, resolvedStr, mttr8days] = row;
    const resolved = resolvedStr ? new Date(resolvedStr) : null;

    if(!resolvedStr || resolvedStr === "") return null;

    if(appliedYear && resolved && resolved.getFullYear().toString() !== appliedYear) return null;
    if(appliedMonth && resolved && (resolved.getMonth()+1).toString().padStart(2,'0') !== appliedMonth) return null;
    if(appliedWeek && weekStr.toString() !== appliedWeek) return null;
    if(appliedService && appliedService !== "" && service !== appliedService) return null;

    return row;
  }).filter(Boolean);

  //--------------------

  const IncidentsResolved = filteredData.slice(1); // sans le header

  const totalIncidentsTable1 = IncidentsResolved.length;

  let totalMttrTable1 = 0;

  IncidentsResolved.forEach(row => {
    const mttr = parseFloat(row[5]);
    if (!isNaN(mttr)) {
      totalMttrTable1 += mttr;
    }
  });

  const avgMttrTable1 = totalIncidentsTable1
    ? (totalMttrTable1 / totalIncidentsTable1).toFixed(2)
    : "";

   //--------------- 

  const filteredData2 = incidentsDatas.map((row,index) => {
    if(index===0) return row;

    const [number, service, weekStr, openedStr, resolvedStr, mttr8days] = row;
    const resolved = resolvedStr ? new Date(resolvedStr) : null;

    if(!resolvedStr || resolvedStr === "") return null;

    if(appliedYear2 && resolved && resolved.getFullYear().toString() !== appliedYear2) return null;
    if(appliedMonth2 && resolved && (resolved.getMonth()+1).toString().padStart(2,'0') !== appliedMonth2) return null;
    if(appliedService2 && service !== appliedService2) return null;

    return row;
  }).filter(Boolean);

  //----------

  const mttrByService = {};

  filteredData2.slice(1).forEach(row => {
    const [number, service, week, openedStr, resolvedStr, mttr8days] = row;

    // 👉 remplacer service vide par "UNKNOWN"
    const serviceKey = service && service.trim() !== "" ? service : "UNKNOWN";

    if (!mttrByService[serviceKey]) {
      mttrByService[serviceKey] = { count: 0, total: 0 };
    }

    // ✅ on compte TOUJOURS l'incident
    mttrByService[serviceKey].count += 1;

    // ✅ on ajoute au total SEULEMENT si mttr existe
    if (mttr8days !== "" && mttr8days !== null && mttr8days !== undefined) {
      mttrByService[serviceKey].total += parseFloat(mttr8days);
    }
  });

  //-------------------------

  const servicesToDisplay = appliedService2
    ? [appliedService2]
    : Object.keys(mttrByService).sort();

  let totalIncidents = 0;

  Object.values(mttrByService).forEach(s => {
    totalIncidents += s.count;
  });

  // ✅ NOUVEAU calcul global (moyenne des services)
  let totalServiceMttr = 0;
  let serviceCount = 0;

  Object.values(mttrByService).forEach(s => {
    if (s.count > 0) {
      totalServiceMttr += (s.total / s.count);
      serviceCount++;
    }
  });

  const globalMttr = serviceCount ? (totalServiceMttr / serviceCount).toFixed(2) : "";

    //********************************************* */

  return (
    <div style={{ marginLeft:'220px',marginBottom:'5px',textAlign:'left',}}>

      <h2 style={{ display: 'inline-block',fontweight:'bold',marginLeft:'500px',marginRight:50}}>INCIDENTS - Datas</h2>

      <p style={styles.p2}> Last import : {dateLastImport}</p>
      <br /> 

      <div style={{ display: 'flex'}}>

        {/* TABLEAU 1 */ } 
        <table style={{ borderCollapse : 'collapse'}}>
          <tbody>
 
            <tr>
              <th colSpan={6} style={{ textAlign:"left",border:"1px solid black",backgroundColor:"lightgreen",padding:3 }}>
 
                <label>Year&nbsp;
                  <select value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)}>
                    <option value="">--All--</option>
                    {tabYear.map((y,i)=><option key={i}>{y}</option>)}
                  </select>
                </label>
 
                <label>Month&nbsp;
                  <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)}>
                    <option value="">--All--</option>
                    {tabLibMonth.map((m,i)=>
                      <option key={i} value={String(i+1).padStart(2,'0')}>{m}</option>
                    )}
                  </select>
                </label>
 
                <label>Week&nbsp;
                  <select value={selectedWeek} onChange={(e)=>setSelectedWeek(e.target.value)}>
                    <option value="">--All--</option>
                    {tabNumWeek.map((w,i)=><option key={i}>{w}</option>)}
                  </select>
                </label>
 
                <label>Service&nbsp;
                  <select value={selectedService} onChange={(e)=>setSelectedService(e.target.value)}>
                    <option value="">--All--</option>
                    {listCots.map((cot,i)=><option key={i}>{cot}</option>)}
                  </select>
                </label>
 
                <button style={styles.btnUpdate} onClick={handleFilterClick}>Filter</button>
 
              </th>
            </tr>

            {/* HEADER */}
            <tr>
              {filteredData[0]?.map((cell, j) => (
                <th
                  key={j}
                  style={{
                    border: "1px solid black",
                    backgroundColor: "cyan",
                    padding: 3,
                    textAlign: "center"
                  }}
                >
                  {cell}
                </th>
              ))}
            </tr>

            {/* ✅ LIGNE TOTAL JUSTE APRÈS */}
            <tr>
              <th colSpan={4} style={{ textAlign:"center", border:"1px solid black", padding:3 }}></th>

              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3 }}>
                {totalIncidentsTable1}
              </th>

              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3 }}>
                {avgMttrTable1}
              </th>
            </tr>

            {/* DATA (sans le header) */}
            {filteredData.slice(1).map((row,i)=>(
              <tr key={i}>
                {row.map((cell,j)=>{

                  const value = parseFloat(cell);

                  let styleColor = {};

                  if (j === 5 && !isNaN(value)) {
                    if (value >= 8) {
                      styleColor = { background: "red", color: "white", fontWeight: "bold" };
                    } else if (value >= 6) {
                      styleColor = { background: "orange", color: "black", fontWeight: "bold" };
                    } else if (value >= 3) {
                      styleColor = { background: "yellow", color: "black" };
                    }
                  }

                  return (
                    <td
                      key={j}
                      style={{
                        border: "1px solid black",
                        textAlign: (j === 2  || j === 3  || j === 4 || j === 5) ? "center" : "left",
                        padding: 3,
                        ...styleColor
                      }}
                    >
                      {(j === 3 || j === 4) && cell ? formatDateFR(cell) : cell}
                    </td>
                  );
                })}
              </tr>
            ))}
 
          </tbody>
        </table>

        {/* TABLEAU 2*/ } 
        <table style={{ borderCollapse : 'collapse', marginLeft:'50px',height:'fit-content' }}>
          <tbody>
            <tr>
              <th colSpan={4} style={{ textAlign: "left", border: "1px solid black", backgroundColor: "lightgreen", padding: 3 }}>
                
                <label style={{ marginRight: 3 }}>Service&nbsp;
                  <select value={selectedService2} onChange={(e)=>setSelectedService2(e.target.value)}>
                    <option value="">--All--</option>
                    {listCots.map((cot, index) => (
                      <option key={index} value={cot}>{cot}</option>
                    ))}
                  </select>
                </label>
                
                <label style={{ marginRight: 5}}>Year&nbsp;
                  <select value={selectedYear2} onChange={(e)=>setSelectedYear2(e.target.value)}>
                    <option value="">--All--</option>
                    {tabYear.map((libYear,index)=> <option key={index} value={libYear}>{libYear}</option>)}
                  </select>
                </label>

                <label style={{ marginRight: 5 }}>Month&nbsp;
                  <select value={selectedMonth2} onChange={(e)=>setSelectedMonth2(e.target.value)}>
                    <option value="">--All--</option>
                    {tabLibMonth.map((libMonth,index)=> <option key={index} value={String(index+1).padStart(2,'0')}>{libMonth}</option>)}
                  </select>
                </label>

                <button style={styles.btnUpdate2} onClick={handleFilterClick2}>Filter</button>
              </th>
            </tr>

            <tr>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:3 }}>Service</th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:3 }}>Resolved</th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"cyan", padding:3 }}>Mttr8Days</th>
            </tr>

            <tr>
              <th style={{ textAlign:"center", border:"1px solid black", padding:3 }}></th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3 }}>{totalIncidents}</th>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3 }}>{globalMttr}</th>
            </tr>

            {servicesToDisplay.map((cot, index) => {
              const avgMttr = mttrByService[cot]
                ? (mttrByService[cot].total / mttrByService[cot].count)
                : null;

              return (
                <tr key={index}>
                  <td style={{ border:"1px solid black", padding:3, textAlign:"left" }}>
                    {cot}
                  </td>

                  <td style={{ border:"1px solid black", padding:3, textAlign:"center" }}>
                    {mttrByService[cot]?.count || 0}
                  </td>

                 <td
                  style={{
                    border: "1px solid black",
                    padding: 3,
                    textAlign: "center",

                    background:
                      avgMttr !== null
                        ? avgMttr >= 8
                          ? "red"
                          : avgMttr >= 6
                          ? "orange"
                          : avgMttr >= 3
                          ? "yellow"
                          : "white"
                        : "white",

                    color:
                      avgMttr !== null && avgMttr >= 8
                        ? "white"
                        : "black",

                    fontWeight:
                      avgMttr !== null && avgMttr >= 6
                        ? "bold"
                        : "normal"
                  }}
                >
                  {avgMttr !== null ? avgMttr.toFixed(2) : ""}
                </td>
                </tr>
              );
            })}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default DivPageDatas;