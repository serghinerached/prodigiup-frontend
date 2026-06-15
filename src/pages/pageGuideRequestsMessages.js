import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
import { loadExcelRequestsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { useParams } from 'react-router-dom';

function DivPageGuideRequestsMessages() {
  const {id} = useParams();
  const version = id.split(",")[0];
  const group = id.split(",")[1];
  const instructions =  id.split(",")[2];
  const addCommentsOnHold =  id.split(",")[3];
  const workNotesOnhold =  id.split(",")[4];
  const addCommentsComplete =  id.split(",")[5];
  const workNotesComplete =  id.split(",")[6];
  const addCommentsIncomplet =  id.split(",")[7];
  const workNotesIncomplete =  id.split(",")[8];

    // DECLARATIONS
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  

  
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelRequestsMessagesCotsList()];
      SetExcelMessagesLoad(copyData);
    }
      fetchData();
  }, [])


  for (let i = 0; i < excelMessagesLoad.length; i++) {
    if (excelMessagesLoad[i][0] === null) {
      break;
    }
    var messageInstructions;
    if (excelMessagesLoad[i][0] === instructions) {
      messageInstructions = excelMessagesLoad[i][1];
    }
    var messageWorkNotesOnHold;
    if (excelMessagesLoad[i][0] === workNotesOnhold) {
      messageWorkNotesOnHold = excelMessagesLoad[i][1];
    }
    var messageAddCommentsOnHold;
    if (excelMessagesLoad[i][0] === addCommentsOnHold) {
      messageAddCommentsOnHold = excelMessagesLoad[i][1];
    }

    var messageWorkNotesComplete;
    if (excelMessagesLoad[i][0] === workNotesComplete) {
      messageWorkNotesComplete = excelMessagesLoad[i][1];
    }
    var messageAddCommentsComplete;
    if (excelMessagesLoad[i][0] === addCommentsComplete) {
      messageAddCommentsComplete = excelMessagesLoad[i][1];
    }

    var messageWorkNotesIncomplete;
    if (excelMessagesLoad[i][0] === workNotesIncomplete) {
      messageWorkNotesIncomplete = excelMessagesLoad[i][1];
    }
    var messageAddCommentsIncomplete;
    if (excelMessagesLoad[i][0] === addCommentsIncomplet) {
      messageAddCommentsIncomplete = excelMessagesLoad[i][1];
    }
  }

  if (messageWorkNotesOnHold != undefined) {
    messageWorkNotesOnHold = messageWorkNotesOnHold.replaceAll("SOFTWARE",version);
  }
  if (messageAddCommentsOnHold != undefined) {
    messageAddCommentsOnHold = messageAddCommentsOnHold.replaceAll("SOFTWARE",version);
  }
  if (messageWorkNotesComplete != undefined) {
    messageWorkNotesComplete = messageWorkNotesComplete.replaceAll("SOFTWARE",version);
  }
  if (messageAddCommentsComplete != undefined) {
    messageAddCommentsComplete = messageAddCommentsComplete.replaceAll("SOFTWARE",version);
  }
  if (messageWorkNotesIncomplete != undefined) {
    messageWorkNotesIncomplete = messageWorkNotesIncomplete.replaceAll("SOFTWARE",version);
  }
  if (messageAddCommentsIncomplete != undefined) {
    messageAddCommentsIncomplete = messageAddCommentsIncomplete.replaceAll("SOFTWARE",version);
  }
  
    return  <div style={styles.divPageGuideRequests} >
                     
                <h2 style={styles.title3}>{version}</h2>
                <br/>
                <br/>

                <table style={styles.tableRequestsMessages}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages}>Access group</td>
                      <td style={styles.td2Messages}>{group}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Instructions</td>
                      <td style={styles.td2Messages}>{messageInstructions}</td>
                    </tr>
                  </tbody>
                </table>
                <br></br>

                <table style={styles.tableRequestsMessages}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages2} >Pending</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Work Notes</td>
                      <td style={styles.td2Messages}>{messageWorkNotesOnHold}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Add. Comments</td><td style={styles.td2Messages}>{messageAddCommentsOnHold}</td>
                    </tr>
                  </tbody>
                </table>
                <br></br>

                <table style={styles.tableRequestsMessages}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages2} >Complete</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Work Notes</td><td style={styles.td2Messages}>{messageWorkNotesComplete}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Add. Comments</td><td style={styles.td2Messages}>{messageAddCommentsComplete}</td>
                    </tr>
                  </tbody>
                </table>
                <br></br>

                <table style={styles.tableRequestsMessages}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages2} >Incomplete</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Work Notes</td><td style={styles.td2Messages}>{messageWorkNotesIncomplete}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Add. Comments</td><td style={styles.td2Messages}>{messageAddCommentsIncomplete}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
}

export default DivPageGuideRequestsMessages;
