import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { Create } from '@material-ui/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))
    
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openPost = () => {
            history.push(`/posts/${post._id }`);
      };
    
    return(
        <Card className={classes.card} elevation={6}>
            
                
           <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={ openPost } />
            
            <div className={classes.overlay}>
                
                <Typography variant='body1'><Create size="1em"/>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createAt).fromNow()}</Typography>

            </div>
            <div className={classes.overlay2}>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && (
                <Button style={{ color: 'white' }} size='small'  onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
            )}
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <ButtonBase component='span' className={ classes.cardAction } onClick={ openPost }>
            <CardContent>
                <Typography className={classes.title} variant='h6' gutterBottom>{post.title}</Typography>
                <Typography className={classes.title} variant='body2' >{post.message.slice(0,75)}...</Typography>
            </CardContent>
            </ButtonBase>
            

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && (

                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;
