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
    <div style={styles.divPageGuideRequests }>

      <h2 style={styles.title}>GUIDE: Access requests</h2>
      <br />

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

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

        <table style={styles.tableRequests}>
          <tbody>
            <tr>
              <td style={{border:"1px solid black",textAlign:"left"}}>
s
                  <svg width="630" height="650" >
                
                    <polygon points="153,60 223,85 153,110 83,85" fill={"orange"} />
                    <text x="153" y="90" textAnchor="middle" fill="black">Net User ?</text>
                    <line x1="220" y1="85" x2="263" y2="85" stroke="black" markerEnd="url(#arrow)" />

                    <polygon points="353,55 443,85 353,115 263,85" fill={"orange"} />
                    <text x="353" y="90" textAnchor="middle" fill="black">Need Approval ?</text>
                    <line x1="441" y1="85" x2="471" y2="85" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="471" y="65" width="100" height="40" fill="lightgreen" stroke="black" />
                    <text x="520" y="90" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} >ADD USER</text>

                    <line x1="353" y1="110" x2="353" y2="140" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="310" y="140" width="80" height="40" fill="cyan" stroke="black" />
                    <text x="350" y="165" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} >Send mail</text>

                    
                    <polygon points="353,220 443,245 353,270 263,245" fill={"orange"} />
                    <text x="353" y="250" textAnchor="middle" fill="black">Approved ?</text>



                    <line x1="441" y1="245" x2="471" y2="245" stroke="black" markerEnd="url(#arrow)" />                    
                    <rect x="471" y="225" width="100" height="40" fill="red" stroke="black" />
                    <text x="520" y="250" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} >Reject</text>

                    <line x1="353" y1="270" x2="353" y2="310" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="310" y="310" width="100" height="40" fill="lightgreen" stroke="black" />
                    <text x="360" y="335" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} >ADD USER</text>

                    <line x1="153" y1="110" x2="153" y2="140" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,140 223,165 153,190 83,165" fill={"orange"} />
                    <text x="153" y="170" textAnchor="middle" fill="black">Request ?</text>

                    <line x1="153" y1="190" x2="153" y2="218" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="105" y="220" width="100" height="40" fill="red" stroke="black" />
                    <text x="155" y="245" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} >
                      Already</text>


                    <line x1="220" y1="165" x2="220" y2="300" stroke="black" markerEnd="url(#arrow)" />
                   

                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="black" />
                      </marker>
                    </defs>
                  </svg>

                </td>

            </tr>
          </tbody>
        </table>  

        </div>

     
    </div>
  );
};

export default DivPageGuideRequests;