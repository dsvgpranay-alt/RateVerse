const BASE_URL="https://v6.exchangerate-api.com/v6/90531255dac232a7f81f4147/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg= document.querySelector(".msg");


let i=0;
for(let select of dropdowns){
    for(currency_code in countryList){
        let option = document.createElement("option");
        option.innerText = currency_code;
        option.value = currency_code;
        if(select.name ==="from" && currency_code==="USD"){
            option.selected="selected";//to set USD as default selected option in "from" dropdown
        }
        else if(select.name==="to" && currency_code==="INR"){
            option.selected="selected";//to set INR as default selected option in "to" dropdown
        }
        select.appendChild(option);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);//to update flag when user changes option in dropdown
    });
}


const updateFlag = (element) =>{
    let currency_code = element.value;
    let countryCode = countryList[currency_code];
    let newSrc = "https://flagsapi.com/" + countryCode + "/flat/64.png";
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault(); //to prevent form submission and page reload
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }

    const url = `https://v6.exchangerate-api.com/v6/90531255dac232a7f81f4147/latest/${fromCurrency.value}`;

    const response = await fetch(url);
    const data = await response.json();

    const rate = data.conversion_rates[toCurrency.value];

    const convertedAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurrency.value} = ${convertedAmount.toFixed(2)} ${toCurrency.value}`;
});