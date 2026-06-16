import React from "react";
import TrackerService from "../services/TrackerService";
import {styles} from './ComponentCss';
import DivPageGuideIncidentsFreeInstallation from "../pages/pageGuideIncidentsFreeInstallation";

class GuideIncidentsFreeInstallationComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideIncidentsFreeInstallation/>
            </div>
        )
    }
}

export default GuideIncidentsFreeInstallationComponent