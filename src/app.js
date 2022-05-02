const btcTopPrice = document.querySelector('#btc-top-price');
const ethTopPrice = document.querySelector('#eth-top-price')
const btcTopPerc = document.querySelector('#btc-top-perc')
const ethTopPerc = document.querySelector('#eth-top-perc')
const cryptoListItem = document.querySelector('#crypto-list-item')
const cryptoListCont = document.querySelector('#crypto-list-cont')

const coinsBut = document.querySelector('#coins-but')
const listHead = document.querySelector('#list-heading')
const search = document.querySelector('#crypto-search')


// API
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

//scroll to coins event

coinsBut.addEventListener('click', () => {
  cryptoListCont.scrollIntoView({behavior: 'smooth', block: 'center'})
})

//main fetch API function

fetch(apiUrl).then(res => {return res.json()}).then(data => {

  // ---- Display BTC and ETH price/percentage change ----
  let btc = data[0]
  let eth = data[1]

  let percentChangeBtc = btc.price_change_percentage_24h;
  let percentChangeEth = eth.price_change_percentage_24h;
    
  //Inserting price
  btcTopPrice.innerText = btc.current_price;
  ethTopPrice.innerText = eth.current_price;

  //Inserting percentage change
  btcTopPerc.innerText = percentChangeBtc.toFixed(2) + '%'
  ethTopPerc.innerText = percentChangeEth.toFixed(2) + '%'

  //Changes color if percent change is negative
  if(percentChangeBtc < 0) {

      btcTopPerc.classList.remove('bg-fadedGreen', 'text-brightGreen', 'border-brightGreen')
      btcTopPerc.classList.add('bg-fadedRed', 'text-brightRed', 'border-brightRed');
  }

  if(percentChangeEth < 0) {

      ethTopPerc.classList.remove('bg-fadedGreen', 'text-brightGreen', 'border-brightGreen')
      ethTopPerc.classList.add('bg-fadedRed', 'text-brightRed', 'border-brightRed');
  } 

    
  //Getting coins full list

  showCoins(data);  
})


//looping through all coins and displaying them

function showCoins(data) {
  cryptoListItem.remove()

  data.forEach(coin => {
    const coinElement = document.createElement('div');
    coinElement.className = 'flex justify-between font-semibold items-center py-5 px-7 border-b-[1px] border-slate-200'

    const chartApi = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=365`
    
    
    if(coin.price_change_percentage_24h < 0) {
      coinElement.innerHTML = `
      <!-- coin symbol and name  -->
      <div class="flex items-center w-full">
        <!-- symbol  -->
        <img
          src="${coin.image}"
          alt="bitcoin symbol"
          class="w-7"
        />
        <!-- name -->
        <p class="ml-2">${coin.name}</p>
      </div>
      <!-- price  -->
      <p class="w-full">$<span class="ml-1">${coin.current_price}</span></p>
      <!-- perc change  -->
      <div class="flex w-[30%]"> 
          <div
            class="flex bg-fadedRed text-brightRed border-2 border-brightRed text-base rounded-full px-2"
            id="perc-24"
          >
          ${coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      <!-- market cap  -->
      <p class="md:flex md:justify-end hidden w-full">
        $<span class="ml-1">${coin.market_cap}</span>
      </p>
    </div>
    `
    } else {
      coinElement.innerHTML = `
      <!-- coin symbol and name  -->
      <div class="flex items-center w-full">
        <!-- symbol  -->
        <img
          src="${coin.image}"
          alt="bitcoin symbol"
          class="w-7"
        />
        <!-- name -->
        <p class="ml-2">${coin.name}</p>
      </div>
      <!-- price  -->
      <p class="w-full">$<span class="ml-1">${coin.current_price}</span></p>
      <!-- perc change  -->
      <div class="flex w-[30%]"> 
          <div
            class="flex bg-fadedGreen text-brightGreen border-2 border-brightGreen text-base rounded-full px-2"
            id="perc-24"
          >
          ${coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      <!-- market cap  -->
      <p class="md:flex md:justify-end hidden w-full">
        $<span class="ml-1">${coin.market_cap}</span>
      </p>
    </div>
    `
    }

    cryptoListCont.appendChild(coinElement)
  })
}

//search function
// search.addEventListener('keyup', () => {
//   let keyInput = search.value
// }
