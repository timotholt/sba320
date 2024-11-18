// Background component with Marvel theme
const MarvelBackground = () => {
  // Create repeating MARVEL text
  const marvelText = Array(50).fill('MARVEL').join(' ')

  return (
    <>
      <div className="marvel-text-bg">
        {marvelText}
        {marvelText} {/* Double it for more coverage */}
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
