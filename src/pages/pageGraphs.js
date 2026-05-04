import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import listCots from "./listCots";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPageGraphs = () => {

  const [incidentsDatas, setIncidentsDatas] = useState([]);
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


  const IncidentsResolved = incidentsDatas.slice(1).filter(row => row[1]);
  const incidentsByYearMonth = {};

  IncidentsResolved.forEach(row => {
      const resolved = new Date(row[1]); // ✅ FIX
    const year = resolved.getFullYear().toString();
    const month = String(resolved.getMonth() + 1).padStart(2, "0");
    const key = `${year}-${month}`;
    incidentsByYearMonth[key] = (incidentsByYearMonth[key] || 0) + 1;
  });


  const fetchDatas1 = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tracker`);
      const data = await response.json();

      const tableData = [
        ["Number","Resolved","Service","Mttr8Days"],
        ...data.map(inc => {
          const resolved = inc.resolved || "";
          const service = inc.service || "";
          const mttr8days = inc.mttr || "";
          return [
            inc.number || "",
            resolved,
            service,
            mttr8days
          ];
        })
      ];

      setIncidentsDatas(tableData);

    } catch (error) {
      console.error("Erreur fetch performance1s :", error);
      setIncidentsDatas([["Number","Resolved","Service","Mttr8Days"]]);
    }
  };

  useEffect(() => {
    fetchDatas1();
  }, [dateLastImport]);

  //---mttr

  const mttrByYearMonthService = {};

  IncidentsResolved.forEach(row => {

    const resolved = new Date(row[1]); // ✅ FIX
    const year = resolved.getFullYear().toString();
    const month = String(resolved.getMonth() + 1).padStart(2, "0");
    const key = `${year}-${month}`;

    const service = row[2]; // ✅ FIX
    const mttr = parseFloat(row[3]); // OK

    if (!service || isNaN(mttr)) return;

    if (!mttrByYearMonthService[key]) {
      mttrByYearMonthService[key] = {};
    }

    if (!mttrByYearMonthService[key][service]) {
      mttrByYearMonthService[key][service] = [];
    }

    mttrByYearMonthService[key][service].push(mttr);
  });


  const getAvgMttrMonth = (key) => {
    const services = mttrByYearMonthService[key];
    if (!services) return null;

    let sum = 0;
    let count = 0;

    Object.values(services).forEach(list => {
      const avgService = list.reduce((a,b)=>a+b,0) / list.length;
      sum += avgService;
      count++;
    });

    return count > 0 ? sum / count : null;
  };

  //-----graphiques inc-----

  const colors = ["red", "blue", "green", "orange", "grey"];

  const chartData = {
    labels: tabLibMonth,
    datasets: tabYear.map((year, index) => {
      return {
        label: year,
        data: tabLibMonth.map((m, j) => {
          const month = String(j + 1).padStart(2, '0');
          const key = `${year}-${month}`;
          return incidentsByYearMonth[key] || 0;
        }),
        borderColor: colors[index % colors.length], // ✅ ICI
        borderWidth: 2,
        fill: false
      };
    })
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  //----graphique mttr-------------

  const mttrChartData = {
    labels: tabLibMonth,
    datasets: tabYear.map((year, index) => {
      return {
        label: year,
        data: tabLibMonth.map((m, j) => {
          const month = String(j + 1).padStart(2, '0');
          const key = `${year}-${month}`;
          const value = getAvgMttrMonth(key);
          return value !== null ? Number(value.toFixed(2)) : null;
        }),
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        fill: false,
        tension: 0.3
      };
    })
  };  

  const mttrChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "MTTR (jours)"
        }
      }
    }
  };

  //*********************** */

  return (
    <div style={{ marginLeft:'220px',marginBottom:'5px',textAlign:'left',}}>

      <h2 style={{ display: 'inline-block',fontweight:'bold',marginLeft:'500px',marginRight:50}}>INCIDENTS - Graphs</h2>

      <br /> 

      
      {/* TABLEAU 1 */}
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

        <div >

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
        </div>

        {/* GRAPH */}
      
        <div style={{ width: "600px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>

      </div>

      <br /> <br />


     {/* TABLEAU 2 */}
     <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

      <div>
        <table style={{borderCollapse: "collapse"}}>
          <thead>
            <tr>  
              <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"yellow",padding:"3px"}} colSpan={13}>MTTR</th>
            </tr>
            <tr>  
              <th></th>
              {tabLibMonth.map((m,i)=>
                <th key={i} style={{textAlign:"center",border:"1px solid black",backgroundColor:"cyan",padding:"3px"}}>
                  {m}
                </th>
              )}
              <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgreen",padding:"3px"}}>
                Average
              </th>
            </tr>
          </thead>
          
        <tbody>

            {tabYear.map((y, i) => {

              let mttrYear = 0;
              let countMonth = 0;

              return (
                <tr key={i}>
                  <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"lightgreen", padding:3}}>
                    {y}
                  </th>

                  {tabLibMonth.map((m, j) => {
                    const month = String(j + 1).padStart(2,'0');
                    const key = `${y}-${month}`;
                    const value = getAvgMttrMonth(key);

                    if (value !== null) {
                      mttrYear += value;
                      countMonth++;
                    }

                    // 🎯 STYLE DYNAMIQUE
                    let bgColor = "white";
                    let textColor = "black";
                    let fontWeight = "normal";

                    if (value !== null) {
                      if (value >= 8) {
                        bgColor = "red";
                        textColor = "white";
                        fontWeight = "bold";
                      } else if (value >= 6) {
                        bgColor = "orange";
                        fontWeight = "bold";
                      } else if (value >= 3) {
                        bgColor = "yellow";
                      }
                    }

                    return (
                      <td
                        key={j}
                        style={{
                          textAlign:"center",
                          border:"1px solid black",
                          padding:"3px",
                          background: bgColor,
                          color: textColor,
                          fontWeight: fontWeight
                        }}
                      >
                        {value !== null ? value.toFixed(2) : ""}
                      </td>
                    );
                  })}

                  {/* ✅ COLONNE AVERAGE */}
                  {(() => {
                    const avg = countMonth > 0 ? (mttrYear / countMonth) : null;

                    let bgColor = "lightgreen";
                    let textColor = "black";
                    let fontWeight = "bold";

                    if (avg !== null) {
                      if (avg >= 8) {
                        bgColor = "red";
                        textColor = "white";
                      } else if (avg >= 6) {
                        bgColor = "orange";
                      } else if (avg >= 3) {
                        bgColor = "yellow";
                      }
                    }

                    return (
                      <td style={{
                        textAlign:"center",
                        border:"1px solid black",
                        backgroundColor: bgColor,
                        color: textColor,
                        fontWeight: fontWeight,
                        padding:"3px"
                      }}>
                        {avg !== null ? avg.toFixed(2) : ""}
                      </td>
                    );
                  })()}

                </tr>
              );
            })}

          </tbody>
        </table>

      </div>


      <div style={{ width: "600px" }}>
        <Line data={mttrChartData} options={mttrChartOptions} />
      </div>
        </div>
    </div>
  );
};

export default DivPageGraphs;