// Background component with Marvel theme
const MarvelBackground = () => {
  // Create grid of MARVEL text
  const createMarvelGrid = () => {
    const grid = []
    for (let i = 0; i < 100; i++) {
      grid.push(<span key={i}>MARVEL</span>)
    }
    return grid
  }

  return (
    <>
      <div className="marvel-text-bg">
        {createMarvelGrid()}
      </div>
      <div className="background-overlay"></div>
      <div className="background-shapes">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="shape" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </>
  )
}

export default MarvelBackground
