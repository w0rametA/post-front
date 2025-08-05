import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IPost } from "../../interfaces/post.interface"
import { getPost } from "../../actions/post.action"
import htmlParser from "html-react-parser"
import dayjs from "dayjs"
import { Button, Divider, Tag } from "antd"

const PostDetail = () => {
  const { postId } = useParams<"postId">()
  const [post, setPost] = useState<IPost>()

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPost = async () => {
    if (!postId) return
    try {
      const { data } = await getPost(+postId)
      if (data) {
        setPost(data)
      }
    } catch (error) {
      console.error("error fetchPost ", error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <div className="text-2xl font-bold">{post?.title ?? "-"}</div>
          <div className="flex gap-0.5 my-1">
            {post?.tags.map((tag, idx) => {
              return <Tag key={`tag-${idx}`}>{tag}</Tag>
            })}
          </div>
        </div>
        <div>
          <div>By {post?.postedBy ?? "-"}</div>
          <div>
            Posted At : {dayjs(post?.postedAt).format("DD-MM-YYYY, HH:mm")}
          </div>
        </div>
      </div>
      <Divider />
      <div>
        {post?.content ? htmlParser(post?.content) : "Content not found"}
      </div>
    </div>
  )
}

export default PostDetail
