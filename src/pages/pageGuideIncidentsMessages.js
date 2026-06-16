import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { loadExcelIncidentsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsMessages() {
  const {id} = useParams();
  const nameMessage = id;


  // DECLARATIONS
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  

    
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelIncidentsMessagesCotsList()];
      SetExcelMessagesLoad(copyData);
    }
      fetchData();
  }, [])

  for (let i = 0; i < excelMessagesLoad.length; i++) {
    if (excelMessagesLoad[i][0] === null) {
      break;
    }
    var addComments;
    if (excelMessagesLoad[i][0] === nameMessage) {
      addComments = excelMessagesLoad[i][1];
    }
    var wNotes;
    if (excelMessagesLoad[i][0] === nameMessage) {
      wNotes = excelMessagesLoad[i][2];
      break;
    }
  }
  
  
    return  <div style={styles.divImport} ><br></br>

                <table style={styles.tableIncidents}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages}>Message</td><td style={styles.td2Messages}>{nameMessage}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Add. comments</td><td style={styles.td2Messages}>{addComments}</td>
                    </tr>
                     <tr>
                      <td style={styles.td1Messages}>Work notes</td><td style={styles.td2Messages}>{wNotes}</td>
                    </tr>
                  </tbody>
                </table>
                
            </div>
            

}

export default DivPageGuideIncidentsMessages;
