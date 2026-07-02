import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadDataExcelCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsVSCodeInstallation() {

  const [form, setForm] = useState({ open: false, nameMessage: "" });
  const popupRef  = useRef(null);
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  

  // TRAITEMENT DEMARRAGE
    useEffect(() => {
      const fetchData = async () => {
        var copyData = [...await loadDataExcelCotsList(2)];
        SetExcelMessagesLoad(copyData);
      }
        fetchData();
    }, [])

    var workNotes = "";
    var addComments = "";

    if (form.open) {
        for (let i = 0; i < excelMessagesLoad.length; i++) {
          if (excelMessagesLoad[i][0] === null) {
            break;
          }
          if (excelMessagesLoad[i][0] === form.nameMessage) {
            workNotes = excelMessagesLoad[i][2];
          //  break;
          }
          if (excelMessagesLoad[i][0] === form.nameMessage) {
            addComments = excelMessagesLoad[i][1];
          }
        }
    }


  //-----
   return  <div style={styles.divPageGuideRequests}>
    
              <table style={{marginTop:"10px"}}>
                <tr>
                  <td style={{border:"1px solid black",textAlign:"left"}}>

                    <svg width="630" height="570" >

                      <polygon points="103,30 183,80 103,130 23,80" fill={"orange"} />
                      <text x="103" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                      <line x1="181" y1="80" x2="234" y2="80" stroke="black" markerEnd="url(#arrow)" /> 
                      <line x1="235" y1="95" x2="133" y2="160" stroke="black" markerEnd="url(#arrow)" />

                      <rect x="235" y="55" width="62" height="40" fill="cyan" stroke="black" />
                      <text x="266" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1A" }))} >Msg 1A</text>

                      <line x1="103" y1="130" x2="103" y2="160" stroke="black" markerEnd="url(#arrow)" />
                      <rect x="73" y="160" width="62" height="40" fill="cyan" stroke="black" />
                      <text x="104" y="185" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 7A" }))}>Msg 7A</text>

                      <line x1="103" y1="200" x2="103" y2="230" stroke="black" markerEnd="url(#arrow)" />
                      <polygon points="103,230 163,260 103,290 43,260" fill={"orange"} />
                      <text x="103" y="265" textAnchor="middle" fill="black">Success ?</text>

                      <line x1="161" y1="260" x2="234" y2="260" stroke="black" markerEnd="url(#arrow)" />
                      <rect x="234" y="240" width="62" height="40" fill="cyan" stroke="black" />
                      <text x="266" y="265" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 7B" }))}>Msg 7B</text>
                      <line x1="265" y1="280" x2="115" y2="474" stroke="black" markerEnd="url(#arrow)" />

                      <line x1="103" y1="290" x2="103" y2="478" stroke="black" markerEnd="url(#arrow)" />
                      <rect x="68" y="480" width="70" height="40" fill="pink" stroke="black" />
                      <text x="102" y="503" textAnchor="middle" fill="black">Resolve</text>

                      <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L9,3 z" fill="black" />
                        </marker>
                      </defs>
                    </svg>

                </td>

                  <td style={{border:"1px solid black",verticalAlign:"top"}}>

                    <div ref={popupRef}>
                      {form.open && ( // si form.open = true
                        <div >        
                          <table >
                            <tr>
                              <td style={{paddingLeft:"3px",...styles.td1Messages}}>Message</td> <td style={styles.td2Messages}>{form.nameMessage}</td>
                            </tr>
                            <tr>
                              <td style={{paddingLeft:"3px",...styles.td1Messages}}>Work notes</td> <td style={{fontSize: "12px", ...styles.td2Messages }}>{workNotes}</td>
                            </tr>
                            <tr>
                              <td style={{paddingLeft:"3px",...styles.td1Messages}}>Add. comments</td> <td style={{fontSize: "12px", ...styles.td2Messages }}>{addComments}</td>
                            </tr>
                          </table>

                          <button onClick={() => setForm(false,"")} >Fermer</button>

                        </div>
                      )}
                    </div>

                  </td>

                </tr>
              </table>
            </div>
                           
}

export default DivPageGuideIncidentsVSCodeInstallation;
