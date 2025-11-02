import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AppointmentGraph = () => {
    const series = [44, 55, 13, 43, 22];
    const options= {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 360
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    return (
        <section>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="pie" width={480} />
              </div>
        </section>
    );
};

export default AppointmentGraph;