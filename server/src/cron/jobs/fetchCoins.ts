import axios from 'axios'
import RealToken from '../../models/real_token.models' // Adjust the import path based on your actual models location
import { io } from '../../socket'

interface TokenData {
  usd: number
}

interface ApiResponse {
  [key: string]: TokenData
}

const fetchCoins = async () => {
  try {
    const response = await axios.get<ApiResponse>(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,aave,chainlink,dai,dogecoin,ethereum,matic-network,solana,tether,maker&vs_currencies=usd&precision=2&include_last_updated_at=true',
    )

    const data = response.data

    const updates = []

    for (const [tokenName, { usd: currentPrice }] of Object.entries(data)) {
      // Find the RealToken by tokenName
      const realToken = await RealToken.findOne({ where: { name: tokenName } })

      if (realToken) {
        // Update the 'price' array with the new 'currentPrice'
        // const updatedPrices = [...realToken.price, currentPrice]

        // Update the RealToken record
        // await realToken.update({ price: updatedPrices })

        // Prepare data for emitting
        updates.push({
          name: tokenName,
          tokenName: realToken.tokenName,
          symbol: realToken.symbol, // Adjust according to your model structure
          icon: realToken.icon, // Adjust according to your model structure
          price: realToken.price,
          currentPrice,
        })
      }
    }

    console.log(updates)
    // Emit the updates
    io.emit('updateAnalytics', updates)
  } catch (error: any) {
    console.error('Error fetching and updating prices:', error.message)
  }
}

export { fetchCoins }
