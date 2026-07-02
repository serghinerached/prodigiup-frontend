import React from "react";
import {styles} from './ComponentCss';
import DivPageGuideIncidentsExamplesMessages from "../pages/pageGuideIncidentsExamplesMessages";

class GuideIncidentsExamplesMessagesComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideIncidentsExamplesMessages/>
            </div>
        )
    }
}

export default GuideIncidentsExamplesMessagesComponent