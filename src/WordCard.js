import React, { useState } from "react";
import  _ from 'lodash';

import CharacterCard from "./CharacterCard";

const prepareStateFromWorld = given_word =>{
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return{
        word,
        chars,
        attempt:1,
        guess: '',
        completed : false
    }
}
export default function WordCard(props){

    const [state, setState] = useState(prepareStateFromWorld(props.value))

    const activationHandler = c => {
        console.log(`${c} has been activates`)

        let guess = state.guess + c
        setState({...state, guess})

        if(guess.length == state.word.length){
            if(guess == state.word){
                console.log('yeah')
                setState({...state, completed: true})
                window.location.reload();
            }else{
                console.log('reset, next attemp')
                console.log('fail = '+ state.attempt + ' please try again')
                setState({...state, guess: '', attempt: state.attempt +1})
            }
        }
    }

    return (
        <div>
            {
                state.chars.map((c, i) => 
                    <CharacterCard value={c} key={i} activationHandler={activationHandler}attempt={state.attempt}/>)
            }
        </div>

    )
}
