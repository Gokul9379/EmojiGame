import { Component } from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({ clickedEmojisList: [], isGameInProgress: true })
  }

  renderScoreCard = () => {
    const { emojisList } = this.props
    const { clickedEmojisList } = this.state
    const isWon = clickedEmojisList.length === emojisList.length
    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojisList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const { topScore } = this.state
    const newTopScore = currentScore > topScore ? currentScore : topScore
    this.setState({ topScore: newTopScore, isGameInProgress: false })
  }

  clickEmoji = id => {
    const { emojisList } = this.props
    const { clickedEmojisList } = this.state
    const isEmojiPresent = clickedEmojisList.includes(id)
    const clickedEmojisLength = clickedEmojisList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prev => ({
        clickedEmojisList: [...prev.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const { emojisList } = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()
    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(emoji => (
          <EmojiCard
            key={emoji.id}
            emojiDetails={emoji}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const { clickedEmojisList, isGameInProgress, topScore } = this.state

    return (
      <div className="app-container">
        <video autoPlay loop muted className="background-video">
          <source src="/emoji-bg.mp4" type="video/mp4" />
        </video>

        {/* Floating emojis behind cards */}
        <div className="floating-emoji-container">
          {[...Array(40)].map((_, idx) => (
            <span
              key={idx}
              className="floating-emoji"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                fontSize: `${15 + Math.random() * 40}px`,
                animationDuration: `${10 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              {['😄','😂','😍','🥰','🤩','😎','🤗','🤔'][Math.floor(Math.random() * 8)]}
            </span>
          ))}
        </div>

        <NavBar
          currentScore={clickedEmojisList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />

        <div className="emoji-game-body">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
