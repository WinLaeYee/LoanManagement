
function calculateInterest(loanAmount, interestRate, startDate, endDate) {
    // const years = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24 * 365.25);
    const years =
      new Date(endDate).getFullYear() - new Date(startDate).getFullYear();

    console.log(years);
    const interest = loanAmount * (interestRate / 100) * years;
    console.log(interest);
    return Math.round(interest * 100) / 100;
}

module.exports = { calculateInterest };
