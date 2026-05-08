import { useState, useRef } from "react";

export default function useSerial(onData) {
  const [connected, setConnected] = useState(false);
  const readerRef = useRef(null);

  const connect = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const reader = port.readable.getReader();
      readerRef.current = reader;
      setConnected(true);

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += new TextDecoder().decode(value);

        let lines = buffer.split("\n");
        buffer = lines.pop();

        for (let line of lines) {
          try {
            const data = JSON.parse(line);
            onData(data);
          } catch {
            console.warn("Invalid data:", line);
          }
        }
      }

    } catch (err) {
      console.error("USB Error:", err);
    }
  };

  const disconnect = async () => {
    if (readerRef.current) {
      await readerRef.current.cancel();
      setConnected(false);
    }
  };

  return { connect, disconnect, connected };
}