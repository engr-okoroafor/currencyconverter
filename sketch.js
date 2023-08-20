// JavaScript Code (Unchanged)
const rate1 = document.querySelector(".rate1");
const rate2 = document.querySelector(".rate2");
const resultBtn = document.querySelector(".result");
const selects = document.querySelectorAll(".options select");
const sel1 = selects[0];
const sel2 = selects[1];
const inputs = document.querySelectorAll(".input input");
const inpt1 = inputs[0];
const inpt2 = inputs[1];

let mainContainerRates = {}; // For main container rates
let rateCardRates = {}; // For rate-card rates

const exchangeRatesURLMain = "https://api.exchangerate.host/latest?base=USD";
const exchangeRatesURLRateCard = "https://api.exchangerate.host/latest?base=NGN"; // Use NGN as the base currency for rate-card

fetchExchangeRates();

async function fetchExchangeRates() {
    try {
        const [responseMain, responseRateCard] = await Promise.all([
            fetch(exchangeRatesURLMain),
            fetch(exchangeRatesURLRateCard)
        ]);

        const dataMain = await responseMain.json();
        mainContainerRates = dataMain.rates;

        const dataRateCard = await responseRateCard.json();
        rateCardRates = dataRateCard.rates;

        populateOptions();
        updateRateCard();
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
}

function populateOptions() {
    let val = "";
    Object.keys(mainContainerRates).forEach(code => {
        const str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach(s => s.innerHTML = val);
    displayRate();
}

function convert(val, fromCurr, toCurr, rates) {
    if (fromCurr === "NGN") {
        return (val * rates[toCurr]).toFixed(2); // Convert directly to NGN without division
    }
    let v = (val / rates[fromCurr]) * rates[toCurr];
    return v.toFixed(2); // Always round to 2 decimal places
}

function displayRate() {
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2, mainContainerRates);

    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

function updateRateCard() {
    const rateCardRows = document.querySelectorAll(".rate-card .rate-row");

    rateCardRows.forEach(row => {
        const currencyCode = row.querySelector("[data-currency-code]").getAttribute("data-currency-code");
        const rate = rateCardRates[currencyCode];

        // Convert rate to Naira (NGN)
        const rateInNaira = convert(1, currencyCode, "NGN", rateCardRates);

        row.querySelector("[data-currency-code]").textContent = `₦ ${rateInNaira}`;
    });
}

resultBtn.addEventListener("click", () => {
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inpt1.value);
    let toCurr = sel2.value;

    if (isNaN(fromVal)) {
        alert("Enter a Number");
    } else {
        let cVal = convert(fromVal, fromCurr, toCurr, mainContainerRates);
        inpt2.value = cVal;
    }
});

selects.forEach(s => s.addEventListener("change", displayRate));

document.querySelector(".swap").addEventListener("click", () => {
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    displayRate();
});

// Live Clock
const clock = document.querySelector(".clock");

function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    clock.textContent = formattedDate;
}

setInterval(updateClock, 1000);
updateClock();
