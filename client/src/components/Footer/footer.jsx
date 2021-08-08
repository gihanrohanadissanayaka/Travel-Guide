import React from "react";
import { Container, Grid, List, ListItem, Divider, Card } from '@material-ui/core';
import { Facebook, GitHub, LinkedIn, Mail } from '@material-ui/icons';


const Footer = () => {
  return (
    <>
    <div style={{ marginTop: '20px'}}>
        <Card elevation={6} >
        <Container maxWidth>
        <div style={{ backgroundColor: 'AliceBlue'}}>
        <Grid container justify="center" spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Grid container justify="center">
            <List>
            <ListItem><p style={{ fontSize: '20px'}}>About</p></ListItem>
            <Divider/>
            <ListItem><p style={{}}>The travel guide is a website that allows you to share your travel memories with your friends. As a begin you can create a account and put your first memory now.Why not..</p></ListItem>
                
            </List>
        </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Grid container justify="center">
        <List>
                <ListItem><p style={{ fontSize: '20px'}}>Products</p></ListItem>
                <Divider/>
                <ListItem>ecommerceApp</ListItem>
                <ListItem>chatApp</ListItem>
                <ListItem>Travel guide</ListItem>
            </List>
        </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Grid container justify="center">
        <List>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem><a href="https://web.facebook.com/profile.php?id=100004284887135" rel="noreferrer" target="_blank">< Facebook/> </a> </ListItem>
                <ListItem><a href="https://github.com/gihanrohanadissanayaka" rel="noreferrer" target="_blank"><GitHub/></a></ListItem>
                <ListItem><a href="https://www.linkedin.com/in/gihan-dissanayaka-9947b3216/" rel="noreferrer" target="_blank"><LinkedIn/></a></ListItem>
                <ListItem><a href="mailto:dissanayaka.gihanrohana@gmail.com"><Mail/></a></ListItem>
            </List>
            </Grid>
        </Grid>
        <Grid container justify="center">
        dissanayaka.gihanrohana@gmail.com - GIHAN_DISSANAYAKA_2021
        <Divider/>
        </Grid>
        </Grid>
        <br/>
        </div>
        </Container>
        </Card>
    </div>
    </>
  );
};
export default Footer;