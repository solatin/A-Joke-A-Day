import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import Joke from './models/JokeModel.js';

const app = express();
mongoose.connect( process.env.MONGDB_URL || 'mongodb://localhost/SolMakeYouLaugh', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.get('/api/jokes/:order', async (req, res) =>{
    const joke = await Joke.findOne({order: req.params.order})
    if(joke){
        res.send(joke);
    }else{
        res.status(404).send({message: 'Joke not found'});
    }
});
 
app.get('/api/jokes', async (req, res) =>{
    await Joke.remove({});
    const createdJokes = await Joke.insertMany(data.jokes);
    res.send({createdJokes});
} );


app.put('/api/likes/:order', async (req, res) => {
    const joke = await Joke.findOne({order: req.params.order});
    const nextOrder = parseInt(req.params.order) + 1 < 5 ? parseInt(req.params.order) + 1 : 5;
    if (joke){
        joke.likes = joke.likes + 1;
        const updatedJoke = await joke.save();
        res.send(nextOrder.toString());
    }
    else{
        res.status(500).send({ message: ' Error in Updating Like.' });
    }
});

app.put('/api/dislikes/:order', async (req, res) => {
    const joke = await Joke.findOne({order: req.params.order});
    const nextOrder = parseInt(req.params.order) + 1 < 5 ? parseInt(req.params.order) + 1 : 5;
    if (joke){
        joke.dislikes = joke.dislikes + 1;
        const updatedJoke = await joke.save();
        res.send(nextOrder.toString());
    }
    else{
        res.status(500).send({ message: ' Error in Updating Like.' });
    }
});


app.get('/', (req, res) =>{
    res.send('Server is ready');
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})
