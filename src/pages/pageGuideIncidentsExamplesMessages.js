import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { loadDataExcelCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';

function DivPageGuideIncidentsExamplesMessages() {
  const {id} = useParams(); 
  console.log(id);
  const idDecode = decodeURIComponent(id);
  const application = idDecode.split(',')[0]; // Récupère le premier élément du tableau
  const issue = idDecode.split(',')[1]; // Récupère le deuxième élément du tableau
  const numHelp = idDecode.split(',')[2]; // Récupère le troisième élément du tableau

   // DECLARATIONS
  const [messageHelp, SetMessageHelp] = useState([]);  
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  
  const [messageDescription, SetMessageDescription] = useState([]);  
  const [messageQuestions, setMessageQuestions] = useState([]);  
  const [messageConditions, setMessageConditions] = useState([]);
  const [messageResolution, setMessageResolution] = useState([]);  
  const [messageKb, setMessageKb] = useState([]);
  const [pathImage, setPathImage] = useState(null);
    
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadDataExcelCotsList(6)];
      SetExcelMessagesLoad(copyData);
    }
      fetchData();
  }, [])

 
  //------------------- recherche du message correspondant à numHelp

  useEffect(() => {
    for (let i = 0; i < excelMessagesLoad.length; i++) {

      if (String(excelMessagesLoad[i][0]).trim() === String(numHelp).trim()) {
        SetMessageDescription(issue);
        setMessageQuestions(excelMessagesLoad[i][1]);
        setMessageConditions(excelMessagesLoad[i][2]);
        setMessageResolution(excelMessagesLoad[i][3]);
        setMessageKb(excelMessagesLoad[i][4]);
        const imageName = excelMessagesLoad[i][5];
        setPathImage(imageName ? `${process.env.PUBLIC_URL}/images/${imageName}` : null);
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
                      <td style={{...styles.tdHistMessages, backgroundColor: "yellow", width:"10%",fontWeight:"bold"}}>Questions</td>
                      <td style={{...styles.tdHistMessages,whiteSpace: "pre-line"}}>{messageQuestions}</td>
                    </tr>
                     <tr>
                      <td style={{...styles.tdHistMessages, backgroundColor: "pink", width:"10%",fontWeight:"bold"}}>Conditions</td>
                      <td style={{...styles.tdHistMessages,whiteSpace: "pre-line"}}>{messageConditions}</td>
                    </tr>
                    <tr>
                      <td style={{...styles.tdHistMessages, backgroundColor: "lightgreen", width:"10%",fontWeight:"bold"}}>Resolution</td>
                     <td style={{...styles.tdHistMessages, whiteSpace: "pre-line"}}>
                      {messageResolution}
                      <br/>
                     {pathImage && (
                        <a href={pathImage} target="_blank" rel="noreferrer">
                          <img src={pathImage} alt="Logo" style={{ height: '100px', cursor: 'pointer' }} />
                        </a>
                      )}
                    </td>
                    </tr>
                    <tr>
                      <td style={{...styles.tdHistMessages, backgroundColor: "lightgrey", width:"10%",fontWeight:"bold"}}>KB</td>
                      <td style={{...styles.tdHistMessages,whiteSpace: "pre-line"}}>{messageKb}</td>
                    </tr>
                  
                  </tbody>
                </table>
            </div>
}

export default DivPageGuideIncidentsExamplesMessages;