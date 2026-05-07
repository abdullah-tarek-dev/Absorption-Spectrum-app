import { useState, useEffect } from 'react';
import SpectrumChart from "./components/SpectrumChart";
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [scans, setScans] = useState([[]]);
  const [currentScan, setCurrentScan] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 🌐 WebSocket
  useEffect(() => {
    if (!isRunning) return;

    const socket = new WebSocket("ws://localhost:5000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setScans(prev => {
        const updated = [...prev];
        updated[currentScan] = [...updated[currentScan], data];
        return updated;
      });
    };

    socket.onerror = (err) => {
      console.error("Socket Error:", err);
    };

    return () => {
      socket.close(); // مهم جدًا
    };
  }, [isRunning, currentScan]);

  // 🌟 λ max
  const getMaxPoint = (scan) => {
    if (!scan.length) return null;
    return scan.reduce((max, p) =>
      p.absorbance > max.absorbance ? p : max
    );
  };

  // 💾 CSV
  const exportCSV = () => {
    const scan = scans[currentScan];

    const csv = [
      ['Wavelength', 'Absorbance'],
      ...scan.map(p => [p.wavelength, p.absorbance])
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'spectrum.csv';
    a.click();
  };

  // 📸 صورة
  const exportImage = () => {
    const chart = document.getElementById('chart');

    html2canvas(chart).then(canvas => {
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>

      {/* Header */}
      <div className="header">
        <h2 className="title">Absorption Spectrum</h2>

        <button className="btn-dark" onClick={() => setDarkMode(!darkMode)}>
          🌙 Dark Mode
        </button>
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="btn-start" onClick={() => setIsRunning(true)}>Start</button>
        <button className="btn-stop" onClick={() => setIsRunning(false)}>Stop</button>

        <button className="btn-scan" onClick={() => {
          setScans(prev => [...prev, []]);
          setCurrentScan(scans.length);
        }}>
          New Scan
        </button>

        <button className="btn-export" onClick={exportCSV}>Export CSV</button>
        <button className="btn-export" onClick={exportImage}>Export Image</button>
      </div>

      {/* Chart */}
      <div id="chart" className="chart-card">
        <SpectrumChart
          scans={scans}
          currentScan={currentScan}
          getMaxPoint={getMaxPoint}
          darkMode={darkMode}
        />
      </div>

    </div>
  );
}

export default App;