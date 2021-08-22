import React from 'react'

export interface IUser{
    id?: number
    userAvatarUrl: string;
    userName: string;
    numberFollowing: number;
    NumberFollower: number;
}
export default function User(user: IUser) {
    const styledUser:React.CSSProperties = {
        // flex: '1 0 auto'
        alignSelf: 'flex-start'
    }
    return (
        <div style={styledUser} >
            <img style={{width: "250px"}}
                src={user.userAvatarUrl} 
                alt={user.userName}
            />
            <h3>{user.userName}</h3>
            <p>Following: {user.numberFollowing}</p>
            <p>Follower: {user.NumberFollower}</p>
        </div>
    )
}
