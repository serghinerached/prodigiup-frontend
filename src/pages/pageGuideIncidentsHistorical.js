import React, { useRef, useState, useEffect } from "react";
import { styles } from '../components/ComponentCss';
import { loadExcelHelpCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Icône "Edit" de FontAwesome


const API_URL = process.env.REACT_APP_BACKEND_URL;

const DivPageGuideIncidentsHistorical = () => {

  // DECLARATIONS
  const [excelHelpLoad, SetExcelHelpLoad] = useState([]);  
  const navigate = useNavigate();

  
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelHelpCotsList()];
      SetExcelHelpLoad(copyData);
    }
      fetchData();
  }, [])

  // click icone msg
  const handleIconHistClick = (id) => {
    navigate(`/Guides/requestsMessages/${id}`); // redirection vers /detail/id
  };

  //************************************************************************** */

  return (
    <div style={styles.divPageGuideRequests}>

      <h2 style={styles.title}>GUIDE: Incidents historical</h2>
      <br />

       <table style={styles.tableRequests}>
          <tbody>

            {excelHelpLoad.map((row, rowIndex) => {
              if(rowIndex === 0) {
                return (
                  <tr key={rowIndex}>
                    <th style={styles.tdIncidentsDatas}>{row[0]}</th> 
                    <th style={styles.tdIncidentsDatas}>{row[1]}</th> 
                    <th style={styles.tdIncidentsDatas}>Help</th> 
                  </tr>
                )
              } else {
                if(row[1] !== null){
                  return (
                  <tr key={rowIndex}>
                      <td style={styles.tdTabHistorical}>{row[0]}</td> 
                      <td style={styles.tdTabHistorical} >{row[1]}</td> 
                      <td style={styles.tdIncidentsCol4}>
                        <FaEdit size={20} style={styles.colMessages} onClick={() => handleIconHistClick(row[2])}/>
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

export default DivPageGuideIncidentsHistorical;