export default interface IUserTokenResponse {
  user: {
    id: number
    username: string
    email: string
  }
  token?: string
  expiresIn?: number
}
