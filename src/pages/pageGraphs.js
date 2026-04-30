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


  const incidents = excelData.slice(1).filter(row => row[2]); // resolved non vide
  const incidentsByYearMonth = {};

  incidents.forEach(row => {
    const resolved = new Date(row[2]);
    const year = resolved.getFullYear().toString();
    const month = String(resolved.getMonth() + 1).padStart(2, "0");

    const key = `${year}-${month}`;

    incidentsByYearMonth[key] = (incidentsByYearMonth[key] || 0) + 1;
  });


  const fetchDatas1 = async () => {
    try {
      const response = await fetch(`${API_URL}/api/performance1s`);
      const data = await response.json();

      const tableData = [
        ["Number","Opened","Resolved","Mttr8Days"],
        ...data.map(inc => {
          const resolved = inc.resolved || "";
          const opened = inc.opened || "";
          const mttr8days = inc.mttr || "";
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

      <h2 style={{ display: 'inline-block',fontweight:'bold',marginLeft:'500px',marginRight:50}}>INCIDENTS - Graphs</h2>

      <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} /> 
      <button style={styles.btnImport} onClick={handleClick}>Import</button> 
      <p style={styles.p2}> Last import : {dateLastImport}</p>
      <br /> <br />

      <div >

      {/* TABLEAU 1 */}
      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>  
            <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"yellow",padding:"3px"}} colSpan={13}>INCIDENTS</th>
          </tr>
          <tr>  
            <th></th>
            {tabLibMonth.map((m,i)=>
              <th key={i} style={{textAlign:"center",border:"1px solid black",backgroundColor:"cyan",padding:"3px"}}>
                {m}
              </th>
            )}
            <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgreen",padding:"3px"}}>
              Total
            </th>
          </tr>
        </thead>
        
        <tbody>

          {tabYear.map((y, i) => {

            let totalYear = 0;

            return (
              <tr key={i}>
                <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3}}>
                  {y}
                </th>

                {tabLibMonth.map((m, j) => {
                  const month = String(j + 1).padStart(2,'0');
                  const key = `${y}-${month}`;
                  const value = incidentsByYearMonth[key] || 0;

                  totalYear += value;

                  return (
                    <td key={j} style={{textAlign:"center", border:"1px solid black",padding:"3px"}}>
                      {value === 0 ? "" : value}
                    </td>
                  );
                })}

                {/* ✅ COLONNE TOTAL */}
                <td style={{
                  textAlign:"center",
                  border:"1px solid black",
                  backgroundColor:"lightgreen",
                  fontWeight:"bold",
                  padding:"3px"
                }}>
                  {totalYear}
                </td>

              </tr>
            );
          })}

        </tbody>
      </table>

      <br /> <br />


      {/* TABLEAU 2 */}
      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>  
            <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"yellow",padding:"3px"}} colSpan={13}>MTTR / SERVICE</th>
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