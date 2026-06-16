import React from "react";
import {styles} from './ComponentCss';
import DivPageGuideHistoricalMessages from "../pages/pageGuideHistoricalMessages";

class GuideHistoricalMessagesComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuidedHistoricalMessages/>
            </div>
        )
    }
}

export default GuideHistoricalMessagesComponent