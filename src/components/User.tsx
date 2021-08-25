import React from 'react'
import {observer} from 'mobx-react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export interface IUser{
    id?: number
    userAvatarUrl: string;
    userName: string;
    numberFollowing: number;
    NumberFollower: number;
}
const User = observer((user: IUser) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const styledUser:React.CSSProperties = {
        alignSelf: 'flex-start'
    }
    return (
    
        <div>
            <button type="button" onClick={handleOpen}>
                <h3>{user.id}</h3>
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    
                    <div style={styledUser} >
                        <img style={{width: "150px"}}
                            src={user.userAvatarUrl} 
                            alt={user.userName}
                        />
                        <h3>{user.userName}</h3>
                        <p>Following: {user.numberFollowing}</p>
                        <p>Follower: {user.NumberFollower}</p>
                    </div>
    
                </div>
                </Fade>
            </Modal>
        </div>
    
    )
}) 

export default User
