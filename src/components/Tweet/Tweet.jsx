import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Grid } from '@material-ui/core';
import styles from './Tweet.module.css';

const Tweet = () => {
	return (
		<div className={styles.container}>
			<Grid container spacing={2}>
				<Grid item md={6} xs={12}>
					<TwitterTimelineEmbed sourceType="profile" screenName="WHO" options={{ height: '45vh' }} />
				</Grid>
				<Grid item md={6} xs={12}>
					<TwitterTimelineEmbed
						sourceType="profile"
						screenName="PandemicCovid20"
						options={{ height: '45vh' }}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Tweet;
