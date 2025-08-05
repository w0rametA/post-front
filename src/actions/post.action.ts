import { IPaginateResponse } from "../interfaces/common.inteface"
import { IPost, IPostQueryPaginate } from "../interfaces/post.interface"
import { fetch } from "../utils/fetch.util"

const url = "post"

export const getPostPaginate = (query: IPostQueryPaginate) => {
  const method = "GET"
  const path = `${url}/paginate`

  return fetch<IPaginateResponse<IPost>>(method, path, query)
}

export const getPost = (id: number) => {
  const method = "GET"
  const path = `${url}/${id}`

  return fetch<IPost>(method, path)
}
