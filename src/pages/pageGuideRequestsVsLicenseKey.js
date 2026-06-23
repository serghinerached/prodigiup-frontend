import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadExcelIncidentsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideRequestVsLicenseKey() {
  const [form, setForm] = useState({ open: false, nameMessage: "" });
  const popupRef  = useRef(null);
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  
  
  
    // TRAITEMENT DEMARRAGE
      useEffect(() => {
        const fetchData = async () => {
          var copyData = [...await loadExcelIncidentsMessagesCotsList()];
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
  
  
  //-----page 
  
   return   <div style={styles.divPageGuideRequests}>
              <h2 style={styles.title3}>Requests Visual Studio license key</h2>
                
            <table style={{marginTop:"10px"}}>
              <tr>
                <td style={{border:"1px solid black",textAlign:"left"}}>

                  <svg width="630" height="650" >
                    <polygon points="153,30 233,80 153,130 73,80" fill={"orange"} />
                    <text x="153" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                    <line x1="231" y1="80" x2="284" y2="80" stroke="black" markerEnd="url(#arrow)" /> 
                    <line x1="153" y1="130" x2="153" y2="160" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="285" y="55" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="315" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 6A" }))} >Msg 6A</text>

                    <line x1="284" y1="94" x2="159" y2="148" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,160 223,180 153,200 83,180" fill={"orange"} />
                    <text x="153" y="185" textAnchor="middle" fill="black">Request ?</text>

                    <line x1="221" y1="180" x2="241" y2="180" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="245" y="160" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="275" y="185" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 2E" }))}>
                      Msg 2E</text>
                    <line x1="153" y1="200" x2="153" y2="220" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="125" y="220" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="155" y="245" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 6B" }))}>Msg 6B</text>
                    
                    <line x1="305" y1="180" x2="345" y2="180" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="455,150 565,180 455,210 345,180" fill={"orange"} />
                    <text x="458" y="185" textAnchor="middle" fill="black">Airbus installation ?</text>
                    <line x1="455" y1="210" x2="187" y2="245" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="563" y1="180" x2="563" y2="140" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="535" y="100" width="60" height="40" fill="red"troke="black" />
                    <text x="565" y="125" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 2F" }))}>
                      Msg 2F</text>

                    <line x1="153" y1="260" x2="153" y2="280" stroke="black"  markerEnd="url(#arrow)" />     
                    <polygon points="153,280 283,300 153,325 23,300" fill={"orange"} />
                    <text x="153" y="306" textAnchor="middle" fill="black">Admin rights ?</text>

                    <line x1="153" y1="325" x2="153" y2="355" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="125" y="355" width="65" height="40" fill="cyan" stroke="black" />
                    <text x="157" y="377" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 6C" }))}>Msg 6C</text>

                    <line x1="153" y1="395" x2="153" y2="425" stroke="black"  markerEnd="url(#arrow)" />
                    <rect x="125" y="427" width="65" height="40" fill="lightgreen" stroke="black" />
                    <text x="157" y="449" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 6D" }))}>
                      Msg 6D</text>
                    <line x1="153" y1="467" x2="153" y2="497" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="123" y="500" width="70" height="35" fill="pink" stroke="black" />
                    <text x="155" y="522" textAnchor="middle" fill="black">Resolve</text>

                    <line x1="277" y1="300" x2="307" y2="300" stroke="black"  markerEnd="url(#arrow)" />
                    <polygon points="389,270 469,300 389,340 308,300" fill={"orange"} />
                    <text x="389" y="306" textAnchor="middle" fill="black">Airbus Site ?</text>

                    <line x1="389" y1="340" x2="389" y2="370" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="350" y="373" width="77" height="40" fill="cyan" stroke="black" />
                    <text x="390" y="390" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 6E" }))}>
                      Msg 6E<tspan x="390" dy="1em">(Techbar)</tspan></text>

                    <line x1="389" y1="412" x2="389" y2="442" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="350" y="444" width="77" height="40" fill="lightgreen" stroke="black" />
                    <text x="390" y="467" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 6G" }))}>
                      Msg 6G</text>

                    <line x1="467" y1="300" x2="467" y2="370" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="450" y="373" width="77" height="50" fill="lightgreen" stroke="black" />
                    <text x="488" y="393" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 6F" }))}>
                      Msg 6F<tspan x="488" dy="1em">(SCCM)</tspan>
                    </text>

                    

                    <line x1="389" y1="485" x2="389" y2="570" stroke="black" markerEnd="url(#arrow)" />
                    <line x1="467" y1="422" x2="467" y2="570" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="470" y1="572" x2="153" y2="572" stroke="black"  />
                    <line x1="153" y1="572" x2="153" y2="538" stroke="black"  markerEnd="url(#arrow)" />


                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="black" />
                      </marker>
                    </defs>
                  </svg>

                </td>

                <td style={{border:"1px solid black",verticalAlign:"top"}}>

                  <div ref={popupRef}>
                    {form.open && (
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

export default DivPageGuideRequestVsLicenseKey;
