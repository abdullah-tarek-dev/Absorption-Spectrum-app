import { useState } from "react";
import SpectrumChart from "./components/SpectrumChart";
import Controls from "./components/Controls";
import useSerial from "./hooks/useSerial";
import { getMaxPoint } from "./utils/helpers";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [scans, setScans] = useState([[]]);
  const [currentScan, setCurrentScan] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const onData = (data) => {
    if (!isRunning) return;

    setScans(prev => {
      const updated = [...prev];
      updated[currentScan] = [...updated[currentScan], data];
      return updated;
    });
  };

  const { connect, connected } = useSerial(onData);

  const exportCSV = () => {
    const scan = scans[currentScan];
    const csv = [
      ["Wavelength", "Absorbance"],
      ...scan.map(p => [p.wavelength, p.absorbance])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.csv";
    a.click();
  };

  const exportImage = () => {
    html2canvas(document.getElementById("chart"))
      .then(c => {
        const a = document.createElement("a");
        a.href = c.toDataURL();
        a.download = "chart.png";
        a.click();
      });
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>

      <h2>Absorption Spectrum</h2>

      <Controls
        onStart={() => setIsRunning(true)}
        onStop={() => setIsRunning(false)}
        onNewScan={() => {
          setScans(prev => [...prev, []]);
          setCurrentScan(scans.length);
        }}
        onCSV={exportCSV}
        onImage={exportImage}
        onToggleDark={() => setDarkMode(!darkMode)}
        onConnect={connect}
        connected={connected}
      />

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