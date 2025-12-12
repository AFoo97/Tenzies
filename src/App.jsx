import {useState, useRef, useEffect} from "react"
import "./index.css"
import Die from "./Die.jsx"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function App() {
    
    const { width, height } = useWindowSize()

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    const [dice, setDice] = useState(() => generateAllNewDice())
    const newGameButtonRef = useRef(null)

    const gameWon = 
        dice.every(die => die.isHeld) && 
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            newGameButtonRef.current.focus()
        }
    }, [gameWon])

    function rollDice() {
        if (gameWon) {
            setDice(generateAllNewDice())
            return
        } else {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6) }
            }))
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main>
            {gameWon && <Confetti width={width} height={height} />}

            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>

            <h1 className="title">Tenzies</h1>

            <p className="instructions"> Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>

            <div className="dice-container">
                {diceElements}
            </div>

            <button 
            ref={newGameButtonRef} 
            className="roll-dice" 
            onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
            
        </main>
    )
}