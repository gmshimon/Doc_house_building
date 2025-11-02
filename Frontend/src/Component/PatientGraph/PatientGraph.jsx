import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PatientGraph = () => {

    const series = [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ]
    const options= {
        chart: {
          height: 350,
          type: 'area',
          zoom: {
            enabled: false
          },
          toolbar: {
              show: false
            },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      }

    return (
        <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
    );
};

export default PatientGraph;