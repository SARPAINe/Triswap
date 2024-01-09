// change token to name
export interface CreateTokenDTO {
  name: string
  description?: string
  address: string
  userId: string
  systemGenerated?: boolean
}

export interface CreateTokenPairDTO {
  userId: string
  pairAddress: string
  tokenAId: string
  tokenBId: string
}
