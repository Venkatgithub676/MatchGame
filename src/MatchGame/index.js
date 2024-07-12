import {Component} from 'react'
import Navbar from '../Navbar'
import GameOver from '../GameOver'
import './index.css'

class MatchGame extends Component {
  state = {
    activeTabId: 'FRUIT',
    time: 5,
    score: 0,
    randomNum: 0,
    gameOver: false,
  }

  componentDidMount() {
    this.timerId = setInterval(this.timing, 1000)
  }

  timing = () => {
    this.setState(prevState => {
      if (prevState.time <= 1) {
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
    }
  }

  onClickTabBtn = tabId => {
    this.setState({activeTabId: tabId})
  }

  gameCon = (tabsList, filteredList, randomNum, imagesList) => (
    <>
      <img
        className="main-pic"
        src={imagesList[randomNum].imageUrl}
        alt={imagesList[randomNum].category}
      />
      <ul className="tab-con">
        {tabsList.map(each => {
          const clickTabBtn = () => {
            this.onClickTabBtn(each.tabId)
          }
          return (
            <li className="tab-items" key={each.tabId}>
              <button className="tab-btn" onClick={clickTabBtn} type="button">
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
                  alt={each.category}
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
        <p>Your Score</p>
        <p>{score}</p>
        <button type="button">Play Again</button>
      </div>
    )

    const isGameOver = gameOver
      ? wonGame
      : this.gameCon(tabsList, filteredList, randomNum, imagesList)
    return (
      <div className="bg-con">
        <Navbar time={time} score={score} />
        <div className="main-con">{isGameOver}</div>
      </div>
    )
  }
}

export default MatchGame
