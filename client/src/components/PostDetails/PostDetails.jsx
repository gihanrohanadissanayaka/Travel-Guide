import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Chip } from '@material-ui/core';
import { LoyaltyOutlined, ThumbUpAlt, AccountCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getPost, getRelevent } from '../../actions/posts';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from './styles';

const PostDetails = () => {

    const classes = useStyles();
    const history = useHistory();
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [ dispatch, id] );

     useEffect(() => {
         if(post) {
         dispatch(getRelevent({ search: 'none', tags: post?.tags.join(',')}));
        }
     },[ dispatch, post])

    if (!post) return null;

    if (isLoading) {
        return (
          <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }

      const openPost = (_id) => history.push(`/posts/${_id}`);

      const recomendedPosts = posts.filter(({_id}) =>  _id !== post._id );
      //console.log(recomendedPosts);

    return(

        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6} >
        <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
              {post.tags.map((tag) => (
              <Chip icon={<LoyaltyOutlined />} label={tag}/>
              ))}
              </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} width='100%'/>
        </div>
      </div>
      { recomendedPosts.length ? (
          <div className={classes.section}>
              <Typography gutterBottom variant='h5'>You might also like:</Typography>
              <Divider/>
              <div className={classes.recommendedPosts}>
              {recomendedPosts.map(({ title, name, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2"><AccountCircle/>{name} </Typography>
                {/*<Typography gutterBottom variant="subtitle2">{message.slice(0,30)}</Typography>*/}
                
                <img src={selectedFile} width="200px" height="100px" alt={title} />
                <Typography gutterBottom variant="subtitle1"><ThumbUpAlt size="0.5em"/> {likes.length}</Typography>
              </div>
            ))}
              </div>
          </div>
                  ) : ( <div></div>)}
      </Paper>
    );
};

export default PostDetails;