import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import listCots from "./listCots";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPageGraphs = () => {

  const [excelData, setExcelData] = useState([]);
  const [dateLastImport, setDateLastImport] = useState("");
  const hiddenFileInput = useRef(null);
  const tabYear = ["2022", "2023", "2024", "2025","2026"];
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabnumMonth = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).sort((a,b) => b.localeCompare(a));
  const tabService = ["DYMOLA ::C2A","Eclipse ::C2A","FLOWMASTER ::C2A","Hyperworks_Suite_AH","SaberRD ::C2A","Scade ::C2A",
    "TeXstudio ::C2A","Visual Studio ::C2A"];

  const formatDateFR = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  const calculateMttr8Days = (openedStr, resolvedStr) => {
    if (!openedStr || !resolvedStr) return "";

    const start = new Date(openedStr);
    const end = new Date(resolvedStr);

    let totalMs = 0;
    let current = new Date(start);

    while (current < end) {
      const day = current.getDay();

      if (day !== 0 && day !== 6) {
        const endOfDay = new Date(current);
        endOfDay.setHours(23, 59, 59, 999);
        const segmentEnd = end < endOfDay ? end : endOfDay;
        totalMs += (segmentEnd - current);
      }

      current.setHours(0, 0, 0, 0);
      current.setDate(current.getDate() + 1);
    }

    const days = totalMs / (1000 * 60 * 60 * 24);
    return Number(days).toFixed(2);
  };

  const fetchDatas1 = async () => {
    try {
      const response = await fetch(`${API_URL}/api/performance1s`);
      const data = await response.json();

      const tableData = [
        ["Number","Opened","Resolved","Mttr8Days"],
        ...data.map(inc => {
          const resolved = inc.resolved || "";
          const opened = inc.opened || "";
          const mttr8days = calculateMttr8Days(opened,resolved);
          return [
            inc.number || "",
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
    fetchDatas1();
  }, [dateLastImport]);


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
 


  //*********************** */

  return (
    <div style={{ marginLeft:'220px',marginBottom:'5px',textAlign:'left',}}>

      <h2 style={{ display: 'inline-block',fontweight:'bold',marginLeft:'500px',marginRight:50}}>PERFORMANCE - Graphs</h2>

      <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} /> 
      <button style={styles.btnImport} onClick={handleClick}>Import</button> 
      <p style={styles.p2}> Last import : {dateLastImport}</p>
      <br /> <br />

      <div >

      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>  
            <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"yellow",padding:"3px"}} colSpan={13}>INCIDENTS</th>
          </tr>
          <tr>  
            <th></th>
             {tabLibMonth.map((m,i)=>
                <th key={i} value={String(i+1).padStart(2,'0')} style={{textAlign:"center",border:"1px solid black",backgroundColor:"cyan",padding:"3px"}}>{m}</th>
              )} 
          </tr>
        </thead>
        <tbody>

          {tabYear.map((y,i)=>
            <tr key={i} value={String(i+1).padStart(2,'0')}>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3}}>{y}</th>
              {tabLibMonth.map((m,i)=>
                <td key={i} value={String(i+1).padStart(2,'0')} style={{textAlign:"center", border:"1px solid black",padding:"3px"}}>{i}</td>
              )} 
            </tr>
          )} 

         
        </tbody>
      </table>

      <br /> <br />


      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>  
            <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"yellow",padding:"3px"}} colSpan={13}>MTTR</th>
          </tr>
          <tr>  
            <th></th>
             {tabLibMonth.map((m,i)=>
                <th key={i} value={String(i+1).padStart(2,'0')} style={{textAlign:"center",border:"1px solid black",backgroundColor:"cyan",padding:"3px"}}>{m}</th>
              )} 
          </tr>
        </thead>
        <tbody>

          {tabYear.map((y,i)=>
            <tr key={i} value={String(i+1).padStart(2,'0')}>
              <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3}}>{y}</th>
              {tabLibMonth.map((m,i)=>
                <td key={i} value={String(i+1).padStart(2,'0')} style={{textAlign:"center", border:"1px solid black",padding:"3px"}}>{i}</td>
              )} 
            </tr>
          )} 

         
        </tbody>
          </table>
        
      </div>
    </div>
  );
};

export default DivPageGraphs;