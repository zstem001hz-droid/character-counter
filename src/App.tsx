import { CharacterCounter } from './components/CharacterCounter/CharacterCounter'

// App - root component
// Renders CharacterCounter with optional word count constraints
function App() {
  return (
    <div>
      <CharacterCounter
      minWords={25}
      maxWords={100}
      />
    </div>
  )
}

export default App