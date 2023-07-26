import { useEffect, useState } from 'react'
import { Button, Card } from '@nextui-org/react'
import './App.css'

// data 
const words = [
  'renard',
  'loup',
  'blaireau',
  'biche',
  'ours',
]

// mélanger un tableau (simpliste)
function shuffle(array) {
  const shuffledArray = [...array]
  return shuffledArray.sort(() => Math.random() - 0.5)
}

function App() {
  const [word, setWord] = useState([])
  const [guessedWord, setGuessedWord] = useState([])
  const [keyboard, setKeyboard] = useState([])

  // au chargement
  useEffect(() => {
    // random word depuis la data, passé en capitale
    const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase()

    // définir les states
    setWord([...randomWord])
    setGuessedWord([...randomWord].fill('_'))

    // Chaque key du keyboard est un objet avec 2 propriétés
    // Key { used: false, letter: 'A' }
    setKeyboard(shuffle([...randomWord]).map((letter) => {
      return {
        used: false,
        letter: letter
      }
    }))
  }, [])

  // condition de victoire
  useEffect(() => {
    // vérifier si guessWord est complet
    if (!guessedWord.includes('_') && guessedWord.length > 0) {
      if (word.join('') === guessedWord.join('')) {
        console.log('Gagné !')
      } else {
        console.log('Perdu !')
      }
    }
    
  }, [guessedWord])

  const handleClick = (index) => {
    // inserer la lettre dans le guessedWord à la place du prochain _
    const newGuessedWord = [...guessedWord]
    newGuessedWord[newGuessedWord.indexOf('_')] = keyboard[index].letter
    setGuessedWord(newGuessedWord)

    // définir used à true sur la key concernée
    const newKeyboard = [...keyboard]
    newKeyboard[index].used = true
    setKeyboard(newKeyboard)
  }

  const onPressHandler = index => () => handleClick(index)

  return (
    <div className="App">
      <div className="guessed-word">
        { guessedWord.map((letter, index) => (
          <Card
          key={index}
          className='letter'>
            {letter}
          </Card>
        )) }
      </div>
      <div className='keyboard'>
        { keyboard.map((key, index) => (
          <Button
            key={index}
            onPress={onPressHandler(index)}
            className='key'
            disabled={key.used}
          >
            {key.letter}
          </Button>
        )) }
      </div>
    </div>
  )
}

export default App
