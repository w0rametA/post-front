export interface IAuthUser {
  id: number
  name: string
  username: string
}

export type ISignTokenPayload = IAuthUser

export interface IAuthRespond {
  token: string
  user: IAuthUser
}

export interface ILoginBody {
  username: string
  password: string
}
