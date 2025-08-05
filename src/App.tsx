import { type FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts"
import Login from "./views/Login"
import Home from "./views/Home"
import PostDetail from "./views/PostDetail"

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="*" element={<div>not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
