import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadDataExcelCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsFreeInstallation() {

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
   return      <div style={styles.divPageGuideRequests}>

    
              <table style={{marginTop:"10px"}}>
                <tr>
                  <td style={{border:"1px solid black",textAlign:"left"}}>

                    <svg width="630" height="570" >

                      <polygon points="103,30 183,80 103,130 23,80" fill={"orange"} />
                      <text x="103" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                      <line x1="181" y1="80" x2="234" y2="80" stroke="black" markerEnd="url(#arrow)" /> 
                      <line x1="235" y1="95" x2="133" y2="160" stroke="black" markerEnd="url(#arrow)" />

                      <rect x="235" y="55" width="60" height="40" fill="cyan" stroke="black" />
                      <text x="265" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1A" }))} >Msg 1A</text>

                      <line x1="103" y1="130" x2="103" y2="160" stroke="black" markerEnd="url(#arrow)" />
                      <rect x="73" y="160" width="60" height="40" fill="cyan" stroke="black" />
                      <text x="103" y="185" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1B" }))}>Msg 1B</text>

                      <line x1="103" y1="200" x2="103" y2="230" stroke="black" markerEnd="url(#arrow)" />
                      <polygon points="103,230 163,260 103,290 43,260" fill={"orange"} />
                      <text x="103" y="265" textAnchor="middle" fill="black">Success ?</text>


                      <line x1="161" y1="260" x2="234" y2="260" stroke="black" markerEnd="url(#arrow)" />
                      <rect x="234" y="240" width="60" height="40" fill="cyan" stroke="black" />
                      <text x="265" y="265" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1C" }))}>Msg 1C</text>
                      <line x1="265" y1="280" x2="265" y2="320" stroke="black" markerEnd="url(#arrow)" />


                      <line x1="345" y1="350" x2="390" y2="350" stroke="black" markerEnd="url(#arrow)" />
                      <polygon points="470,320 550,350 470,390 390,350" fill={"orange"} />
                      <text x="470" y="355" textAnchor="middle" fill="black">Airbus Site ?</text>
                      <line x1="548" y1="350" x2="548" y2="420" stroke="black" markerEnd="url(#arrow)" />

                      <polygon points="265,320 345,350 265,390 184,350" fill={"orange"} />
                      <text x="265" y="355" textAnchor="middle" fill="black">Admin rights ?</text>
                      <line x1="265" y1="390" x2="265" y2="497" stroke="black" markerEnd="url(#arrow)"/>

                      <line x1="470" y1="390" x2="470" y2="420" stroke="black" markerEnd="url(#arrow)" />
                      <rect x="430" y="420" width="77" height="50" fill="cyan" stroke="black" />
                      <text x="470" y="440" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1D" }))}>
                        Msg 1D<tspan x="470" dy="1em">(Techbar)</tspan>
                      </text>
                      <line x1="470" y1="470" x2="470" y2="497" stroke="black" markerEnd="url(#arrow)" />

                      <rect x="520" y="420" width="77" height="50" fill="cyan" stroke="black" />
                      <text x="560" y="440" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1E" }))}>
                        Msg 1E<tspan x="560" dy="1em">(Remote)</tspan>
                      </text>
                      <line x1="560" y1="470" x2="560" y2="497" stroke="black" markerEnd="url(#arrow)" />

                      <line x1="103" y1="290" x2="103" y2="478" stroke="black" markerEnd="url(#arrow)" />
                      <rect x="68" y="480" width="70" height="40" fill="pink" stroke="black" />
                      <text x="102" y="503" textAnchor="middle" fill="black">Resolve</text>
                      <line x1="560" y1="500" x2="140" y2="500" stroke="black" markerEnd="url(#arrow)" />

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

export default DivPageGuideIncidentsFreeInstallation;
