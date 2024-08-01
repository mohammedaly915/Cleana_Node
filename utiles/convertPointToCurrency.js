const POINT_TO_CURRENCY_RATIO = 0.1; // Example: 1 point = $0.10

const convertPointsToCurrency = (points) => {
  return points * POINT_TO_CURRENCY_RATIO;
};

const convertCurrencyToPoints = (amount) => {
  return amount / POINT_TO_CURRENCY_RATIO;
};

module.exports={
    convertCurrencyToPoints,
    convertPointsToCurrency
}