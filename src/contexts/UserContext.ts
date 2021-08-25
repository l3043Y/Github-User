import { createContext } from "react"
// import userStore from "../models/UserStore"
import UserStore from "../models/UserStore"

const UserContext = createContext<UserStore>(UserStore.getInstance())
export default UserContext