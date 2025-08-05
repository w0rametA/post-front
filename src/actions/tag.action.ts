import { ITag } from "../interfaces/tag.interface"
import { fetch } from "../utils/fetch.util"

const url = "tag"

export const getTagList = () => {
  const method = "GET"
  const path = `${url}/list`

  return fetch<ITag[]>(method, path)
}
