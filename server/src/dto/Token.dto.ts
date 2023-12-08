export interface CreateTokenDTO {
  token: string
  description?: string
  address: string
  userId: string
}

export interface CreateTokenPairDTO {
  userId: string
  tokenAId: string
  tokenBId: string
  pairAddress: string
}
