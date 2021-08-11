import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import './index.css'

class CartItems extends Component {
  state = {finalQuantity: 1}

  onDecrement = () => {
    const {finalQuantity} = this.state
    if (finalQuantity > 0) {
      this.setState(prevState => ({finalQuantity: prevState.finalQuantity - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({finalQuantity: prevState.finalQuantity + 1}))
  }

  onPlaceOrder = () => {}

  render() {
    const {foodItems} = this.props
    const {finalQuantity} = this.state
    const foodItemName = Cookies.get('food_item_name')
    const price = `${finalQuantity * foodItems.cost}`
    if (foodItemName === foodItems.name) {
      return (
        <div className="cart-items-block">
          <div className="cart-items">
            <div className="heading-block">
              <p className="cart-heading">Item</p>
              <div className="cart-item-pic-name">
                <img
                  alt={foodItems.id}
                  className="cart-item-img"
                  src={foodItems.imageUrl}
                />
                <p className="item-name-text">{foodItems.name}</p>
              </div>
            </div>
            <div className="heading-block">
              <p className="cart-heading">Quantity</p>
              <div className="quantity-block">
                <button
                  onClick={this.onDecrement}
                  className="quantity-button"
                  type="button"
                >
                  -
                </button>
                <div className="quantity">{finalQuantity}</div>
                <button
                  onClick={this.onIncrement}
                  className="quantity-button"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
            <div className="heading-block">
              <p className="cart-heading">Price</p>
              <p className="cart-item-price">
                <BiRupee />
                {price}.00
              </p>
            </div>
          </div>
          <p className="dotted-line">
            -------------------------------------------------------------------------------------------------------------------------------
          </p>
          <div className="cart-checkout-container">
            <p className="price-text">Total Price : </p>
            <div className="place-order">
              <div className="price">
                <BiRupee />
                <p className="price-text">{price}.00</p>
              </div>
              <Link to="/paymentSuccess">
                <button
                  onClick={this.onPlaceOrder}
                  type="button"
                  className="place-order-button"
                >
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default CartItems
