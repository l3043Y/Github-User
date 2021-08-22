import React, { useEffect, useState } from 'react'
import User, { IUser } from './User';
import store from '../models/UserStore';
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

const UserList = observer(() => {
    const [userList, setUserList] = 
        useState<IUser[]>( [] as IUser[] );

    useEffect(() => {
        store.users.then((user) => {
          console.log('>>Users: ',user)
          setUserList(user)
        })
        console.log('userStore',toJS(store.users))
        console.log('isLoading',store.isLoading)
        console.log('isObservable',store)
    }, [])
  
    const styledList:React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
    return (
        <div style={styledList}>
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
})

export default UserList