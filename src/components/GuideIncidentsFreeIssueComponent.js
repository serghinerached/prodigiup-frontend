import React from "react";
import TrackerService from "../services/TrackerService";
import {styles} from './ComponentCss';
import DivPageGuideIncidentsFreeIssue from "../pages/pageGuideIncidentsFreeIssue";

class GuideIncidentsFreeIssueComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideIncidentsFreeIssue/>
            </div>
        )
    }
}

export default GuideIncidentsFreeIssueComponent