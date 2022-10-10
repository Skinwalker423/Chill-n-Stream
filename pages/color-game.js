import React, { useEffect, useState } from 'react'
import styles from '../components/banner/Banner.module.css';


const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']



const colorGame = () => {

    const [boardColor, setBoardColor] = useState('');
    const [buttonsArray, setButtonsArray] = useState([]);
    const [correctColor, setCorrectColor] = useState(false);
    const [wrongColor, setWrongColor] = useState(false);

    const rngNum = (num) => {
        return Math.floor(Math.random() * num)
    };

    const randomHexDigit = () => {
        const rngValue = rngNum(16);
        const randomHexValue = hexValues[rngValue];
        return randomHexValue.toString();
    } 

    const randomHexColor = () => {

        let hexColor = '#';

        for (let index = 0; index < 6; index++) {

            hexColor += randomHexDigit();
            
        }
        setBoardColor(hexColor);
        return hexColor;
    }

    const createColorsArray = () => {
        let colorArray = []
        for (let index = 0; index < 3; index++) {
            const color = randomHexColor();
            colorArray.push(color);
        }
        return colorArray;
    }

    const setBoard = () => {
        const arr = createColorsArray();
        const rng = rngNum(3);
        setButtonsArray(arr);
        setBoardColor(arr[rng]);
        setCorrectColor(false);
        setWrongColor(false);
    }

    

    useEffect(() => {
        setBoard();
    }, [])



  return (
    <div>
        <div style={{backgroundColor: boardColor}} className={styles.board}>Background color board</div>
        {buttonsArray.map((button, idx) => {
            
            const handleAnswerButtons = () => {
                if(button === boardColor){
                    console.log('winner')
                    setCorrectColor(true);
                    setWrongColor(false);
                } else {
                    setWrongColor(true);
                    setCorrectColor(false);
        
                    console.log('loser')
                }
            }

            return (
                <button key={idx} className={styles.colorButton} type='button' onClick={handleAnswerButtons}>{buttonsArray[idx]}</button>
            )
        })}
        {correctColor && <h2>Correct!</h2>}
        {wrongColor && <h2>Wrong!</h2> }

        <button className={styles.colorButton} onClick={() => {
            setBoard()
        }}>New Game</button>
    </div>
  )
}

export default colorGame;