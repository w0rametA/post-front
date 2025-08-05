import React from "react"
import { login } from "../../actions/auth.action"
import { AuthStore } from "../../stores/auth.store"
import { Button, Form, Input } from "antd"
import { ILoginBody } from "../../interfaces/auth.interface"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { setUser, setToken } = AuthStore()
  const [loginForm] = Form.useForm<ILoginBody>()
  const navigate = useNavigate()

  const handleLogin = async (value: ILoginBody) => {
    try {
      const { data } = await login(value)
      if (data) {
        setToken(data.token)
        setUser(data.user)
        navigate("/")
      }
    } catch (error) {
      console.error("handleLogin ", error)
    }
  }
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <div className="m-auto border p-6 rounded-lg">
        <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
          <Form.Item name="username" label="username" required>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="password" required>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
