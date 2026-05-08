export default function Controls({
  onStart,
  onStop,
  onNewScan,
  onCSV,
  onImage,
  onToggleDark,
  onConnect,
  connected
}) {
  return (
    <div className="controls">

      <button className="btn-start" onClick={onStart}>Start</button>
      <button className="btn-stop" onClick={onStop}>Stop</button>

      <button className="btn-scan" onClick={onNewScan}>New Scan</button>

      <button className="btn-export" onClick={onCSV}>CSV</button>
      <button className="btn-export" onClick={onImage}>Image</button>

      <button className="btn-dark" onClick={onToggleDark}>Dark</button>

      <button onClick={onConnect}>
        {connected ? "Connected" : "Connect USB"}
      </button>

    </div>
  );
}