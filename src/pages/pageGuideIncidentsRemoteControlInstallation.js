import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadDataExcelCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsRemoteControlInstallation() {
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

                  <svg width="760" height="650" >

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
                    
                    <line x1="222" y1="190" x2="350" y2="130" stroke="black" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                    <polygon points="445,100 540,130 445,160 350,130" fill={"orange"} />
                    <text x="446" y="135" textAnchor="middle" fill="black">Installation issue ?</text>

                    <line x1="445" y1="160" x2="445" y2="180" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="445,183 555,203 445,233 335,203" fill={"orange"} />
                    <text x="445" y="210" textAnchor="middle" fill="black">Airbus installation ?</text>

                    x<line x1="445" y1="233" x2="445" y2="253" stroke="black" markerEnd="url(#arrow)" />
                    xx<rect x="415" y="255" width="60" height="40" fill="cyan" stroke="black" />
                    xx<text x="445" y="279" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1C" }))}>Msg 1C</text>
                   
                    x<line x1="445" y1="295" x2="445" y2="315" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="445,315 535,333 445,359 355,333" fill={"orange"} />
                    <text x="445" y="340" textAnchor="middle" fill="black">Admin rights ?</text>

                    <line x1="475" y1="273" x2="541" y2="273" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="631,255 721,273 631,299 541,273" fill={"orange"} />
                    <text x="631" y="279" textAnchor="middle" fill="black">Airbus site ?</text>

                    <line x1="631" y1="299" x2="631" y2="319" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="580" y="320" width="70" height="50" fill="cyan" stroke="black" />
                    <text x="615" y="343" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 4D" }))}>
                      Msg 4D<tspan x="615" dy="1em">(Techbar)</tspan></text>
                    <line x1="717" y1="273" x2="717" y2="319" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="670" y="320" width="70" height="50" fill="cyan" stroke="black" />
                    <text x="705" y="343" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 4E" }))}>
                      Msg 4E<tspan x="705" dy="1em">(Techbar)</tspan></text>
                    
                    <line x1="620" y1="370" x2="620" y2="582" stroke="black" markerEnd="url(#arrow)" />
                    <line x1="710" y1="370" x2="710" y2="582" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="445" y1="359" x2="445" y2="379" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="415" y="379" width="60" height="30" fill="yellow" stroke="black" />
                    <text x="445" y="400" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 4F" }))}>Msg 4F</text>
                    <line x1="445" y1="408" x2="445" y2="583" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="153" y1="292" x2="153" y2="322" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,322 263,342 153,372 43,342" fill={"orange"} />
                    <text x="153" y="349" textAnchor="middle" fill="black">Request approved ?</text>

                    <line x1="261" y1="342" x2="281" y2="342" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="283" y="325" width="60" height="30" fill="red" stroke="black" />
                    <text x="313" y="345" textAnchor="middle" fill="white" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 4B" }))}>Msg 4B</text>
                    
                    <line x1="153" y1="372" x2="153" y2="402" stroke="black"  markerEnd="url(#arrow)" />
                    <rect x="125" y="402" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="155" y="425" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 4C" }))}>Msg 4C</text>
                    
                    <line x1="153" y1="442" x2="153" y2="472" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,472 223,502 153,538 83,502" fill={"orange"} />
                    <text x="153" y="507" textAnchor="middle" fill="black">Ok for close ?</text>

                    <line x1="221" y1="502" x2="253" y2="502" stroke="black"   markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"  />
                    <circle cx={280} cy={502} r={28} stroke="black" fill="lightgreen"/>
                    <text x="278" y="506" textAnchor="middle" fill="black">Wait...</text>

                    <line x1="153" y1="538" x2="153" y2="568" stroke="black"  markerEnd="url(#arrow)" />
                    <line x1="712" y1="585" x2="195" y2="585" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="123" y="568" width="70" height="35" fill="pink" stroke="black" />
                    <text x="155" y="588" textAnchor="middle" fill="black">Resolve</text>

                   
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
