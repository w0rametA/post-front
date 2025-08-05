import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type TAuth } from "./types/auth.type"
import type { IAuthUser } from "../interfaces/auth.interface"
import { getCustomStorage } from "../utils/storage.util"

export const AuthStore = create<TAuth>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null) => {
        set({ token })
      },
      user: null,
      setUser: (user: IAuthUser | null) => {
        set({ user })
      },
      clear: () => {
        set({
          token: null,
          user: null,
        })
      },
    }),
    {
      name: "auth-storage",
      storage: getCustomStorage(),
    }
  )
)
