import { makeAutoObservable, runInAction} from "mobx"
import {IUser} from '../components/User'
import GitHubAPI from '../services/GitHubAPI'
import db from './AppDatabase'
import Dexie from "dexie";

class UserStore {
    dexieUserTable: Dexie.Table<IUser, number>
    userAPI: (numberUser?:number) => Promise<IUser[]>;
    isLoading = true
    constructor(
        dexieUserTable: Dexie.Table<IUser, number>
        ,userAPI:(numberUser?:number) => Promise<IUser[]> 
        ) {
        makeAutoObservable(this)
        this.userAPI = userAPI
        this.dexieUserTable = dexieUserTable
        this.loadUserFromAPI()
    }

    loadUserFromAPI() {
        this.isLoading = true
        this.userAPI().then((users) => {
            runInAction(() => {
                this.dexieUserTable.bulkPut(users)
                .then((lastkey) => console.log(`Last index: ${lastkey}`))
                this.isLoading = false
            })
        })
    }

    get users(){
        return this.dexieUserTable.toArray()
    }

}

const userStore = new UserStore(db.users,GitHubAPI)
export default userStore