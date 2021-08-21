import React, { useEffect, useState } from 'react'
import User, { IUser } from './User';
import fetchUsers from '../utils/GitHubAPI';

export default function UserList(): React.ReactElement{
    const [userList, setUserList] = 
        useState<IUser[]>( [] as IUser[] );

    useEffect(() => {
       fetchUsers().then((users:IUser[]) =>{
           setUserList(users)
       })
    },[])

    return (
        <div>
            {userList.map((user:IUser) => (
                <User
                    key = {user.id}
                    userAvatarUrl = {user.userAvatarUrl}
                    userName = {user.userName}
                    numberFollowing = {user.numberFollowing}
                    NumberFollower = {user.NumberFollower}
                />
            ))}
        </div>
    )
}
