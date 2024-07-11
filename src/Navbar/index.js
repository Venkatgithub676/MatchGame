import './index.css'

const Navbar = props => {
  const {time, score} = props

  return (
    <nav className="nav-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
        alt="website logo"
        className="website-logo"
      />
      <div className="score-timer-sec-con">
        <p className="score">Score: {score}</p>
        <div className="timer-sec-con">
          <img
            alt="timer"
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            className="timer"
          />
          <p className="timer-secs">{time} sec</p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
