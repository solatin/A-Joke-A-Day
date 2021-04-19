import React from 'react'

export default function Joke( props ) {
    const joke = props.joke;
    return (
        <div>
            <div className="joke">
               {joke? joke.content: ''}
               
            </div>
        </div>
    )
}
