import React, { useEffect, useState } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Joke from './components/Joke'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LIKE = "LIKE";
const DISLIKE = "DISLIKE";

function App() {
    const [jokeOrder, setJokeOrder] = useState(cookies.get('order')? cookies.get('order'): 1);
    const [joke, setJoke] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`/api/jokes/${jokeOrder}`);
            setJoke(data);
        };
        fetchData();
    }, [jokeOrder]);

    const updateVote = async (jokeOrder, voteType) => {
        switch(voteType){
            case LIKE:{
                const {data} = await axios.put("/api/likes/" + jokeOrder);
                cookies.set('order', data, {expires: new Date(Date.now()+2592000)});
                setJokeOrder(data);
                break;
            }
            case DISLIKE:{
                const {data} = await axios.put("/api/dislikes/" + jokeOrder);
                cookies.set('order', data, {expires: new Date(Date.now()+2592000)});
                setJokeOrder(data);
                break;
            }
            default: 
                return;
        }
    }
  return (
    <BrowserRouter>
    <div id="container">
        <div id="header">
            <img src={process.env.PUBLIC_URL + '/images/logo1.png'} alt="serious logo"/>
            <img src={process.env.PUBLIC_URL + '/images/logo2.png'} alt="HL solution logo"/>
        </div>
        <div id="title" >
            <div>
                <div className="big-title">A joke a day keeps the doctor away</div>
                <div className="small-title">If you joke wrong way, your teeth have to pay. (Serious)</div>
            </div>
        </div>
        </div>
        <div id="content">
            <Joke joke={joke}/>
              
            <div className="my-hr"></div>
            <div className="d-flex">
                <span className="button1" onClick={() =>updateVote(jokeOrder, LIKE)} >This is Funny!</span>
                <span className="button2" onClick={() =>updateVote(jokeOrder, DISLIKE)}>This is not funny.</span>
            </div>
        </div>
        <div id="footer">
            <div id="footer-1">This website is created as part of HLSolutions on developer program. The material contained on this website are prived for general
            information only and do not constitue any form of advice. HLSolutions assumes no responsibility for the accuracy of any particular statement and
            accepts no liabiliy for any loss or damage which may arise from reiance on the informaion contained on this site.</div>
            <div id="footer-2">Copyright 2021 HLSolutions Pte. Ltd</div>
        </div>
        </BrowserRouter>
  );
}

export default App;
