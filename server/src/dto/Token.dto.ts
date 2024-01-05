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
  tokenAId: string
  tokenBId: string
}
