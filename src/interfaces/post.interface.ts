import { IPaginateQuery } from "./common.inteface"

export interface IPost {
  id: number
  title: string
  content: string
  postedAt: string
  postedBy: string
  tags: string[]
}

export interface IPostQueryPaginate extends IPaginateQuery {
  filter?: string
}
