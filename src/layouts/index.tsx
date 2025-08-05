import { Navigate, Outlet } from "react-router-dom"
import { AuthStore } from "../stores/auth.store"

const Layout = () => {
  const { user } = AuthStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <div className="flex flex-1 justify-between flex-col mx-6 my-4">
        <main className="flex lg:flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
