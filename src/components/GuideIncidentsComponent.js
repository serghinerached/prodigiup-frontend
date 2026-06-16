import React from "react";
import {styles} from './ComponentCss';
import DivPageGuideIncidents from "../pages/pageGuideIncidents";

class GuideIncidentsComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideIncidents/>
            </div>
        )
    }
}

export default GuideIncidentsComponent