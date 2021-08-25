import React from 'react'
import {observer} from 'mobx-react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Paper } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    clip: {
        margin: '0.25rem',
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
    const avatar = [<SupervisedUserCircleOutlinedIcon />
        ,<FaceIcon />,<AccountCircleOutlinedIcon /> ]

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

    const classes = useStyles();

    return (
    
        <div>
            <Chip
                icon={avatar[Math.floor(Math.random() * avatar.length)]}
                label={user.id}
                onClick={handleOpen}
                // onDelete={handleDelete}
                variant="outlined"
                className={classes.clip}
            />
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
                    <Paper className={classes.paper}>
                        <div style={styledUser} >
                            <img style={{width: "150px", borderRadius:'4px'}}
                                src={user.userAvatarUrl} 
                                alt={user.userName}
                            />
                            <h3>{user.userName}</h3>
                            <p>Following: {user.numberFollowing}<br/>
                            Follower: {user.NumberFollower}
                            </p>
                        </div>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    
    )
}) 

export default User
