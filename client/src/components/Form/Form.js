import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '../../assets/signin.jpg';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [ postData, setPostData ] = useState({ title: '', message: '', tags: '', selectedFile: '', location: ''});
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null );
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!postData.title || !postData.message || !postData.selectedFile ) {
            alert('Fill every field')
        }else if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            
        }
        clear();

    }
    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '', location: ''});
    }

    if(!user?.result?.name) {
        return(
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign in to create a memory
                </Typography>
                <img src={SignIn} alt="Please Sign in to create a memory" width='100%'/>
            </Paper>
        )
    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating' } a Memory</Typography>
                {/*<TextField
                    name='location'
                    variant='outlined'
                    label='Location'
                    fullWidth
                    value={postData.location}
                    onChange={(e) => setPostData({ ...postData, location: e.target.value})}
                />*/}
                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value})}
                    />
                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    multiline 
                    rows={4}
                    value={postData.message } 
                    onChange={(e) => setPostData({ ...postData, message: e.target.value})}
                    />
                <TextField
                    name='tags'
                    variant='outlined'
                    label='Tags'
                    placeholder='tag1,tag2,tag3'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
                    />
                <div className={classes.fileInput}>
                        <FileBase
                            type='file'
                            multiple={false}
                            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
                            />
                    </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;