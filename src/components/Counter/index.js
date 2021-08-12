import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import './index.css'

class Counter extends Component {
  state = {quantity: 0, isAddedToCart: true}

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onAddToCart = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState({isAddedToCart: false})
    }
  }

  render() {
    const {quantity, isAddedToCart} = this.state
    return (
      <div className="counter-block">
        <div className="counter-block-quantity">
          <button
            className="counter-button"
            type="button"
            onClick={this.onDecrement}
          >
            -
          </button>
          <div className="quantity">{quantity}</div>
          <button
            className="counter-button"
            type="button"
            onClick={this.onIncrement}
          >
            +
          </button>
        </div>

        {isAddedToCart ? (
          <button
            onClick={this.onAddToCart}
            type="button"
            className="add-cart-button "
          >
            Add to Cart
          </button>
        ) : (
          <li className="isAdded-text"> Item Added to Cart -- Go to Cart</li>
        )}
      </div>
    )
  }
}

export default withRouter(Counter)
