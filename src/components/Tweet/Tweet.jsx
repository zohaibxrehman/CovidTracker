import React from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed'

import styles from './Tweet.module.css';

const Tweet = () => {
    return (
        <div className={styles.container}>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="WHO"
                autoHeight
                // options={{height: 700}}
            />
        </div>
    );
};

export default Tweet;