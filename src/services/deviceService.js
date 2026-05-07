export function startMockStream(callback) {
  let wavelength = 400;

  setInterval(() => {
    const absorbance = Math.random(); // simulate

    callback({
      wavelength,
      absorbance
    });

    wavelength += 10;
    if (wavelength > 800) wavelength = 400;

  }, 1000);
}