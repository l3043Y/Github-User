import React, { lazy, Suspense } from 'react';
import './App.css';
// import UserList from './components/UserList';
import {observer} from 'mobx-react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, Theme,createStyles  } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const UserList = lazy(() => {
  
  const sleep = async (milliseconds: number) => {
    await new Promise(resolve => setTimeout(resolve, milliseconds))
    return import('./components/UserList')
  }

  return sleep(20000).then((res) => res)
})
  

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '0px',
      width: '100%',
    },
    link: {
      textDecoration: 'none',
      color: 'red'
    }
  }),
);

const App = observer(()=> {  
  const classes = useStyles();

  const progressbar = 
  <div className={classes.root}>
      <LinearProgress />
  </div>

  return (
      <div className="App">
        <Typography variant="h1" component="h2">
            Github User
        </Typography>
        <Typography variant="subtitle1">
            Fetches 20 Github users from API and store in indexedDB
            (<a className={classes.link} href="https://github.com/l3043Y/Github-User">Repo</a>)<br/>Technology: Reactjs, MobX, MaterialUI, Dexie 
        </Typography>

        <Suspense fallback={progressbar}>
          <UserList  />
        </Suspense>

      </div>
  );
}) 

export default App;
