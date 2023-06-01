document.getElementById("calculate").onclick = function() {
  let opportunities = document.getElementById("Opportunities").value;
  let defects = document.getElementById("Defects").value;

  let DPMO = (defects / opportunities) * 1000000;
  document.getElementById("DPMO").value = DPMO;

  let defectsPercentage = (defects / opportunities) * 100;
  document.getElementById("Defect").value = defectsPercentage.toFixed(2);

  let yield = (100 - defectsPercentage).toFixed(2);
  document.getElementById("Yield").value = yield;

  let sigma = processSigma(1 - defects / opportunities) + 1.5;
  sigma = sigma.toFixed(2); // Limit to two decimal places

  document.getElementById("processSigma").value = sigma;
}

function processSigma(p) {
  if (p < 0 || p > 1) {
    throw "The argument to NormSInv must be between 0 and 1.";
  }
  if (p == 0) {
    return -Infinity;
  }
  if (p == 1) {
    return Infinity;
  }
  if (isNaN(p)) {
    return NaN;
  }

  var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
  var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
  var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
  var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
  var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
  var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
  var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
  var p_low = 0.02425, p_high = 1 - p_low;
  var q, r;
  if (0 < p && p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
  if (p_low <= p && p <= p_high) {
    q = p - 0.5;
    r = q * q;
    return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * q /
            ((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1) *
        Math.sqrt(-Math.log(p));
  }
  if (p_high < p && p < 1) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
}