import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Legend);

const SpectrumChart = ({ scans, currentScan, getMaxPoint, darkMode }) => {

  let datasets = scans.map((scan, index) => ({
    label: `Scan ${index + 1}`,
    data: scan.map(p => ({ x: p.wavelength, y: p.absorbance })),
    borderWidth: 2,
    tension: 0.4
  }));

  // 🌟 λ max
  const maxPoint = getMaxPoint(scans[currentScan] || []);

  if (maxPoint) {
    datasets.push({
      label: 'λ max',
      data: [{ x: maxPoint.wavelength, y: maxPoint.absorbance }],
      pointRadius: 6,
      pointBackgroundColor: 'red',
      showLine: false
    });
  }

  const data = { datasets };

  const options = {
    responsive: true,
    parsing: false,
    scales: {
      x: {
        type: 'linear',
        min: 400,
        max: 800,
        title: {
          display: true,
          text: 'Wavelength (nm)',
          color: darkMode ? '#fff' : '#000'
        },
        ticks: { color: darkMode ? '#fff' : '#000' }
      },
      y: {
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'Absorbance',
          color: darkMode ? '#fff' : '#000'
        },
        ticks: { color: darkMode ? '#fff' : '#000' }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '#000'
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default SpectrumChart;