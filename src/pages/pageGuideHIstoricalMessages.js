import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
import { loadExcelHistoricalMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { useParams } from 'react-router-dom';

function DivPageGuideHistoricalMessages() {
  const {id} = useParams();
  const application = id.split(',')[0]; // Récupère le premier élément du tableau
  const numHelp = id.split(',')[1]; // Récupère le deuxième élément du tableau

   // DECLARATIONS
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  
  const [messageDescription, SetMessageDescription] = useState([]);  
  const [messageHelp, SetMessageHelp] = useState([]);  
  const [kb, setKb] = useState([]);
  
    
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelHistoricalMessagesCotsList()];
      SetExcelMessagesLoad(copyData);
    }
      fetchData();
  }, [])

 
  //------------------- recherche du message correspondant à numHelp

  useEffect(() => {
    for (let i = 0; i < excelMessagesLoad.length; i++) {

      if (String(excelMessagesLoad[i][0]).trim() === String(numHelp).trim()) {
        SetMessageDescription(excelMessagesLoad[i][1]);
        SetMessageHelp(excelMessagesLoad[i][2]);
        setKb(excelMessagesLoad[i][3]);
        break;
      }

      if (excelMessagesLoad[i][0] === null || excelMessagesLoad[i][0] === undefined) {
        break;
      }
    }
  }, [excelMessagesLoad, numHelp])

  //******************************************************* */
  
    return  <div style={styles.divPageGuideRequests} >
                     
                <h2 style={styles.title4}>{application}  </h2>
                <br/>
                <br/>
              

                <table style={{borderCollapse: 'collapse', width: '70%'}}>
                  <tbody>
                    <tr>
                      <td style={{...styles.tdHistMessages, backgroundColor: "lightblue", width:"10%",fontWeight:"bold"}}>Description</td>           
                      <td style={{...styles.tdHistMessages,whiteSpace: "pre-line"}}>{messageDescription}</td>
                    </tr>
                    <tr>
                      <td style={{...styles.tdHistMessages, backgroundColor: "lightgreen", width:"10%",fontWeight:"bold"}}>Resolution</td>
                      <td style={{...styles.tdHistMessages,whiteSpace: "pre-line"}}>{messageHelp}</td>
                    </tr>
                    <tr>
                      <td style={{...styles.tdHistMessages, backgroundColor: "yellow", width:"10%",fontWeight:"bold"}}>KB</td>
                      <td style={{...styles.tdHistMessages,whiteSpace: "pre-line"}}>{kb}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
}

export default DivPageGuideHistoricalMessages;