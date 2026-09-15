/**
 * Apparent geocentric solar longitude, accurate to about 1″ (≈ 25 s of time),
 * used for the 24 solar terms.
 *
 * Method: Meeus, "Astronomical Algorithms" 2nd ed., ch. 25 (higher accuracy):
 * heliocentric Earth longitude from the abridged VSOP87 series (Appendix III),
 * FK5 correction, nutation in longitude (ch. 22, 0.5″ series) and aberration.
 * Civil time uses ΔT from the Espenak–Meeus polynomial expressions (NASA, 2006).
 */

const J2000 = 2451545.0;
const DEG = Math.PI / 180;

type Term = readonly [amplitude: number, phase: number, frequency: number];

const L0: readonly Term[] = [
  [175347046, 0, 0],
  [3341656, 4.6692568, 6283.07585],
  [34894, 4.6261, 12566.1517],
  [3497, 2.7441, 5753.3849],
  [3418, 2.8289, 3.5231],
  [3136, 3.6277, 77713.7715],
  [2676, 4.4181, 7860.4194],
  [2343, 6.1352, 3930.2097],
  [1324, 0.7425, 11506.7698],
  [1273, 2.0371, 529.691],
  [1199, 1.1096, 1577.3435],
  [990, 5.233, 5884.927],
  [902, 2.045, 26.298],
  [857, 3.508, 398.149],
  [780, 1.179, 5223.694],
  [753, 2.533, 5507.553],
  [505, 4.583, 18849.228],
  [492, 4.205, 775.523],
  [357, 2.92, 0.067],
  [317, 5.849, 11790.629],
  [284, 1.899, 796.298],
  [271, 0.315, 10977.079],
  [243, 0.345, 5486.778],
  [206, 4.806, 2544.314],
  [205, 1.869, 5573.143],
  [202, 2.458, 6069.777],
  [156, 0.833, 213.299],
  [132, 3.411, 2942.463],
  [126, 1.083, 20.775],
  [115, 0.645, 0.98],
  [103, 0.636, 4694.003],
  [102, 0.976, 15720.839],
  [102, 4.267, 7.114],
  [99, 6.21, 2146.17],
  [98, 0.68, 155.42],
  [86, 5.98, 161000.69],
  [85, 1.3, 6275.96],
  [85, 3.67, 71430.7],
  [80, 1.81, 17260.15],
  [79, 3.04, 12036.46],
  [75, 1.76, 5088.63],
  [74, 3.5, 3154.69],
  [74, 4.68, 801.82],
  [70, 0.83, 9437.76],
  [62, 3.98, 8827.39],
  [61, 1.82, 7084.9],
  [57, 2.78, 6286.6],
  [56, 4.39, 14143.5],
  [56, 3.47, 6279.55],
  [52, 0.19, 12139.55],
  [52, 1.33, 1748.02],
  [51, 0.28, 5856.48],
  [49, 0.49, 1194.45],
  [41, 5.37, 8429.24],
  [41, 2.4, 19651.05],
  [39, 6.17, 10447.39],
  [37, 6.04, 10213.29],
  [37, 2.57, 1059.38],
  [36, 1.71, 2352.87],
  [36, 1.78, 6812.77],
  [33, 0.59, 17789.85],
  [30, 0.44, 83996.85],
  [30, 2.74, 1349.87],
  [25, 3.16, 4690.48],
];

const L1: readonly Term[] = [
  [628331966747, 0, 0],
  [206059, 2.678235, 6283.07585],
  [4303, 2.6351, 12566.1517],
  [425, 1.59, 3.523],
  [119, 5.796, 26.298],
  [109, 2.966, 1577.344],
  [93, 2.59, 18849.23],
  [72, 1.14, 529.69],
  [68, 1.87, 398.15],
  [67, 4.41, 5507.55],
  [59, 2.89, 5223.69],
  [56, 2.17, 155.42],
  [45, 0.4, 796.3],
  [36, 0.47, 775.52],
  [29, 2.65, 7.11],
  [21, 5.34, 0.98],
  [19, 1.85, 5486.78],
  [19, 4.97, 213.3],
  [17, 2.99, 6275.96],
  [16, 0.03, 2544.31],
  [16, 1.43, 2146.17],
  [15, 1.21, 10977.08],
  [12, 2.83, 1748.02],
  [12, 3.26, 5088.63],
  [12, 5.27, 1194.45],
  [12, 2.08, 4694.0],
  [11, 0.77, 553.57],
  [10, 1.3, 6286.6],
  [10, 4.24, 1349.87],
  [9, 2.7, 242.73],
  [9, 5.64, 951.72],
  [8, 5.3, 2352.87],
  [6, 2.65, 9437.76],
  [6, 4.67, 4690.48],
];

const L2: readonly Term[] = [
  [52919, 0, 0],
  [8720, 1.0721, 6283.0758],
  [309, 0.867, 12566.152],
  [27, 0.05, 3.52],
  [16, 5.19, 26.3],
  [16, 3.68, 155.42],
  [10, 0.76, 18849.23],
  [9, 2.06, 77713.77],
  [7, 0.83, 775.52],
  [5, 4.66, 1577.34],
  [4, 1.03, 7.11],
  [4, 3.44, 5573.14],
  [3, 5.14, 796.3],
  [3, 6.05, 5507.55],
  [3, 1.19, 242.73],
  [3, 6.12, 529.69],
  [3, 0.31, 398.15],
  [3, 2.28, 553.57],
  [2, 4.38, 5223.69],
  [2, 3.75, 0.98],
];

const L3: readonly Term[] = [
  [289, 5.844, 6283.076],
  [35, 0, 0],
  [17, 5.49, 12566.15],
  [3, 5.2, 155.42],
  [1, 4.72, 3.52],
  [1, 5.3, 18849.23],
  [1, 5.97, 242.73],
];

const L4: readonly Term[] = [
  [114, 3.142, 0],
  [8, 4.13, 6283.08],
  [1, 3.84, 12566.15],
];

const L5: readonly Term[] = [[1, 3.14, 0]];

const SERIES = [L0, L1, L2, L3, L4, L5];

function sumSeries(terms: readonly Term[], tau: number): number {
  let s = 0;
  for (const [a, b, c] of terms) s += a * Math.cos(b + c * tau);
  return s;
}

function normalizeDegrees(x: number): number {
  const r = x % 360;
  return r < 0 ? r + 360 : r;
}

/** Apparent solar longitude in degrees [0, 360) at Julian Ephemeris Day `jde` (TT). */
export function apparentSolarLongitude(jde: number): number {
  const tau = (jde - J2000) / 365250;
  let L = 0;
  let tauPow = 1;
  for (const series of SERIES) {
    L += sumSeries(series, tau) * tauPow;
    tauPow *= tau;
  }
  L /= 1e8; // radians, heliocentric ecliptic longitude of Earth
  const geometric = normalizeDegrees(L / DEG + 180);

  const T = tau * 10;
  const fk5 = -0.09033 / 3600;

  const omega = (125.04452 - 1934.136261 * T) * DEG;
  const sunMean = (280.4665 + 36000.7698 * T) * DEG;
  const moonMean = (218.3165 + 481267.8813 * T) * DEG;
  const nutation =
    (-17.2 * Math.sin(omega) -
      1.32 * Math.sin(2 * sunMean) -
      0.23 * Math.sin(2 * moonMean) +
      0.21 * Math.sin(2 * omega)) /
    3600;

  // Sun–Earth distance (AU) from the Kepler equation of centre, enough for aberration.
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * DEG;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);
  const nu = M + C * DEG;
  const R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(nu));
  const aberration = -20.4898 / 3600 / R;

  return normalizeDegrees(geometric + fk5 + nutation + aberration);
}

/** ΔT = TT − UT in seconds (Espenak & Meeus polynomials, valid 1900–2150). */
export function deltaTSeconds(decimalYear: number): number {
  const y = decimalYear;
  if (y < 1920) {
    const t = y - 1900;
    return -2.79 + 1.494119 * t - 0.0598939 * t ** 2 + 0.0061966 * t ** 3 - 0.000197 * t ** 4;
  }
  if (y < 1941) {
    const t = y - 1920;
    return 21.2 + 0.84493 * t - 0.0761 * t ** 2 + 0.0020936 * t ** 3;
  }
  if (y < 1961) {
    const t = y - 1950;
    return 29.07 + 0.407 * t - t ** 2 / 233 + t ** 3 / 2547;
  }
  if (y < 1986) {
    const t = y - 1975;
    return 45.45 + 1.067 * t - t ** 2 / 260 - t ** 3 / 718;
  }
  if (y < 2005) {
    const t = y - 2000;
    return (
      63.86 +
      0.3345 * t -
      0.060374 * t ** 2 +
      0.0017275 * t ** 3 +
      0.000651814 * t ** 4 +
      0.00002373599 * t ** 5
    );
  }
  if (y < 2050) {
    const t = y - 2000;
    return 62.92 + 0.32217 * t + 0.005589 * t ** 2;
  }
  return -20 + 32 * ((y - 1820) / 100) ** 2 - 0.5628 * (2150 - y);
}

function decimalYearOfJd(jd: number): number {
  return 2000 + (jd - J2000) / 365.25;
}

export function utToTt(jdUt: number): number {
  return jdUt + deltaTSeconds(decimalYearOfJd(jdUt)) / 86400;
}

export function ttToUt(jde: number): number {
  return jde - deltaTSeconds(decimalYearOfJd(jde)) / 86400;
}

const MEAN_TROPICAL_YEAR = 365.242189;

/**
 * JDE (TT) at which the apparent solar longitude equals `targetDeg`,
 * searching around `jdeGuess` (must be within ~half a year).
 */
export function jdeOfSolarLongitude(targetDeg: number, jdeGuess: number): number {
  let jde = jdeGuess;
  for (let i = 0; i < 50; i++) {
    let diff = normalizeDegrees(targetDeg - apparentSolarLongitude(jde));
    if (diff > 180) diff -= 360;
    if (Math.abs(diff) < 1e-8) break;
    jde += (diff * MEAN_TROPICAL_YEAR) / 360;
  }
  return jde;
}

/** Unix epoch milliseconds → Julian date (UT). */
export function jdFromUnixMs(ms: number): number {
  return ms / 86400000 + 2440587.5;
}

/** Julian date (UT) → Unix epoch milliseconds. */
export function unixMsFromJd(jd: number): number {
  return (jd - 2440587.5) * 86400000;
}
