import React, { useState } from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';
import { Avatar, Button, Paper, Grid, Container, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './Icon';

const initialState = { firstName: '', lastName: '', email: '',password: '', confirmPassword: '' };
const Auth = () => {
    
    const classes = useStyles();
    const [ formData, setformData ] = useState( initialState );
    const [ isSignUp, setIsSignUp ] = useState(false); 
    const [ showPassword, setShowPassword ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isSignUp) {
            dispatch(signUp(formData, history ))
        } else {
            dispatch(signIn(formData, history ))
        }

    }

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value }); 
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH" , data: { result, token }})
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = async ( error ) => {
        console.log(error)
        console.log('Try Again later');
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    
    return(
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevatin={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5' >{ isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name='email' label='Email' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} handleShowPassword={ handleShowPassword } type={ showPassword ? 'text' : 'password'} />
                        
                        { isSignUp && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password'/>}

                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{ isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin 
                        clientId='365168382895-ntns67l6rrtbn078olasgu7ukic6sb1e.apps.googleusercontent.com'
                        render = {(renderProps) => (
                            <Button 
                                className = {classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant='contained'
                            >Google Sign In</Button>
                        )
                        }
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                        />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={ switchMode } >{ isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }</Button>
                        </Grid>
                        
                    </Grid>
                </form>
                 
            </Paper>
        </Container>
    );
    
}

export default Auth;