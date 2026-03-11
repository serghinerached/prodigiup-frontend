import React, {useRef,useState, useEffect} from "react";
//import { loadExcelData } from '../components/ReadExcelFileData/ExcelLoader';
import {styles} from '../components/ComponentCss';


const DivPageTracker = () => {
 
    const [originalData, setOriginalData] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [needUpdate, setNeedUpdate] = useState(true);
    const [dateLastImport, SetDateLastImport] = useState();
    const hiddenFileInput = useRef(null);
 
    // Get Date Today
    useEffect(() => {
        const fToday = () => {
            const dateTodayString = new Date().toLocaleDateString("fr-FR") ;
            return dateTodayString;
        };
        const today = fToday();
        const YearToday = today.split("/")[2];
        setSelectedYear(YearToday);
        const monthToday = today.split("/")[1];
        setSelectedMonth(monthToday);
 /*
        const fetchData = async () => {
            const dataExcel = await loadExcelData();
            if (dataExcel && dataExcel.length > 0) {
                var copyData = [...dataExcel];
                SetDateLastImport(convertNumberToDateString(copyData[1][13]));
                copyData = parseColNumberToDateString(copyData);
                setOriginalData(copyData); // données prêtes à être filtrées
                setNeedUpdate(true); // déclenche le filtrage
            }
        };
        fetchData();
        */
    }, []);
 
   
    // CONVERSION NUMBER TO DATE STRING
    const parseExcelDateString = (excelDateNumber) => {
        const baseDate = new Date(1900, 0, 1);
        return (new Date(baseDate.getTime() + (excelDateNumber - 2) * 86400000)).toLocaleDateString();
    }

    // CONVERSION COLUMN NUMBER TO COLUMN DATE STRING
    const parseColNumberToDateString = (copyData) => {
      // Transformation des dates dans les colonnes 1, 11 et 12
      for (let a = 0; a < Object.keys(copyData[0]).length; a++) {
        copyData[a].splice(14, 1); // supp col 14
        const currentKey = Object.keys(copyData[0])[a];
        if (a === 2 || a === 10 || a === 11) {
          for (let b = 1; b < copyData.length; b++) {
              const cell = copyData[b][currentKey];
              if (typeof cell === "number") {
                  copyData[b][currentKey] = parseExcelDateString(cell);
              }
          }
        }
      }
      return copyData;
    }
 
    const filterByYearMonthOrWeek = (data, mois, annee,week,type) => {
        const year = `/${annee}`
        const yearMonthSearch = `/${mois}/${annee}`;

        if(annee === "" && mois === "" && week === "" && type === "") {
          return data.filter(row =>
            row[1] === "Week" 
          );
        } else {
            if(annee !== "" && mois === "" && week === ""  && type === "") {
              return data.filter(row =>
                row[1] === "Week" || row[2].includes(year)
              );
            } else {
                if(annee !== "" && mois !== "" && week === ""  && type === "") {
                  console.log(data )
                  return data.filter(row =>
                    row[1] === "Week" || row[2].includes(yearMonthSearch)
                  );
                } else {
                  if(annee !== "" && mois === 0 && week !== ""  && type === "") {
                    return data.filter(row =>
                      row[2].includes(year) && row[0] === parseInt(week)
                    );
                  } else { // test an = "" et week !== ""
                    if(annee === "" && week !== "") {
                      alert("Error : Please a year !!");
                      return null   
                    }

                    // test
                    else {
                      alert("ok");
                    }
                    //----
                  } 
                }
            } 
        }

        return null;
    };
 
    useEffect(() => {
        if (needUpdate && originalData.length > 0) {
            const filteredData = filterByYearMonthOrWeek(originalData, selectedMonth, selectedYear,selectedWeek,selectedType);
            setExcelData(filteredData);
            setNeedUpdate(false);
        }
    }, [needUpdate, selectedMonth, selectedYear, originalData]);
 

  // SELECT YEAR
  const tabYear = ["2022", "2023", "2024", "2025"];
  
  const handleSelectYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // SELECT MOIS
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const handleSelectMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // SELECT WEEK
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);

  const handleSelectTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedMonth(0);
  };

  // SELECT TYPE
  const tabType = ["Incident", "Request"];

  const handleSelectWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  // BOUTON UPDATE
  const handleUpdateClick = () => {
    setNeedUpdate(true);
  };

  // BOUTON IMPORT
    const handleClick = () => {
      hiddenFileInput.current.click();
    };
  
    // BOUTON FILE HIDDEN
  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/incidents/import-excel", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert(result); // "Import terminé" ou message d'erreur
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'import");
    }
  };

    // CONVERT NUMBER TO DATE STRING
  const convertNumberToDateString = (excelDateNumber) => {
    const baseDate = new Date(1900, 0, 1);
    return (new Date(baseDate.getTime() + (excelDateNumber - 2) * 86400000)).toLocaleDateString();
  }


  //**************************************************** */
 
  return (
    <div style={styles.divImport} >

       <input type="file" ref={hiddenFileInput} onClick={handleChange} style={{ display: 'none' }}  /> <br/>  
      <button style={styles.btnImport} onClick={handleClick}>
        Import  
      </button>
      
      <p style={styles.p2}> Last import2 : {dateLastImport}</p><br></br>
      
      <label style={{marginRight:15}}>Year&nbsp;
        <select id="selectYear" value={selectedYear} onChange={handleSelectYearChange} >
          <option value="">--All--</option>
          {tabYear.map((libYear,index) => (
            <option key={index} value={libYear}>{libYear}</option>
          ))}
        </select>
      </label>

      <label style={{marginRight:15}}>Month&nbsp;
        <select id="selectMonth" value={selectedMonth} onChange={handleSelectMonthChange} >
          <option value="">--All--</option>
          {tabLibMonth.map((libMonth, index) => (
            <option key={index} value={String(index + 1).padStart(2,'0')}>{libMonth}</option>
          ))}
        </select>
      </label>

      <label>Week&nbsp;
        <select id="selectWeek" value={selectedWeek} onChange={handleSelectWeekChange}>
          <option value="">--All--</option>
          {tabNumWeek.map((numWeek, index) => (
            <option key={index} value={numWeek}>{String(numWeek)}</option>
          ))}
        </select>
      </label>

      <label>&nbsp;&nbsp;Type&nbsp;
        <select id="selectType" value={selectedType} onChange={handleSelectTypeChange}>
          <option value="">--All--</option>
          {tabType.map((numType, index) => (
            <option key={index} value={numType}>{numType}</option>
          ))}
        </select>
      </label>
 
        <button style={styles.btnUpdate} onClick={handleUpdateClick}>
          Filter  
        </button>
 
        <h2 style={styles.title}>TRACKER</h2>
        <br/>
        <br/>
 
        <table style={styles.tableIncidents}>
                         
          <tbody>
            {excelData && excelData.length > 0 && excelData.map((row, rowIndex) => {
              // Affiche toujours l'en-tête (ligne 0)
              if (rowIndex === 0) {
                return (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <th style={{textAlign: "center",border: "1px solid black",backgroundColor: "lightgreen",padding: 5,}} key={cellIndex} >{cell}</th>
                    ))}
                  </tr>
                );
              }
           
              return (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td style={{ border: "1px solid black", padding: 5 }} key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              );
            })}
             
          </tbody>
        </table>
 
      </div>
  );
 
};
 
export default DivPageTracker;