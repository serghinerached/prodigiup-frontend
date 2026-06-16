import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadExcelIncidentsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsRemoteControlInstallation() {
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
  
  
  //-----
  
   return  <div style={styles.divPageGuideRequests}>
                
            <table style={{marginTop:"10px"}}>
              <tr>
                <td style={{border:"1px solid black",textAlign:"left"}}>

                  <svg width="630" height="650" >
                    <polygon points="153,30 233,80 153,130 73,80" fill={"orange"} />
                    <text x="153" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                    <line x1="231" y1="80" x2="284" y2="80" stroke="black" markerEnd="url(#arrow)" /> 
                    <line x1="153" y1="130" x2="153" y2="160" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="285" y="55" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="315" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 3A" }))} >Msg 3A</text>

                    <polygon points="153,160 223,180 153,200 83,180" fill={"orange"} />
                    <text x="153" y="185" textAnchor="middle" fill="black">Request ?</text>

                    <line x1="221" y1="180" x2="241" y2="180" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="245" y="160" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="275" y="185" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 2C" }))}>Msg 2C</text>
                    
                    <line x1="153" y1="200" x2="153" y2="220" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="125" y="220" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="155" y="245" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 3B" }))}>Msg 3B</text>
                    
                    <line x1="305" y1="180" x2="345" y2="180" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="455,150 565,180 455,210 345,180" fill={"orange"} />
                    <text x="458" y="185" textAnchor="middle" fill="black">Airbus installation ?</text>
                    <line x1="455" y1="210" x2="185" y2="245" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="563" y1="180" x2="563" y2="140" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="535" y="100" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="565" y="125" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 2D" }))}>Msg 2D</text>
                    <line x1="535" y1="120" x2="160" y2="150" stroke="black" markerEnd="url(#arrow)" />


                    <line x1="153" y1="260" x2="153" y2="280" stroke="black"  markerEnd="url(#arrow)" />
                    <polygon points="153,280 283,305 153,325 23,305" fill={"orange"} />
                    <text x="153" y="308" textAnchor="middle" fill="black">Need Admin rights ?</text>

                    <line x1="26" y1="305" x2="15" y2="305" stroke="black"  />
                    <line x1="15" y1="305" x2="15" y2="536" stroke="black"  />
                    <line x1="15" y1="536" x2="122" y2="536" stroke="black"  markerEnd="url(#arrow)" />

                    <line x1="153" y1="325" x2="153" y2="383" stroke="black"  markerEnd="url(#arrow)" />

                    <rect x="123" y="385" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="153" y="410" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1C" }))}>Msg 1C</text>
                    <line x1="153" y1="426" x2="153" y2="450" stroke="black"  markerEnd="url(#arrow)" />

                    <polygon points="153,450 283,470 153,495 23,470" fill={"orange"} />
                    <text x="153" y="475" textAnchor="middle" fill="black">Admin rights ?</text>

                    <line x1="153" y1="495" x2="153" y2="515" stroke="black"  markerEnd="url(#arrow)" />
                    <rect x="123" y="516" width="70" height="35" fill="pink" stroke="black" />
                    <text x="155" y="536" textAnchor="middle" fill="black">Resolve</text>

                    <line x1="279" y1="470" x2="317" y2="470" stroke="black"  markerEnd="url(#arrow)" />
                    <polygon points="396,440 476,470 396,510 315,470" fill={"orange"} />
                    <text x="396" y="475" textAnchor="middle" fill="black">Airbus Site ?</text>

                    <line x1="396" y1="510" x2="396" y2="540" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="355" y="540" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="395" y="560" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 5A" }))}>
                      Msg 5A<tspan x="395" dy="1em">(Techbar)</tspan>
                    </text>
                    <line x1="396" y1="590" x2="396" y2="618" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="474" y1="470" x2="475" y2="550" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="450" y="540" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="490" y="560" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 5B" }))}>
                      Msg 5B<tspan x="490" dy="1em">(Remote)</tspan>
                    </text>
                    <line x1="474" y1="590" x2="474" y2="618" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="474" y1="620" x2="160" y2="620" stroke="black"  />
                    <line x1="160" y1="620" x2="160" y2="553" stroke="black"  markerEnd="url(#arrow)" />


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

export default DivPageGuideIncidentsRemoteControlInstallation;
