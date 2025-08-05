import { Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import { IPost, IPostQueryPaginate } from "../../interfaces/post.interface"
import { ITag } from "../../interfaces/tag.interface"
import { getPostPaginate } from "../../actions/post.action"
import { getTagList } from "../../actions/tag.action"
import { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>()
  const [tags, setTags] = useState<ITag[]>()
  const [query, setQuery] = useState<IPostQueryPaginate>({
    page: 1,
    limit: 20,
  })
  const [total, setTotal] = useState<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    fetchTagList()
  }, [])

  useEffect(() => {
    fetchPostPaginate()
  }, [query])

  const handleFilterChange = (filter: string[] | undefined) => {
    let filterString: string | undefined
    if (filter?.length && Array.isArray(filter)) {
      filterString = filter.join(",")
    }

    setQuery({ ...query, filter: filterString })
  }

  const fetchPostPaginate = async () => {
    try {
      const { data } = await getPostPaginate(query)
      if (data) {
        setPosts(data.data)
        setTotal(data.total)
      }
    } catch (error) {
      console.error("error fetchPostPaginate ", error)
    }
  }

  const fetchTagList = async () => {
    try {
      const { data } = await getTagList()
      if (data) {
        setTags(data)
      }
    } catch (error) {
      console.error("error fetchTagList ", error)
    }
  }

  const columns: ColumnsType<IPost> = [
    {
      key: "title",
      dataIndex: "title",
      title: "Title",
    },
    {
      key: "postedBy",
      dataIndex: "postedBy",
      title: "PostedBy",
    },
    {
      key: "postedAt",
      render: (_, { postedAt }) => {
        return <div>{dayjs(postedAt).format("DD-MM-YYYY, HH:mm")}</div>
      },
      title: "PostedAt",
    },
    {
      key: "tags",
      render: (_, { tags }) => {
        return <div>{tags.join()}</div>
      },
      title: "Tags",
    },
    {
      key: "action",
      render: (_, { id }) => {
        return (
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/post/${id}`)}
          >
            View Detail
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2  w-1/2 my-3 p-4">
        <div>Filter by Tag</div>
        <Select
          options={tags?.map((tag) => ({ key: tag.name, value: tag.name }))}
          className="w-full"
          mode="multiple"
          onChange={handleFilterChange}
        />
      </div>
      <Table
        columns={columns}
        dataSource={posts}
        pagination={{
          onChange: (page) => {
            setQuery({ ...query, page })
          },
          current: query.page,
          pageSize: query.limit,
          total: total,
          position: ["bottomRight"],
        }}
      />
    </div>
  )
}

export default Home
