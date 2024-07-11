import {Component} from 'react'
import Navbar from '../Navbar'
import './index.css'

class MatchGame extends Component {
  state = {activeTabId: 'FRUIT', time: 60, score: 0, randomNum: 0}

  componentDidMount() {
    this.timerId = setInterval(this.timing, 1000)
  }

  timing = () => {
    this.setState(prevState => {
      if (prevState.time <= 1) {
        clearInterval(this.timerId)
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

  render() {
    const {imagesList, tabsList} = this.props
    const {activeTabId, time, score, randomNum} = this.state
    const filteredList = imagesList.filter(
      each => each.category === activeTabId,
    )
    return (
      <div className="bg-con">
        <Navbar time={time} score={score} />
        <div className="main-con">
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
                  <button
                    className="tab-btn"
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
                      alt={each.category}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default MatchGame
