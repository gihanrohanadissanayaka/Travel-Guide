import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express(); //exprees app created
dotenv.config();    //dotencv config for import environment variable

app.use(express.json({ limit: '30mb', extended: true }))        //file max size set to 30mb
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);      //create route for posts
app.use('/user', userRoutes);      //create route for users
app.get('/', (req, res) => {
    res.send('Hello there,welcome to API.')
});

const CONNECTION_URL = process.env.CONNECTION_URL;      //connection string
const PORT = process.env.PORT || 5000 ;                         //port 

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen( PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false );