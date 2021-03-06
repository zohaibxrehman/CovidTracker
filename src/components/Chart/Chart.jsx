import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
              labels: dailyData.map(({ date }) => date),
              datasets: [{
                    data: dailyData.map((data) => data.confirmed),
                    label: 'Infected',
                    borderColor: 'rgb(158,126,245)',
                    backgroundColor:'rgb(0,0,255,0.2)',
                    fill: true,
                    }, {
                    data: dailyData.map((data) => data.deaths),
                    label: 'Deaths',
                    borderColor: 'rgb(241,71,152)',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                    },
                ],
            }}
          />
        ) : null
    );

    let title = country ? `Current state in ${country}` : 'Current state in the world.'
    
    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgb(158,126,245)', 'rgba(0, 255, 0, 0.5)', 'rgb(241,71,152)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: title},
            }}
          />
        ) : null
    );

    return (
        <div className={styles.container}>
          {/* {country ? barChart : lineChart} */}
          {barChart}
        </div>
      );
}

export default Chart;