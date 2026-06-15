import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import { loadExcelDataCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Icône "Edit" de FontAwesome


const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPageGuideRequests = () => {

  // DECLARATIONS
  const [excelDataLoad, SetExcelDataLoad] = useState([]);  
  const navigate = useNavigate();

  
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelDataCotsList()];
      SetExcelDataLoad(copyData);
    }
      fetchData();
  }, [])

  // click icone msg
  const handleIconClick = (id) => {
    navigate(`/Guides/requestsMessages/${id}`); // redirection vers /detail/id
  };

  //************************************************************************** */

  return (
    <div style={styles.divPageGuideRequests}>

      <h2 style={styles.title}>GUIDE: Access requests</h2>
      <br />

       <table style={styles.tableRequests}>
          <tbody>

            {excelDataLoad.map((row, rowIndex) => {
              if(rowIndex === 0) {
                return (
                  <tr key={rowIndex}>
                    <th style={styles.tdIncidentsDatas}>{row[0]}</th> 
                    <th style={styles.tdIncidentsDatas}>{row[3]}</th> 
                    <th style={styles.tdIncidentsDatas}>Message</th> 
                  </tr>
                )
              } else {
                if(row[4] !== null){
                  return (
                  <tr key={rowIndex}>
                      <td style={styles.tdIncidents}>{row[0]}</td> 
                      <td style={styles.tdIncidents} >{row[3]}</td> 
                      <td style={styles.tdIncidentsCol4}>
                        <FaEdit size={20} style={styles.colMessages} onClick={() => handleIconClick([row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11]])}/>
                      </td> 
                    </tr>
                  )
                }
              }

            })}
              
          </tbody>
        </table>
     
    </div>
  );
};

export default DivPageGuideRequests;