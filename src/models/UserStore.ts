import { makeAutoObservable, runInAction} from "mobx"
import {IUser} from '../components/User'
import GitHubAPI from '../services/GitHubAPI'
import db from './AppDatabase'
import Dexie from "dexie";

class UserStore {
    private static instance?: UserStore 
    dexieUserTable: Dexie.Table<IUser, number>
    userAPI: (numberUser?:number) => Promise<IUser[]>;
    isLoading = false
    private constructor(
        dexieUserTable: Dexie.Table<IUser, number>
        ,userAPI:(numberUser?:number) => Promise<IUser[]> 
        ) {
        makeAutoObservable(this)
        this.userAPI = userAPI
        this.dexieUserTable = dexieUserTable
    }

    static getInstance(){
        if(this.instance){
            return this.instance
        }
        this.instance = new UserStore(db.users,GitHubAPI);
        return this.instance
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

    clearData(){
        runInAction(() => {
            this.dexieUserTable.clear()
        })
    }
    get users(){
        return this.dexieUserTable
    }

    get loadingStatus(){
        return this.isLoading
    }

}

export default UserStore