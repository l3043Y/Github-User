import Dexie from "dexie";
import { IUser } from "../components/User";

class AppDatabase extends Dexie {
    users: Dexie.Table<IUser, number>;

    constructor(){
        super("AppDatabase")
        this.version(1).stores({
            users: '++id, id, userAvatarUrl, userName, numberFollowing, NumberFollower'
        })

        this.users = this.table("users")
    }
}

const db = new AppDatabase();

export default db;