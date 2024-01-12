import axios from 'axios'
import { io } from '../../socket'
const fetchCoins = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,aave,chainlink,dai,dogecoin,ethereum,matic-network,solana,tether,maker&vs_currencies=usd&precision=2&include_last_updated_at=true',
    )
    const data = response.data
    console.log(typeof data)
    console.log(data)
    io.emit('updateAnalytics', data)
    // io.emit()
  } catch (error) {
    console.log(error)
  }
}

export { fetchCoins }
