import express  from 'express';
import mongoose from 'mongoose';
import videogamesRouter from './routes/videogames.router.js';

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

const connection = mongoose.connect("mongodb+srv://coder:ander1234@cluster0.9vhlkqi.mongodb.net/coderGaming?retryWrites=true&w=majority");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/videogames',videogamesRouter);
