export default interface IUserTokenResponse {
  user: {
    id: string
    username: string
    email: string
  }
  access_token?: string
  expiresIn?: number
}
