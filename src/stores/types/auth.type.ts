import type { IAuthUser } from "../../interfaces/auth.interface"

export type TAuth = {
  token: string | null
  setToken: (token: string | null) => void
  user: IAuthUser | null
  setUser: (user: IAuthUser | null) => void
  clear: () => void
}
