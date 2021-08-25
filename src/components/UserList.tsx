import React, { useContext , useEffect } from 'react'
import User, { IUser } from './User';

import {observer} from 'mobx-react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import UserContext from '../contexts/UserContext';
import { useLiveQuery } from 'dexie-react-hooks';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
      },
      paper: {
        height: 75,
        width: 75,
      },
      control: {
        padding: theme.spacing(5),
      },
    button: {
      margin: theme.spacing(1),
    },
    clip: {
        margin: '1rem',
        padding: '1rem',
    },
    clipContainer: {
        minHeight: '100%',
        maxWidth: '50%',
        margin: '5rem auto'
    }
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

    const handleClear = ()=>{
        store.clearData()
    }
    const handleFetch = ()=>{
        store.loadUserFromAPI()
    }  
    const classes = useStyles();
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.clipContainer}
        >
            <Typography variant="h1" component="h2">
                Github User 
            </Typography>
            <Typography variant="subtitle1">
                Fetches 20 Github users from API. Technology: Reactjs, MobX, Dexie 
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
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
            </Grid>
            <Container>

                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={handleClear}
                >
                    Clear Table
                </Button>

                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudDownloadIcon />}
                    onClick={handleFetch}
                >
                    Fetch API
                </Button>
            </Container>
        </Grid>
    )
})

export default UserList