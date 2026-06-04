import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import listCots from "./listCots";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Tooltip
} from 'chart.js';

import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Tooltip
);

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPageReporting = () => {

  const [incidentsDatas, setIncidentsDatas] = useState([]);
  const [sctasksDatas, setSctasksDatas] = useState([]);
  const [kbsDatas, setKbsDatas] = useState([]);
  const [packagesDatas, setPackagesDatas] = useState([]);
  const [dateLastImport, setDateLastImport] = useState("");
  const hiddenFileInput = useRef(null);
  const tabYear = ["2022", "2023", "2024", "2025","2026"];
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const tabnumMonth = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).sort((a,b) => b.localeCompare(a));

  const tabItem =["Sctasks","Incidents","Packages","KBs"];
  const tabQ = ["Q1","Q2","Q3","Q4"];
  const tabW10 = ["W10","W9","W8","W7","W6","W5","W4","W3","W2","W1"];


  //---- fonctions utiles ----

  const formatDateFR = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };
  
   const findYear = (dateItem) => {
    const date = new Date(dateItem);
    const year = date.getFullYear();
    return year;
  };

  const findQuarter = (dateItem) => {
    const date = new Date(dateItem);
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return quarter;
  };

  const findWeek = (dateString) => {
    const date = new Date(dateString);
    // copie UTC
    const d = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ));
    // jeudi de la semaine courante
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // début année
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // calcul semaine ISO
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };

  const countIncidents = (tableInc,year, quarter) => {
    return tableInc
      .slice(1) // enlever header
      .filter(row =>
        row[1].toString() === year.toString() &&
        row[2] === quarter
      )
      .length;
  };

  //-------------------

  const fetchDatas1 = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tracker`);
      const data = await response.json();

       // 🔥 TRI décroissant sur "opened" = FALCUTATIF
      //data.sort((a, b) => new Date(b.opened) - new Date(a.opened));

      // incidents--------------------------------------------
      const dataIncidents = data.filter(inc =>
        inc.number &&
        inc.number.toLowerCase().includes("inc") &&
        inc.resolved && inc.resolved !== ""
      );

      const tableQY_Incidents = [
        ["Number","Year","Quarter","Week"],
        ...dataIncidents.map(inc => {
          return [
            inc.number || "",
            findYear(inc.resolved) ,
            "Q" + findQuarter(inc.resolved),
            "W" + findWeek(inc.resolved)
          ];
        })
      ];
      setIncidentsDatas(tableQY_Incidents);

      // sctasks-----------------------------------------------------
      const dataSctasks = data.filter(sctask =>
        sctask.number &&
        sctask.number.toLowerCase().includes("sctask") &&
        sctask.resolved && sctask.resolved !== ""
      );

      const tableQY_Sctasks = [
        ["Number","Year","Quarter","Week"],
        ...dataSctasks.map(sctask => {
          return [
            sctask.number || "",
            findYear(sctask.resolved) ,
            "Q" + findQuarter(sctask.resolved),
            "W" + findWeek(sctask.resolved)
          ];
        })
      ];
      setSctasksDatas(tableQY_Sctasks);

      // kbs-----------------------------------------------------
      const dataKbs = data.filter(kb =>
        kb.number &&
        kb.number.toLowerCase().includes("kb") &&
        kb.resolved && kb.resolved !== ""
      );

      const tableQY_Kbs = [
        ["Number","Year","Quarter","Week"],
        ...dataKbs.map(kb => {
          return [
            kb.number || "",
            findYear(kb.resolved) ,
            "Q" + findQuarter(kb.resolved),
            "W" + findWeek(kb.resolved)
          ];
        })
      ];
      setKbsDatas(tableQY_Kbs);

      /*
       // Packagings-----------------------------------------------------
      const dataPackages = data.filter(package =>
        package.number &&
        package.number.toLowerCase().includes("sctask") &&
        package.resolved && package.resolved !== ""
      );

      const tableQY_Packages = [
        ["Number","Year","Quarter","Week"],
        ...dataPackages.map(package => {
          return [
            package.number || "",
            findYear(package.resolved) ,
            "Q" + findQuarter(package.resolved),
            "W" + findWeek(package.resolved)
          ];
        })
      ];
      setPackagesDatas(tableQY_Packages);
  */
    } catch (error) {
      console.error("Erreur fetch performance1s :", error);
      setIncidentsDatas([["Number","Resolved"]]);
    }
  };

  useEffect(() => { // au demarrage 
    fetchDatas1();
  }, [dateLastImport]);

  
  //-----graphiques -----

  const quarterLabels = tabYear.flatMap(year =>
    tabQ.map(q => `${year}-${q}`)
  );

  const graph1Data = {
    labels: quarterLabels,

    datasets: [

      {
        label: "Incidents",
        data: tabYear.flatMap(year =>
          tabQ.map(q =>
            countIncidents(incidentsDatas, year, q)
          )
        ),
        backgroundColor: "#FF6384"
      },

      {
        label: "Sctasks",
        data: tabYear.flatMap(year =>
          tabQ.map(q =>
            countIncidents(sctasksDatas, year, q)
          )
        ),
        backgroundColor: "#36A2EB"
      },

      {
        label: "Kbs",
        data: tabYear.flatMap(year =>
          tabQ.map(q =>
            countIncidents(kbsDatas, year, q)
          )
        ),
        backgroundColor: "lightgreen"
      }

    ]
  };

  const graph1Options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top"
      }
    },

    scales: {

      x: {
        stacked: true
      },

      y: {
        stacked: true,
        beginAtZero: true
      }

    }
  };

 
  //*********************** */

  return (
    <div style={{ marginLeft:'220px',marginBottom:'5px',textAlign:'left',}}>

      <h2 style={{ display: 'inline-block',fontweight:'bold',marginLeft:'500px',marginRight:50}}>REPORTING : 2026-05-19</h2>

      <br /> 

      
      {/* Reporting 1 */}
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

        {/* tableau 1 */}
        <div >

          <table style={{borderCollapse: "collapse"}}>
            <thead>
              <tr>  
                <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"#B3CEFB",fontWeight:"bold",padding:"3px"}} colSpan={25}>QUARTERS</th>
              </tr>

              <tr>
              <th></th>

              {tabYear.flatMap((year, i) => ([
                
                // ✅ année
                <th
                  key={i}
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    border: "1px solid black",
                    backgroundColor: "#00B0F0",fontWeight:"bold",
                    padding: "3px"
                  }}
                >
                  {year}
                </th>,

                // ✅ espace après chaque année
                <th
                  key={`year-space-${i}`}
                  style={{
                    width: "20px",
                    minWidth: "20px",
                    border: "none",
                    backgroundColor: "white"
                  }}
                />

              ]))}
            </tr>

            <tr>
              <th></th>

              {tabYear.flatMap((year, i) => ([

                ...tabQ.flatMap((quarter, j) => [

                  // ✅ quarter
                  <th
                    key={`${i}-${j}`}
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      backgroundColor:"#002060",color:"white",fontWeight:"bold",
                      padding: "3px"
                    }}
                  >
                    {quarter}
                  </th>,

                  

                ]),

                // ✅ espace après Q4 / après année
                <th
                  key={`end-year-${i}`}
                  style={{
                    width: "20px",
                    minWidth: "20px",
                    border: "none",
                    backgroundColor: "#F5F5F5"
                  }}
                />

              ]))}
            </tr>

            </thead>
            
            <tbody>

              {tabItem.map((item, i) => {

                let totalYear = 0;

                return (
                  <tr key={i}>
                    <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"#B3CEFB",fontWeight:"bold", padding:3}}>
                      {item}
                    </th>

                    {/* details */}

                   {tabYear.flatMap((year, i) => ([
                      ...tabQ.flatMap((quarter, j) => [

                        // ✅ quarter
                        <td
                          key={`${i}-${j}`}
                          style={{
                            textAlign: "center",
                            border: "1px solid black",
                            padding: "3px"
                          }}
                        >
                         {item === "Incidents" ? countIncidents(incidentsDatas, year, quarter)
                          : item === "Sctasks" ? countIncidents(sctasksDatas, year, quarter)
                          : item === "KBs" ? countIncidents(kbsDatas, year, quarter)
                      //    : item === "Packages" ? countIncidents(packagesDatas, year, quarter)
                          : ""}
                        </td>,
                      ]),

                      // ✅ espace après Q4 / après année
                      <th
                        key={`end-year-${i}`}
                        style={{
                          width: "20px",
                          minWidth: "20px",
                          border: "none",
                        }}
                      />

                    ]))} 

                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

        {/* GRAPHIQUE 1 */}
        <div style={{ width: "600px", border: "1px solid black", padding: "10px" }}>
          <Bar
            data={graph1Data}
            options={graph1Options}
          />        
        </div>

      </div>

      <br /> <br />


      {/* ****** Reporting 2 */}
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

        {/* tableau 2 */}        
        <div style={{ padding: "10px",width:"fit-content" }}>
          <table style={{borderCollapse: "collapse"}}>
            <thead>

              <tr>  
                <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"#B3CEFB",padding:"3px"}} colSpan={14}>LAST 10 WEEKS</th>
              </tr>
              <tr>  
                <th></th>
                {tabW10.map((w,i)=>
                  <th key={i} style={{textAlign:"center",border:"1px solid black",backgroundColor:"#002060",color:"white",fontWeight:"bold",padding:"3px"}}>
                    {w}
                  </th>
                )}
              </tr>

            </thead>
            
          <tbody>

              {tabItem.map((item, i) => {

                let mttrYear = 0;
                let countMonth = 0;

                return (
                  <tr key={i}>
                    <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"#B3CEFB",fontWeight:"bold", padding:3}}>
                      {item}
                    </th>

                    {tabW10.map((w, j) => {

                      return (
                        <td
                          key={j}
                          style={{
                            textAlign:"center",
                            border:"1px solid black",
                            padding:"3px",
                          }}
                        >
                          {w}
                        </td>
                      );
                    })}                

                  </tr>
                );
              })}

            </tbody>
          </table>

        </div>

        {/* GRAPHIQUE 2 */}
        <div style={{ width: "600px", border: "1px solid black", padding: "10px",marginTop:"10px" }}>
              Graphique 2
        </div>

      </div>

    </div>
  );
};

export default DivPageReporting;