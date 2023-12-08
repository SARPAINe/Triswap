export interface CreateTokenDTO {
  token: string
  description?: string
  address: string
  userId: string
}

export interface CreateTokenPairDTO {
  userId: string
  tokenA: string
  tokenB: string
  pairAddress: string
}

export interface CreateTokenPairWIdDTO {
  userId: string
  tokenAId: string
  tokenBId: string
  pairAddress: string
}
