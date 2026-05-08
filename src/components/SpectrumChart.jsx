import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Legend);

const SpectrumChart = ({ scans, currentScan, getMaxPoint, darkMode }) => {

  let datasets = scans.map((scan, i) => ({
    label: `Scan ${i + 1}`,
    data: scan.map(p => ({ x: p.wavelength, y: p.absorbance })),
    tension: 0.4,
    borderWidth: 2
  }));

  const max = getMaxPoint(scans[currentScan] || []);

  if (max) {
    datasets.push({
      label: "λ max",
      data: [{ x: max.wavelength, y: max.absorbance }],
      pointRadius: 6,
      showLine: false
    });
  }

  return (
    <Line
      data={{ datasets }}
      options={{
        parsing: false,
        responsive: true,
        scales: {
          x: { type: 'linear', min: 400, max: 800 },
          y: { min: 0, max: 1 }
        },
        plugins: {
          legend: {
            labels: {
              color: darkMode ? "#fff" : "#000"
            }
          }
        }
      }}
    />
  );
};

export default SpectrumChart;