import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRelevent } from '../../actions/posts';
import { ImageSearch } from '@material-ui/icons';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Paginate from '../Pagination';
import Form from '../Form/Form';
import Developer from '../../assets/developer.gif';
import useStyles from '../../styles';
import Footer from '../Footer/footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId ] = useState(null);
    const [ search, setSearch ] = useState('');
    const [ tags, setTags ] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    
    const handleKeyPress = (e) => {
      if(e.keyCode === 13 ) {
        searchPost();
      }
    };

    const handleAdd = (tag) => setTags([ ...tags, tag ]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete ));

    const searchPost = () => {
      if(search.trim() || tags) {
        let searchString = { search, tags: tags.join(',') };
        
        dispatch( getRelevent (searchString));
        history.push(`/posts/search?searchQuery=${search || 'none'} &tags=${tags.join(',')}`);
      } else {
        history.push('/');
      }
    };

    return(
        <Grow in>
        <Container maxWidth='xl'>
          <Grid container justify='space-between' alignItems='stretch' spacing={4} >  {/* className={classes.mainContainer}  */}
          <Grid item xs={12} md={3}>
          <AppBar className={classes.appBarSearch} position='static' color='#3F3A39'>
                <TextField
                  name='search'
                  variant='outlined'
                  label='Search Memories'
                  fullWidth
                  onKeyPress={handleKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value )}
                  />
                <ChipInput 
                  style={{ margin: '10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label='Search Tags'
                  variant='outlined'
                />
                <Button startIcon={<ImageSearch/>} onClick={searchPost} className={classes.searchButton} color='#282d36' variant='contained'>
                  Search
                </Button>
              </AppBar>
              
          </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Posts setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length ) && (
              <Paper className={ classes.pagination } elevation={6 }>
                <Paginate page={ page }/>
              </Paper>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <img src={Developer} alt='developer logo' width='100%'/>
              {/*{(!searchQuery && !tags.length ) && (*/}
              

              {/*)}*/}
            </Grid>
            <Footer/>
          </Grid>
        </Container>
      </Grow>
    );
}

export default Home;