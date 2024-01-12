interface CryptoData {
  usd: number
  last_updated_at: number
}

// Define the interface for the entire object
interface CryptoPrices {
  aave: CryptoData
  bitcoin: CryptoData
  chainlink: CryptoData
  dai: CryptoData
  dogecoin: CryptoData
  ethereum: CryptoData
  maker: CryptoData
  'matic-network': CryptoData
  solana: CryptoData
  tether: CryptoData
}

export interface ServerToClientEvents {
  message: (message: string) => void
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  updateAnalytics: (data: CryptoPrices) => void
}

export interface ClientToServerEvents {
  message: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
