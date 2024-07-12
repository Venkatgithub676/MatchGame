import {Component} from 'react'
import Navbar from '../Navbar'
// import GameOver from '../GameOver'
import './index.css'

class MatchGame extends Component {
  state = {
    activeTabId: 'FRUIT',
    time: 60,
    score: 0,
    randomNum: 0,
    gameOver: false,
  }

  componentDidMount() {
    const {imagesList} = this.props
    this.setState({randomNum: Math.floor(Math.random() * imagesList.length)})
    this.timerId = setInterval(this.timing, 1000)
  }

  timing = () => {
    this.setState(prevState => {
      if (prevState.time < 1) {
        clearInterval(this.timerId)
        return {gameOver: true}
      }
      return {time: prevState.time - 1}
    })
  }

  onClickThumbnailBtn = id => {
    const {imagesList} = this.props
    const {randomNum, score} = this.state
    if (imagesList[randomNum].id === id) {
      this.setState({
        randomNum: Math.floor(Math.random() * imagesList.length),
        score: score + 1,
      })
    } else {
      clearInterval(this.timerId)
      this.setState({gameOver: true})
    }
  }

  onClickTabBtn = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickReset = () => {
    this.setState({
      activeTabId: 'FRUIT',
      time: 60,
      score: 0,
      randomNum: 0,
      gameOver: false,
    })
    this.timerId = setInterval(this.timing, 1000)
  }

  gameCon = (tabsList, filteredList, randomNum, imagesList, activeTabId) => (
    <>
      <img
        className="main-pic"
        src={imagesList[randomNum].imageUrl}
        alt="match"
      />
      <ul className="tab-con">
        {tabsList.map(each => {
          const clickTabBtn = () => {
            this.onClickTabBtn(each.tabId)
          }
          const matched = activeTabId === each.tabId ? 'active-btn' : ''
          return (
            <li className="tab-items" key={each.tabId}>
              <button
                className={`tab-btn ${matched}`}
                onClick={clickTabBtn}
                type="button"
              >
                {each.displayText}
              </button>
            </li>
          )
        })}
      </ul>
      <ul className="images-con">
        {filteredList.map(each => {
          const clickThumbnailBtn = () => {
            this.onClickThumbnailBtn(each.id)
          }

          return (
            <li className="image-items" key={each.id}>
              <button
                className="thumbnail-btn"
                onClick={clickThumbnailBtn}
                type="button"
              >
                <img
                  className="thumbnail-urls"
                  src={each.thumbnailUrl}
                  alt="thumbnail"
                />
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )

  render() {
    const {imagesList, tabsList} = this.props
    const {activeTabId, time, score, randomNum, gameOver} = this.state
    const filteredList = imagesList.filter(
      each => each.category === activeTabId,
    )

    const wonGame = (
      <div className="game-over-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
          alt="trophy"
          className="trophy"
        />
        <p className="my-score-para">YOUR SCORE</p>
        <p className="my-score">{score}</p>
        <button type="button" className="reset-btn" onClick={this.onClickReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-img"
          />
          PLAY AGAIN
        </button>
      </div>
    )

    const isGameOver = gameOver
      ? wonGame
      : this.gameCon(tabsList, filteredList, randomNum, imagesList, activeTabId)
    return (
      <div className="bg-con">
        <Navbar time={time} score={score} />
        <div className="main-con">{isGameOver}</div>
      </div>
    )
  }
}

export default MatchGame
