import { createJSONStorage } from "zustand/middleware"
import { AES, enc } from "crypto-js"
import { environment } from "../constants/environment.constant"
const getStorage = () => localStorage

export const getCustomStorage = <T>() =>
  createJSONStorage<T>(() => ({
    getItem: (name: string) => {
      const cipherText = getStorage().getItem(name)
      if (cipherText) {
        const bytes = AES.decrypt(cipherText, environment.SECRET_KEY)

        const data = bytes.toString(enc.Utf8)

        return data
      }
      return null
    },
    setItem: (name: string, value: string) => {
      const cipherText = AES.encrypt(value, environment.SECRET_KEY).toString()

      getStorage().setItem(name, cipherText)
    },
    removeItem: (name: string) => {
      getStorage().removeItem(name)
    },
  }))
