import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LockOpen, MeetingRoomOutlined } from '@material-ui/icons'; 
import { AppBar, Avatar, Button, Toolbar, IconButton } from '@material-ui/core';
import TravelLogo from '../../assets/dribbble14.gif';

import useStyles from './styles';
import decode from 'jwt-decode';
const NavBar = () => {

    const classes = useStyles();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

        useEffect(() => {
            const token = user?.token;

            if(token) {
                const decodeToken = decode(token);
                if(decodeToken.exp * 1000 < new Date().getTime()) logout();
            }
            setUser(JSON.parse(localStorage.getItem('profile')));
        }, [location] );
    return (

        <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to='/' className={classes.brandContainer}>
        <img className={ classes.image } src={TravelLogo} alt='TravelSriLanka...' height='80' />
        </Link>
        
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} title={user?.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    {/*<Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>*/}
                    
                    <IconButton aria-label='Show notifications' color='inherit' onClick={logout}>
                            
                                <MeetingRoomOutlined/>
                            

                        </IconButton>
                    
                    
                </div> 
            ) : (
                <Button component={ Link } to='/auth'><LockOpen/></Button>
            )}
        </Toolbar>
        </AppBar>
    );
}

export default NavBar;