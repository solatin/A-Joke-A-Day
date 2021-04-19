import mongoose from 'mongoose';

const JokeSchema = new mongoose.Schema(
    {
    order: {type: String, required: true},
    content: { type: String, required: true},
    likes: {type: Number, default: 0, required: true},
    dislikes: {type: Number, default: 0, required: true}
    },
    {
        timestamps: true,
    }
);

const Joke = mongoose.model('Joke', JokeSchema);

export default Joke;