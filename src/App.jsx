import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react';
import './App.css'

// mélanger un tableau (simpliste)
function shuffle(array) {
  const shuffledArray = [...array]
  return shuffledArray.sort(() => Math.random() - 0.5);
}

function App() {
  const [word, setWord] = useState('CHAT'.split(''))
  const [guessedWord, setGuessedWord] = useState([...word].fill('_', 0))
  const [keyboard, setKeyboard] = useState(shuffle(word))

  // à chaque changement de guessedWord
  useEffect(() => {
    // vérifier si le mot est trouvé
    if (guessedWord.join('') === word.join('')) {
      console.log('Bravo !')
    }
  }, [guessedWord])

  // au clic sur un bouton lettre
  const handleClick = (event) => {
    if (event.target.disabled) {
      return
    }
    // next ui place le contenu dans une span dans le bouton
    // donc on récupere le contenu de la span
    const letter = event.target.querySelector('span').textContent

    // remplacer le prochain _ par la lettre dans guessedWord
    const index = guessedWord.indexOf('_')
    guessedWord[index] = letter
    setGuessedWord([...guessedWord])

    // ajouter la propriété disabled au bouton
    event.target.disabled = true
  }

  return (
    <div className="App">
      <div className="guessed-word">
        { guessedWord.map((letter, index) => (
          <span key={index} className='letter'>{letter}</span>
        )) }
      </div>
      <div className='keyboard'>
        { keyboard.map((letter, index) => (
          <Button key={index} onPress={handleClick} className='key'>{letter}</Button>
        )) }
      </div>
    </div>
  )
}

export default App
