// Character grid component to display Marvel characters
const CharacterGrid = ({ characters }) => {
  return (
    <div className="characters-grid">
      {characters.map(character => (
        <div key={character.id} className="character-card">
          <img 
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="character-image"
          />
          <div className="character-info">
            <h2>{character.name}</h2>
            <p>{character.description || 'No description available'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CharacterGrid
