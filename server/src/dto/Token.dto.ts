// change token to name
export interface CreateTokenDTO {
  name: string
  description?: string
  address: string
  userId: string
}

export interface CreateTokenPairDTO {
  userId: string
  pairAddress: string
  tokenA: {
    name: string
    address: string
  }
  tokenB: {
    name: string
    address: string
  }
}

export interface CreateTokenPairWIdDTO {
  userId: string
  tokenAId: string
  tokenBId: string
  pairAddress: string
}
