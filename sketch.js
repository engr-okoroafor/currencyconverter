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
        const flagEmoji = getFlagEmoji(code); // Function to get the flag emoji
        const str = `<option value="${code}">${flagEmoji} ${code}</option>`;
        val += str;
    });
    selects.forEach(s => s.innerHTML = val);
    displayRate();
}

function getFlagEmoji(currencyCode) {
    const flagEmojis = {
    USD: "🇺🇸", GBP: "🇬🇧", EUR: "🇪🇺", CAD: "🇨🇦", AED: "🇦🇪", AED: "🇦🇪",AFN: "🇦🇫", ALL: "🇦🇱", AMD: "🇦🇲", ANG: "🇦🇳", AOA: "🇦🇴", ARS: "🇦🇷", AUD: "🇦🇺", AWG: "🇦🇼", AZN: "🇦🇿", BAM: "🇧🇦", BBD: "🇧🇧", BDT: "🇧🇩", BGN: "🇧🇬", BHD: "🇧🇭", BIF: "🇧🇮", BMD: "🇧🇲", BND: "🇧🇳", BOB: "🇧🇴", BRL: "🇧🇷", BSD: "🇧🇸", BTN: "🇧🇹", BWP: "🇧🇼", BYN: "🇧🇾", BZD: "🇧🇿", CAD: "🇨🇦", CDF: "🇨🇩", CHF: "🇨🇭", CLP: "🇨🇱", CNY: "🇨🇳", COP: "🇨🇴", CRC: "🇨🇷", CUC: "🇨🇺", CVE: "🇨🇻", CZK: "🇨🇿", DJF: "🇩🇯", DKK: "🇩🇰", DOP: "🇩🇴", DZD: "🇩🇿", EGP: "🇪🇬", ERN: "🇪🇷", ETB: "🇪🇹", EUR: "🇪🇺", FJD: "🇫🇯", FKP: "🇫🇰", GBP: "🇬🇧", GEL: "🇬🇪", GGP: "🇬🇬", GHS: "🇬🇭", GIP: "🇬🇮", GMD: "🇬🇲", GNF: "🇬🇳", GTQ: "🇬🇹", GYD: "🇬🇾", HKD: "🇭🇰", HNL: "🇭🇳", HRK: "🇭🇷", HTG: "🇭🇹", HUF: "🇭🇺", IDR: "🇮🇩", ILS: "🇮🇱", IMP: "🇮🇲", INR: "🇮🇳", IQD: "🇮🇶", IRR: "🇮🇷", ISK: "🇮🇸", JEP: "🇯🇪", JMD: "🇯🇲", JOD: "🇯🇴", JPY: "🇯🇵", KES: "🇰🇪", KGS: "🇰🇬", KHR: "🇰🇭", KMF: "🇰🇲", KRW: "🇰🇷", KWD: "🇰🇼", KYD: "🇰🇾", KZT: "🇰🇿", LAK: "🇱🇦", LBP: "🇱🇧", LKR: "🇱🇰", LRD: "🇱🇷", LSL: "🇱🇸", LYD: "🇱🇾", MAD: "🇲🇦", MDL: "🇲🇩", MGA: "🇲🇬", MKD: "🇲🇰", MMK: "🇲🇲", MNT: "🇲🇳", MOP: "🇲🇴", MRO: "🇲🇷", MRU: "🇲🇷", MUR: "🇲🇺", MVR: "🇲🇻", MWK: "🇲🇼", MXN: "🇲🇽", MYR: "🇲🇾", MZN: "🇲🇿", MZN: "🇲🇿", NAD: "🇳🇦", NGN: "🇳🇬", NIO: "🇳🇮", NOK: "🇳🇴", NPR: "🇳🇵", NZD: "🇳🇿", OMR: "🇴🇲", PAB: "🇵🇦", PEN: "🇵🇪", PGK: "🇵🇬", PHP: "🇵🇭", PKR: "🇵🇰", PLN: "🇵🇱", PYG: "🇵🇾", QAR: "🇶🇦", RON: "🇷🇴", RSD: "🇷🇸", RUB: "🇷🇺", RWF: "🇷🇼", SAR: "🇸🇦", SBD: "🇸🇧", SCR: "🇸🇨", SDG: "🇸🇩", SEK: "🇸🇪", SGD: "🇸🇬", SHP: "🇸🇭", SLL: "🇸🇱", SOS: "🇸🇴", SRD: "🇸🇷", SSP: "🇸🇸", STN: "🇸🇹", SVC: "🇸🇻", SYP: "🇸🇾", SZL: "🇸🇿", THB: "🇹🇭", TJS: "🇹🇯", TMT: "🇹🇲", TND: "🇹🇳", TOP: "🇹🇴", TRY: "🇹🇷", TTD: "🇹🇹", TWD: "🇹🇼", TZS: "🇹🇿", UAH: "🇺🇦", UGX: "🇺🇬", USD: "🇺🇸", UYU: "🇺🇾", UZS: "🇺🇿", VEF: "🇻🇪", VES: "🇻🇪", VND: "🇻🇳", VUV: "🇻🇺", WST: "🇼🇸", XAF: "🇨🇫", XCD: "🇦🇬", XOF: "🇨🇮", XPF: "🇵🇫", YER: "🇾🇪", ZAR: "🇿🇦", ZMW: "🇿🇲", ZWL: "🇿🇼", 
    // Add more currency codes and their Unicode flag emojis here
};

    return flagEmojis[currencyCode] || currencyCode; // Return the flag emoji or the currency code itself
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

    const flagEmoji1 = getFlagEmoji(v1);
    const flagEmoji2 = getFlagEmoji(v2);

    let val = convert(1, v1, v2, mainContainerRates);
    val = Math.round(val); // Round to the nearest whole number

    rate1.innerHTML = `${flagEmoji1} 1 ${v1} equals`;
    rate2.innerHTML = `${val} ${flagEmoji2} ${v2}`;
}

function updateRateCard() {
    const rateCardRows = document.querySelectorAll(".rate-card .rate-row");

    rateCardRows.forEach(row => {
        const currencyCode = row.querySelector("[data-currency-code]").getAttribute("data-currency-code");
        const rate = rateCardRates[currencyCode];

        // Convert rate to Naira (NGN)
        const rateInNaira = convert(1, currencyCode, "NGN", rateCardRates);
        const roundedRate = Math.round(parseFloat(rateInNaira)); // Round to the nearest whole number

        row.querySelector("[data-currency-code]").textContent = `₦ ${roundedRate}`;
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
        cVal = Math.round(cVal); // Round to the nearest whole number
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
