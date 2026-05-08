# 📊 Spectrophotometer Web App

A modern web-based application for real-time spectrum analysis using USB-connected devices. Built with **React + Vite**, this app enables users to visualize spectral data, detect peak wavelengths (λ max), and export results efficiently.

---

## 🚀 Features

* 🔌 **USB Device Integration (Web Serial API)**
* 📈 **Real-time Spectrum Visualization**
* 🎯 **Automatic λ max Detection**
* ⏯️ **Start / Stop Data Streaming**
* 🌙 **Dark Mode UI**
* 📊 **Multi-Scan Overlay**
* 💾 **Export Data as CSV**
* 🖼️ **Export Graph as Image**
* ⚡ **High Performance Rendering**

---

## 🧠 How It Works

1. Connect your USB device (Serial-based).
2. Click **Connect USB** and select your device.
3. Start scanning to receive real-time data.
4. The graph updates live as data is received.
5. The system automatically detects **λ max**.
6. Export results when needed.

---

## 🔧 Tech Stack

* **Frontend:** React (Vite)
* **Charting:** Recharts
* **USB Communication:** Web Serial API
* **Utilities:** html2canvas (for image export)

---

## 📂 Project Structure

```
src/
│── components/
│   ├── Chart.jsx
│   ├── Controls.jsx
│   ├── USBService.js
│
│── App.jsx
│── main.jsx
```

---

## 🔌 USB Data Format

The connected device must send data in **JSON format**:

```json
{"wavelength":500,"absorbance":0.65}
```

Each reading should be sent as a separate line.

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project folder
cd spectrum-app

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## 🌐 Requirements

* Google Chrome or Microsoft Edge
* HTTPS or localhost environment
* USB device supporting Serial communication

---

## ⚠️ Important Notes

* Web Serial API works only with **Serial (COM) devices**
* Mobile phones are **not supported via USB**
* Ensure proper drivers are installed for your device

---

## 📤 Export Options

* **CSV Export:** Saves all scan data
* **Image Export:** Saves graph as PNG

---

## 🎯 Use Cases

* Spectrophotometer integration
* Scientific data visualization
* Embedded systems monitoring
* Educational labs

---

## 📸 Screenshots

*(Add screenshots here if available)*

---

## 🤝 Author

Developed by **Abdullah Tarek**
Full Stack Developer (.NET & React)

---

## 📄 License

This project is provided for freelance/client use.
All rights reserved to the client unless stated otherwise.

---

## 💡 Future Improvements

* Device auto-detection
* Data smoothing & filtering
* Cloud data storage
* User authentication system

---
