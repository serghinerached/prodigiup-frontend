import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import listCots from "./listCots";
import { FaSmile, FaMeh, FaFrown, FaAngry } from "react-icons/fa";

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
  const [dataIncidentsResolved, setDataIncidentsResolved] = useState([]);

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

  //---------------

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

  //---------------

  const getLast10Weeks = () => {
    const today = new Date();

    // semaine ISO courante
    const currentWeek = findWeek(today);

    return Array.from({ length: 10 }, (_, i) => {
      return currentWeek - 10 + i;
    });
  };

  const tabW10 = getLast10Weeks();

  //--------------

  const countIncidents = (tableInc,year, quarter) => {
    return tableInc
      .slice(1) // enlever header
      .filter(row =>
        row[1].toString() === year.toString() &&
        row[2] === quarter
      )
      .length;
  };

  //--------------------

  const currentYear = new Date().getFullYear();

  const countByWeek = (tableData, year, week) => {
    return tableData
      .slice(1)
      .filter(row =>
        Number(row[1]) === Number(year) &&
        row[3] === `W${week}`
      )
      .length;
  };

  //-----------------

  const countResolvedCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return dataIncidentsResolved.filter(inc => {
      const d = new Date(inc.resolved);

      return (
        d.getFullYear() === currentYear &&
        d.getMonth() === currentMonth
      );
    }).length;
  };

  //-----------------

  const countReopenCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return dataIncidentsResolved.filter(inc => {
      const d = new Date(inc.resolved);

      return (
        d.getFullYear() === currentYear &&
        d.getMonth() === currentMonth &&
        Number(inc.reopenCount || 0) > 0
      );
    }).length;
  };

  //-----------------

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
      setDataIncidentsResolved(dataIncidents);

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
        sctask.state === "Closed Complete" &&
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

      
       // Packagings-----------------------------------------------------
      const dataPackages = data.filter(pack =>
        pack.number &&
        pack.number.toLowerCase().includes("ritm") &&
        pack.resolved && pack.resolved !== ""
      );

      const tableQY_Packages = [
        ["Number","Year","Quarter","Week"],
        ...dataPackages.map(pack => {
          return [
            pack.number || "",
            findYear(pack.resolved) ,
            "Q" + findQuarter(pack.resolved),
            "W" + findWeek(pack.resolved)
          ];
        })
      ];
      setPackagesDatas(tableQY_Packages);
  
    } catch (error) {
      console.error("Erreur fetch performance1s :", error);
      setIncidentsDatas([["Number","Resolved"]]);
    }
  };

  useEffect(() => { // au demarrage 
    fetchDatas1();
  }, [dateLastImport]);

  //---------------------

  const getMttrMonthYear = (month, year) => {

    const incidentsMonth = dataIncidentsResolved.filter(inc => {
      const d = new Date(inc.resolved);

      return (
        d.getFullYear() === Number(year) &&
        d.getMonth() + 1 === Number(month) &&
        inc.service &&
        inc.mttr !== null &&
        inc.mttr !== undefined &&
        inc.mttr !== ""
      );
    });

    if (incidentsMonth.length === 0) return "N/A";

    // regroupement par service
    const services = {};

    incidentsMonth.forEach(inc => {
      const service = inc.service;

      if (!services[service]) {
        services[service] = [];
      }

      services[service].push(Number(inc.mttr));
    });

    // moyenne par service
    const avgByService = Object.values(services).map(mttrs => {
      return mttrs.reduce((sum, v) => sum + v, 0) / mttrs.length;
    });

    // moyenne des moyennes
    const mttrMonthYear =
      avgByService.reduce((sum, avg) => sum + avg, 0) /
      avgByService.length;

    return mttrMonthYear.toFixed(2);
  };

  //-------------------

  const graph2Data = {
    labels: tabW10.map(w => `W${w}`),

    datasets: [
      {
        label: "Incidents",
        data: tabW10.map(w =>
          countByWeek(incidentsDatas, currentYear, w)
        ),
        backgroundColor: "#FF6384"
      },

      {
        label: "Sctasks",
        data: tabW10.map(w =>
          countByWeek(sctasksDatas, currentYear, w)
        ),
        backgroundColor: "#36A2EB"
      },

      {
        label: "KBs",
        data: tabW10.map(w =>
          countByWeek(kbsDatas, currentYear, w)
        ),
        backgroundColor: "lightgreen"
      },

      {
        label: "Packages",
        data: tabW10.map(w =>
          countByWeek(packagesDatas, currentYear, w)
        ),
        backgroundColor: "grey"
      }
    ]
  };

  //--------

  // for tableau 3
  const currentMonth = new Date().getMonth() + 1;
  const libCurrentMonth = tabLibMonth[currentMonth - 1];
  const currentMonthPrev = new Date().getMonth();
  const libCurrentMonthPrev = tabLibMonth[currentMonthPrev - 1];
  const currentYearPrev = currentYear - 1;

  //-----------

  const getMttrIcon = (mttr) => {
    if (mttr < 3) {
      return <FaSmile color="green" size={20} />;
    }

    if (mttr < 6) {
      return <FaMeh color="gold" size={20} />;
    }

    if (mttr <= 8) {
      return <FaMeh color="orange" size={20} />;
    }

    return <FaAngry color="red" size={20} />;
  };

  const getSlaReopenIcon = (sr) => {
    if (sr < 1) {
      return <FaSmile color="green" size={20} />;
    }

    if (sr < 2) {
      return <FaMeh color="orange" size={20} />;
    }

    return <FaAngry color="red" size={20} />;
  };
  

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
      },
      {
        label: "Packages",
        data: tabYear.flatMap(year =>
          tabQ.map(q =>
            countIncidents(packagesDatas, year, q)
          )
        ),
        backgroundColor: "grey"
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


  const graph2Options = {
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

      <h2 style={{ display: 'inline-block',fontweight:'bold',marginLeft:'500px',marginRight:50}}>REPORTING : 2026-06-22</h2>

      <br /> 

      
      {/* Reporting 1 */}
      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>

        {/* tableau 1 */}
        <div >

          <table style={{borderCollapse: "collapse"}}>
            <thead>
              <tr>  
                <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"#B3CEFB",fontWeight:"bold",padding:"3px"}} colSpan={27}>QUARTERS</th>
                
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
               <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"#00B0F0",fontWeight:"bold",
                  padding:"3px"}} >TOTAL
              </th>
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
             <th
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  backgroundColor:"#002060",color:"white",fontWeight:"bold",
                  padding: "3px"
                }}
              ></th>,
            </tr>

            </thead>
            
            <tbody>

              {tabItem.map((item, i) => {
                const totalYear = tabYear.reduce((sum, year) => {
                    return (
                      sum +
                      tabQ.reduce((qSum, quarter) => {
                        return (
                          qSum +
                          (
                            item === "Incidents"
                              ? countIncidents(incidentsDatas, year, quarter)
                              : item === "Sctasks"
                              ? countIncidents(sctasksDatas, year, quarter)
                              : item === "KBs"
                              ? countIncidents(kbsDatas, year, quarter)
                              : item === "Packages"
                              ? countIncidents(packagesDatas, year, quarter)
                              : 0
                          )
                        );
                      }, 0)
                    );
                  }, 0);

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
                          : item === "Packages" ? countIncidents(packagesDatas, year, quarter)
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
                    <td style={{
                        textAlign: "center",
                        border: "1px solid black",
                        padding: "3px"
                    }}>  {totalYear} </td>

                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

        {/* GRAPHIQUE 1 */}
        <div style={{ width: "450px", border: "1px solid black", padding: "10px" }}>
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
               {tabW10.map((week,i)=>
                <th
                  key={i}
                  style={{
                    textAlign:"center",
                    border:"1px solid black",
                    backgroundColor:"#002060",
                    color:"white",
                    fontWeight:"bold",
                    padding:"3px"
                  }}
                >
                  W{week}
                </th>
              )}
              </tr>

            </thead>
            
          <tbody>

              {tabItem.map((item, i) => {

                return (
                  <tr key={i}>
                    <th style={{ textAlign:"center", border:"1px solid black", backgroundColor:"#B3CEFB",fontWeight:"bold", padding:3}}>
                      {item}
                    </th>

                    {tabW10.map((week, j) => (
                      <td
                        key={j}
                        style={{
                          textAlign:"center",
                          border:"1px solid black",
                          padding:"3px",
                        }}
                      >
                        {
                          item === "Incidents"
                            ? countByWeek(incidentsDatas, currentYear, week)
                            : item === "Sctasks"
                            ? countByWeek(sctasksDatas, currentYear, week)
                            : item === "KBs"
                            ? countByWeek(kbsDatas, currentYear, week)
                            : item === "Packages"
                            ? countByWeek(packagesDatas, currentYear,  week)
                            : ""
                        }
                      </td>
                    ))}      

                  </tr>
                );
              })}

            </tbody>
          </table>

        </div>

        {/* GRAPHIQUE 2 */}
        <div style={{ width: "400px", border: "1px solid black", padding: "10px", marginTop:"10px" }}>
          <Bar
            data={graph2Data}
            options={graph2Options}
          />
        </div>

        <div>
        
        {/* tableau 3 */}
          <table style={{borderCollapse: "collapse"}}>
            <thead>
              <tr>  
                <th style={{textAlign:"center",border:"1px solid black",backgroundColor:"yellow",padding:"3px"}} colSpan={2}>Incidents - {libCurrentMonth} {currentYear}</th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td style={{ textAlign:"left", border:"1px solid black", padding:3}}>
                  Resolved
                </td>
                <td style={{ textAlign:"center", border:"1px solid black", padding:3}}>
                  {countResolvedCurrentMonth()}
                </td>
                <td style={{ textAlign:"center", padding:3,fontSize:"20px"}}>
                </td>
              </tr>

               <tr>
                <td style={{ textAlign:"left", border:"1px solid black", padding:3 }}>
                  Mean Time To Resolve
                </td>

                <td style={{ textAlign:"center", border:"1px solid black", padding:3 }}>
                  {getMttrMonthYear(currentMonth, currentYear)}
                </td>

                <td style={{ textAlign:"center",  padding:3,verticalAlign:"middle"}}>
                  {getMttrIcon(2)}
                </td>
              </tr>

               <tr>
                <td style={{ textAlign:"left", border:"1px solid black", padding:3}}>
                  SLA Time breached
                </td>
                <td style={{ textAlign:"center", border:"1px solid black", padding:3}}>
                  {0}
                </td>
                <td style={{ textAlign:"center",  padding:3}}>
                  {getSlaReopenIcon(0)}
                </td>
              </tr>

               <tr>
                <td style={{ textAlign:"left", border:"1px solid black", padding:3}}>
                  Reopen  
                </td>
                <td style={{ textAlign:"center", border:"1px solid black", padding:3}}>
                  {countReopenCurrentMonth()}
                </td>
                <td style={{ textAlign:"center",  padding:3}}>
                  {getSlaReopenIcon(countReopenCurrentMonth())}
                </td>

              </tr>
              
            </tbody>
          </table>

        
        </div>      

      </div>

    </div>
  );
};

export default DivPageReporting;