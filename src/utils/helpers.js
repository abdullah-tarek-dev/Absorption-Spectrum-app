export const getMaxPoint = (scan) => {
  if (!scan.length) return null;
  return scan.reduce((max, p) =>
    p.absorbance > max.absorbance ? p : max
  );
};