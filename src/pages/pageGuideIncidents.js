import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import DivPageGuideIncidentsFreeInstallation from './pageGuideIncidentsFreeInstallation';
import DivPageGuideIncidentsFreeIssue from './pageGuideIncidentsFreeIssue';
import DivPageGuideIncidentsPullUserIssue from './pageGuideIncidentsPullUserIssue';
import DivPageGuideIncidentsPullUserInstallation from './pageGuideIncidentsPullUserInstallation';
import DivPageGuideIncidentsRemoteControlInstallation from './pageGuideIncidentsRemoteControlInstallation';
import DivPageGuideIncidentsRemoteControlIssue from './pageGuideIncidentsRemoteControlIssue';
import DivPageGuideIncidentsVSCodeInstallation from './pageGuideIncidentsVSCodeInstallation';

function DivPageGuideIncidents() {
  const [draftMode, setDraftMode] = useState("");
  const [draftType, setDraftType] = useState("");

  const [selectedMode, setSelectedMode] = useState("");
  const [selectedTypeIssue, setSelectedTypeIssue] = useState("");

  const tabLibMode = ["Free", "Pull User", "Remote Control","Visual studio code"];
  const tabTypeIssue = ["Installation/Uninstallation", "Issue"];

  // Mise à jour provisoire
  const handleSelectModeChange = (event) => setDraftMode(event.target.value);
  const handleSelectTypeChange = (event) => setDraftType(event.target.value);

  // Validation au clic
  const handleUpdateClick = () => {
    setSelectedMode(draftMode);
    setSelectedTypeIssue(draftType);
  };

  return (
    <div style={styles.divImport}>
      <h2 style={styles.title3}>Incidents :</h2>

      <label style={{ marginRight: 15 }}>
        &nbsp;Mode&nbsp;
        <select value={draftMode} onChange={handleSelectModeChange}>
          <option value=""> </option>
          {tabLibMode.map((libMode, index) => (
            <option key={index} value={libMode}>
              {libMode}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginRight: 15 }}>
        Type&nbsp;
        <select value={draftType} onChange={handleSelectTypeChange}>
          <option value=""> </option>
          {tabTypeIssue.map((libTypeIssue, index) => (
            <option key={index} value={libTypeIssue}>
              {libTypeIssue}
            </option>
          ))}
        </select>
      </label>

      <button style={styles.btnOk} onClick={handleUpdateClick}>OK</button>

      {/* Affichage conditionnel uniquement si validé */}
      {selectedMode === "Free" && selectedTypeIssue === "Issue" && 
      (
        <DivPageGuideIncidentsFreeIssue />
      )}

      {selectedMode === "Free" && selectedTypeIssue === "Installation/Uninstallation" && 
      (
        <DivPageGuideIncidentsFreeInstallation />
      )}

      {selectedMode === "Pull User" && selectedTypeIssue === "Issue" && 
      (
        <DivPageGuideIncidentsPullUserIssue />
      )}

      {selectedMode === "Pull User" && selectedTypeIssue === "Installation/Uninstallation" && 
      (
        <DivPageGuideIncidentsPullUserInstallation />
      )}

      {selectedMode === "Remote Control" && selectedTypeIssue === "Installation/Uninstallation" && 
      (
        <DivPageGuideIncidentsRemoteControlInstallation />
      )}

      {selectedMode === "Remote Control" && selectedTypeIssue === "Issue" && 
      (
        <DivPageGuideIncidentsRemoteControlIssue />
      )}

      {selectedMode === "Visual studio code" && selectedTypeIssue === "Installation/Uninstallation" && 
      (
        <DivPageGuideIncidentsVSCodeInstallation />
      )}

    </div>
  );
}

export default DivPageGuideIncidents;