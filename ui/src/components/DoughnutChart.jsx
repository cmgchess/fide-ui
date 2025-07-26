import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ title, dataPoints }) => {
  const total = dataPoints.reduce(
    (previousValue, currentValue) =>
      parseInt(previousValue) + parseInt(currentValue)
  );

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} (${Math.round(
              (tooltipItem.parsed / total) * 100
            )}%)`;
          },
        },
      },
    },
  };

  const data = {
    labels: ['Win', 'Draw', 'Loss'],
    datasets: [
      {
        data: dataPoints,
        backgroundColor: [
          'rgba(135, 206, 250, 1.0)',
          'rgba(211, 211, 211, 1.0)',
          'rgba(250, 128, 114, 1.0)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center font-bold">
      <h1 className="text-center">{title}</h1>
      <div className="h-80 w-72 mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
