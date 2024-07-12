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
      <ul className="score-timer-sec-con">
        <li>
          <p className="score">
            Score: <span className="score-span">{score}</span>
          </p>
        </li>
        <li className="timer-sec-con">
          <img
            alt="timer"
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            className="timer"
          />
          <p className="timer-secs">{time} sec</p>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
