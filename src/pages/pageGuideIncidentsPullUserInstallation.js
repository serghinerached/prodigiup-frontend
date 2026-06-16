import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadExcelIncidentsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsPullUserInstallation() {
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
  
   return <div style={styles.divPageGuideRequests}>
                
            <table style={{marginTop:"10px"}}>
              <tr>
                <td style={{border:"1px solid black",textAlign:"left"}}>

                  <svg width="630" height="650" >

                    {/* gestion des fleches */}
                    <defs>
                        {/* Flèche vers la droite (fin) */}
                        <marker
                          id="arrow-end"
                          viewBox="0 0 10 10"
                          refX="10"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto"
                        >
                          <path d="M0,0 L10,5 L0,10 z" fill="black" />
                        </marker>

                        {/* Flèche vers la gauche (début) */}
                        <marker
                          id="arrow-start"
                          viewBox="0 0 10 10"
                          refX="0"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto"
                        >
                          <path d="M10,0 L0,5 L10,10 z" fill="black" />
                        </marker>
                      </defs>

                    <polygon points="153,30 233,80 153,130 73,80" fill={"orange"} />
                    <text x="153" y="85" textAnchor="middle" fill="black">Name/Version ?</text>

                    <line x1="231" y1="80" x2="261" y2="80" stroke="black" markerEnd="url(#arrow)" /> 
                    <rect x="262" y="55" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="292" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1A" }))} >Msg 1A</text>
                    <line x1="262" y1="95" x2="158" y2="157" stroke="black" markerEnd="url(#arrow)" /> 

                    <line x1="153" y1="130" x2="153" y2="160" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,160 223,190 153,220 83,190" fill={"orange"} />
                    <text x="153" y="195" textAnchor="middle" fill="black">How to do ?</text>

                    <line x1="153" y1="220" x2="153" y2="250" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="125" y="252" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="155" y="275" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 4A" }))}>Msg 4A</text>
                    
                    <line x1="222" y1="190" x2="401" y2="190" stroke="black" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                    <polygon points="445,160 490,190 445,220 400,190" fill={"orange"} />
                    <text x="446" y="195" textAnchor="middle" fill="black">is issue ?</text>
                    <line x1="445" y1="220" x2="160" y2="320" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="153" y1="292" x2="153" y2="322" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,322 263,342 153,372 43,342" fill={"orange"} />
                    <text x="153" y="349" textAnchor="middle" fill="black">Request approved ?</text>

                    <line x1="261" y1="343" x2="293" y2="343" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="293" y="325" width="60" height="40" fill="red" stroke="black" />
                    <text x="323" y="350" textAnchor="middle" fill="white" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 4B" }))}>Msg 4B</text>
                    

                    <line x1="153" y1="372" x2="153" y2="391" stroke="black"  markerEnd="url(#arrow)" />
                    <polygon points="153,393 263,430 153,460 43,430" fill={"orange"} />
                    <text x="153" y="429" textAnchor="middle" fill="black">
                      Airbus installation<tspan x="153" dy="1em">Failed ?</tspan></text>
                    <line x1="45" y1="430" x2="10" y2="430" stroke="black" />
                    <line x1="10" y1="430" x2="10" y2="627" stroke="black" />
                    <line x1="10" y1="627" x2="123" y2="627" stroke="black"  markerEnd="url(#arrow)" />

                    <line x1="153" y1="460" x2="153" y2="513" stroke="black"  markerEnd="url(#arrow)" />
                    <polygon points="153,513 283,533 153,563 23,533" fill={"orange"} />
                    <text x="153" y="540" textAnchor="middle" fill="black">Admin rights ?</text>

                    <line x1="153" y1="563" x2="153" y2="610" stroke="black"  markerEnd="url(#arrow)" />
                    <rect x="123" y="610" width="70" height="35" fill="pink" stroke="black" />
                    <text x="155" y="632" textAnchor="middle" fill="black">Resolve</text>

                    <line x1="279" y1="533" x2="317" y2="482" stroke="black"  markerEnd="url(#arrow)" />
                    <polygon points="396,450 476,480 396,520 315,480" fill={"orange"} />
                    <text x="396" y="485" textAnchor="middle" fill="black">Airbus Site ?</text>

                    <line x1="396" y1="520" x2="396" y2="550" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="355" y="550" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="395" y="570" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1D" }))}>
                      Msg 1D<tspan x="395" dy="1em">(Techbar)</tspan>
                    </text>
                    <line x1="396" y1="600" x2="396" y2="630" stroke="black"  />

                    <line x1="474" y1="480" x2="475" y2="550" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="450" y="550" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="490" y="570" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1E" }))}>
                      Msg 1E<tspan x="490" dy="1em">(Remote)</tspan>
                    </text>
                    <line x1="474" y1="600" x2="474" y2="630" stroke="black"  />

                    <line x1="474" y1="630" x2="196" y2="630" stroke="black"  markerEnd="url(#arrow)" />


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

export default DivPageGuideIncidentsPullUserInstallation;
