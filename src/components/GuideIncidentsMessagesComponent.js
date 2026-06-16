import React from "react";
import {styles} from './ComponentCss';
import DivPageGuideIncidentsMessages from "../pages/pageGuideIncidentsMessages";

class GuideIncidentsMessagesComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideIncidentsMessages/>
            </div>
        )
    }
}

export default GuideIncidentsMessagesComponent