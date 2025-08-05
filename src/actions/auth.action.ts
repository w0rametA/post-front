import { IAuthRespond } from "../interfaces/auth.interface"
import { fetch } from "../utils/fetch.util"

const url = "auth"

export const login = (body: { username: string; password: string }) => {
  const method = "POST"
  const path = `${url}/login`

  return fetch<IAuthRespond>(method, path, body)
}
