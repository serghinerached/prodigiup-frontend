import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadExcelIncidentsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsFreeIssue() {
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
                    <text x="315" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1A" }))} >Msg 1A</text>

                    <rect x="123" y="160" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="153" y="185" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 2A" }))}>Msg 2A</text>
                    <line x1="285" y1="95" x2="183" y2="160" stroke="black" markerEnd="url(#arrow)" />
                  
                    <line x1="153" y1="200" x2="153" y2="230" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,230 283,260 153,290 23,260" fill={"orange"} />
                    <text x="153" y="265" textAnchor="middle" fill="black">Airbus installation ?</text>

                    <line x1="278" y1="260" x2="328" y2="260" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="328" y="240" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="358" y="265" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 2B" }))}>Msg 2B</text>
                    
                    <line x1="388" y1="260" x2="438" y2="260" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="499,230 560,260 499,300 438,260" fill={"orange"} />
                    <text x="499" y="265" textAnchor="middle" fill="black">Success ?</text>

                    <line x1="499" y1="230" x2="580" y2="230" stroke="black" />
                    <line x1="580" y1="230" x2="580" y2="630" stroke="black" /> 
                    <line x1="580" y1="630" x2="474" y2="630" stroke="black" /> 

                    <line x1="560" y1="260" x2="560" y2="330" stroke="black" />
                    <line x1="560" y1="330" x2="283" y2="330" stroke="black" markerEnd="url(#arrow)" />
                   
                    <line x1="153" y1="290" x2="153" y2="310" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,310 283,330 153,360 23,330" fill={"orange"} />
                    <text x="153" y="336" textAnchor="middle" fill="black">Need Admin rights ?</text>

                    <line x1="28" y1="330" x2="10" y2="330" stroke="black"  />
                    <line x1="10" y1="330" x2="10" y2="630" stroke="black"  />
                    <line x1="10" y1="630" x2="122" y2="630" stroke="black"  markerEnd="url(#arrow)" />

                    <line x1="153" y1="360" x2="153" y2="390" stroke="black"  markerEnd="url(#arrow)" />
                    <rect x="123" y="390" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="153" y="415" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1C" }))}>Msg 1C</text>
                    
                    <line x1="153" y1="430" x2="153" y2="460" stroke="black"  markerEnd="url(#arrow)" />
                    <polygon points="153,460 283,480 153,510 23,480" fill={"orange"} />
                    <text x="153" y="487" textAnchor="middle" fill="black">Admin rights ?</text>

                    <line x1="153" y1="510" x2="153" y2="608" stroke="black"  markerEnd="url(#arrow)" />
                    <rect x="123" y="610" width="70" height="35" fill="pink" stroke="black" />
                    <text x="155" y="632" textAnchor="middle" fill="black">Resolve</text>

                    <line x1="275" y1="480" x2="315" y2="480" stroke="black"  markerEnd="url(#arrow)" />
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

export default DivPageGuideIncidentsFreeIssue;
