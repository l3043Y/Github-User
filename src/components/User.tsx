import React from 'react'

export interface IUser{
    id?: number
    userAvatarUrl: string;
    userName: string;
    numberFollowing: number;
    NumberFollower: number;
}
export default function User(user: IUser) {
    return (
        <div>
            <img 
                src={user.userAvatarUrl} 
                alt={user.userName}
            />
            <h3>{user.userName}</h3>
            <p>Number of following: {user.numberFollowing}</p>
            <p>Number of follower: {user.NumberFollower}</p>
        </div>
    )
}
