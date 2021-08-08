import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
import LoadingEffect from '../../assets/loadingEffect.gif';
import NoSearchPost from '../../assets/noSearchpost.jpg';

const Posts = ({ setCurrentId }) => {

    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts );

    //console.log(posts);

    if(!posts.length && !isLoading) return (<img src={NoSearchPost} alt="MyStore" width='100%' height='80%' />);
    return(
        isLoading ? <img src={LoadingEffect} alt="MyStore" width='100%' height='80%' /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={4}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={12} lg={12}>
                        <Post post={post} setCurrentId={ setCurrentId } />
                    </Grid>
                ))}

            </Grid>
        )
    );
}

export default Posts;