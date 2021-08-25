import React, { useContext , useEffect } from 'react'
import User, { IUser } from './User';

import {observer} from 'mobx-react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import UserContext from '../contexts/UserContext';
import { useLiveQuery } from 'dexie-react-hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const UserList = observer(() => {
    const store = useContext(UserContext)
    let userList = useLiveQuery(() => store.users.toArray()) 
    
    if(userList === undefined){
        userList = [] as IUser[]
    }

    useEffect(() => {
        console.log('userPro',userList)
    }, [userList])

    const classes = useStyles();

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
                    id = {user.id}
                    userAvatarUrl = {user.userAvatarUrl}
                    userName = {user.userName} 
                    numberFollowing = {user.numberFollowing}
                    NumberFollower = {user.NumberFollower}
                />
            ))}

            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {store.clearData()}}
            >
                    Clear Table
            </Button>

            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudDownloadIcon />}
                onClick={() => {store.loadUserFromAPI()}}
            >
                Fetch API
            </Button>

        </div>
    )
})

export default UserList