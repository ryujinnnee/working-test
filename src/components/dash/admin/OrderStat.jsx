// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";

// const OrderStat = () => {
//   const [chartOptions, setChartOptions] = useState({
//     series: [44, 55, 41, 17, 15],
//     options: {
//       chart: {
//         type: "donut",
//         shadow: {
//           enabled: true,
//           blur: 3,
//           opacity: 0.2,
//         },
//       },
//       labels: ["Apple", "Mango", "Orange", "Watermelon", "Pineapple"],
//       colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
//       plotOptions: {
//         pie: {
//           donut: {
//             size: "65%",
//             padding: 5,
//           },
//         },
//       },
//       dataLabels: {
//         enabled: true,
//         formatter: function (val, opts) {
//           return opts.w.config.series[opts.seriesIndex] + "%";
//         },
//         style: {
//           fontSize: "14px",
//           fontFamily: "Helvetica, Arial, sans-serif",
//           fontWeight: "bold",
//           colors: ["#fff"],
//         },
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               position: "bottom",
//             },
//           },
//         },
//       ],
//     },
//   });
//   const chartData = [
//     // Data seperti di atas
//     {
//       month: "Jan 24",
//       smm: 25,
//       ads: 20,
//     },
//     {
//       month: "Feb 24",
//       smm: 12,
//       ads: 6,
//     },
//     {
//       month: "Mar 24",
//       smm: 18,
//       ads: 10,
//     },
//     {
//       month: "Apr 24",
//       smm: 15,
//       ads: 12,
//     },
//     {
//       month: "Mei 24",
//       smm: 22,
//       ads: 0,
//     },
//   ];
//   const chartHeight = 48;
//   const maxValue = 50;
//   return (
//     <div className="appddd">
//       <div className="flex flex-col">
//         <div className="mixed-chart">
//           <Chart
//             options={chartOptions.options}
//             series={chartOptions.series}
//             type="donut"
//             width="330"
//           />
//         </div>
//         {/* <div className="flex items-end space-x-4 h-48 relative">
//           <div className="absolute -left-6 top-0 text-xs">{maxValue}</div>
//           <div className="absolute -left-6 top-[calc(48px*1/5*4)] text-xs">
//             {(maxValue * 4) / 5}
//           </div>
//           <div className="absolute -left-6 top-[calc(48px*2/5*4)] text-xs">
//             {(maxValue * 3) / 5}
//           </div>
//           <div className="absolute -left-6 top-[calc(48px*3/5*4)] text-xs">
//             {(maxValue * 2) / 5}
//           </div>
//           <div className="absolute -left-6 top-[calc(48px*4/5*4)] text-xs">
//             {maxValue / 5}
//           </div>
//           <div className="absolute -left-6 bottom-0 text-xs">0</div>
//           <div className="absolute w-full h-[1px] bg-gray-300 top-[32px]"></div>

//           {chartData.map((data, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div
//                 className="bg-red-500 mb-1 animate-bounce"
//                 style={{
//                   height: `${(data.smm / maxValue) * chartHeight}px`,
//                   width: "2rem",
//                 }}
//               ></div>
//               <div
//                 className="bg-blue-400 animate-pulse"
//                 style={{
//                   height: `${(data.ads / maxValue) * chartHeight}px`,
//                   width: "2rem",
//                 }}
//               ></div>
//               <span className="text-xs">{data.month}</span>
//             </div>
//           ))}
//         </div>
//         <div class="mt-4 flex space-x-4 justify-end">
//           <div class="flex items-center space-x-2">
//             <div class="w-4 h-2 bg-red-500"></div>
//             <span>SMM</span>
//           </div>
//           <div class="flex items-center space-x-2">
//             <div class="w-4 h-2 bg-blue-400"></div>
//             <span>Ads</span>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default OrderStat;
import React from 'react';
import Chart from "react-apexcharts";

const OrderStat = () => {
  const chartData = [44, 55, 13, 43];
  const chartLabels = ['SMM', 'Video Ads', 'SEO', 'Email marketing'];
  const chartColors = ['#9ED9F5', '#F3A0A2', '#E05679', '#FF4560'];
  const totalVisitors = chartData.reduce((sum, value) => sum + value, 0); // Menghitung total pengunjung

  const chartOptions = {
    series: chartData,
    options: {
      chart: {
        type: 'donut',
      },
      labels: chartLabels,
      colors: chartColors,
      dataLabels: { enabled: false }, // Menonaktifkan label di dalam chart
      legend: { show: false }, // Menonaktifkan legend default ApexCharts
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Order',
                formatter: function (w) {
                  return "$"+(totalVisitors/10).toFixed(1) + "k"
                }
              }
            }
          }
        }
      }
    },
  };

  return (
    <div className=" rounded-lg px-1 w-fit flex flex-col items-center">
      <Chart options={chartOptions.options} series={chartOptions.series} type="donut" width="250" />

      <div className="mt-1 flex flex-wrap items-center justify-center w-3/4">
        {chartLabels.map((label, index) => (
          <div key={index} className="flex items-center space-x-2 mr-4 mb-2">
            <div className="w-4 h-2 rounded-full" style={{ backgroundColor: chartColors[index] }}></div> {/* Membuat kotak legenda bulat */}
            <span>{label}</span> {/* Hanya menampilkan label, tanpa nilai persentase */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStat;