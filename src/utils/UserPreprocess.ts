import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { IUser } from "../components/User";
import {IGitHubUser} from "../utils/IGithubUser"
export async function preprocessUser(res: IGitHubUser[]) {

    async function countUsers(userURL: string) {
        // let count: number 
        
        async function fetchData(){
            const apiurl: string = process.env.REACT_APP_CONSUME_API as string
            const axiosRespone = await axios.get<IGitHubUser[]>(apiurl);
            
            return axiosRespone.data.length
        }

        let count = fetchData().then((len) => {
            return len
        });
        
        return count;
    }
    
    const users = res.map( async (uu:IGitHubUser) => {
        const user: IUser = {
            id: uu.id,
            userAvatarUrl: uu.avatar_url,
            userName: uu.login,
            numberFollowing: await countUsers(uu.following_url),
            NumberFollower: await countUsers(uu.followers_url)
        }
        return user;
    });

    return users;
}

