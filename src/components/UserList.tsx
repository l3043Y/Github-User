import React, { useEffect, useState } from 'react'
import axios from 'axios'
import User from './User';
import { IGitHubUser } from '../utils/IGithubUser';
import {preprocessUser} from '../utils/UserPreprocess';

export default function UserList(): React.ReactElement{
    const [userList, setUserList] = 
        useState<IGitHubUser[]>( [] as IGitHubUser[] );


    useEffect(() => {
        async function fetchData(){
            const apiurl: string = process.env.REACT_APP_CONSUME_API as string
            const axiosRespone = await axios.get<IGitHubUser[]>(apiurl);
            setUserList(axiosRespone.data.slice(0,20))
        }
        fetchData()
    },[])

    useEffect(()=>{
        // console.log("debug: ",userList)
        // console.log("debug len: ",userList.length)
        console.log('IUser: ', preprocessUser(userList))
    },[userList])

    return (
        <div>
            {userList.map((user:IGitHubUser) => (
                <User
                    key = {user.id}
                    userAvatarUrl = {user.avatar_url}
                    userName = {user.login}
                    numberFollowing = {5}
                    NumberFollower = {100}
                />
            ))}
        </div>
    )
}
