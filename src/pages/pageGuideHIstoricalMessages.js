import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
//import { loadExcelRequestsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { useParams } from 'react-router-dom';

function DivPageGuidedHistoricalMessages() {
  const {id} = useParams();
 
  
    return  <div style={styles.divImport} >
                     
                <h2 style={styles.title3}>Issue  </h2>
                <br/>
                <br/>
              

                <table style={styles.tableIncidents}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages2} >xxxxx</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Work Notes</td><td style={styles.td2Messages}>xxxxx</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Add. Comments</td><td style={styles.td2Messages}>xxxxx</td>
                    </tr>
                  </tbody>
                </table>
            </div>
}

export default DivPageGuidedHistoricalMessages;
