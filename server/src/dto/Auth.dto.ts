// register user
export interface RegisterUserDTO {
  username: string
  email: string
  password: string
}

export interface UserRegisterUserDTO {
  username: string
  email: string
}

export interface AuthRegisterUserDTO {
  userId: string
  password: string
  verificationToken: string
}

// login user
export interface LoginUserDTO {
  email: string
  password: string
}

// forgot password

// reset password
