import React from "react";
import {styles} from './ComponentCss';
import DivPageGuideRequestsMessages from "../pages/pageGuideRequestsMessages";

class GuideRequestsMessagesComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideRequestsMessages/>
            </div>
        )
    }
}

export default GuideRequestsMessagesComponent