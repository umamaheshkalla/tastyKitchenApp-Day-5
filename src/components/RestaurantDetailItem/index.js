import {Component} from 'react'

import {IoMdStar} from 'react-icons/io'

import Cookies from 'js-cookie'

import Counter from '../Counter'

import './index.css'

class RestaurantDetailItem extends Component {
  state = {onAddItem: true, restaurantInfoId: '', selectedFoodName: ''}

  addItem = () => {
    const {restaurantDetailItem, restaurantId} = this.props
    this.setState({
      onAddItem: false,
      restaurantInfoId: restaurantId,
      selectedFoodName: restaurantDetailItem.name,
    })
  }

  renderAddButton = () => (
    <button onClick={this.addItem} className="item-add-button" type="button">
      ADD
    </button>
  )

  render() {
    const {restaurantDetailItem} = this.props
    const {imageUrl, cost, foodType, id, name, rating} = restaurantDetailItem
    const {onAddItem, selectedFoodName, restaurantInfoId} = this.state
    Cookies.set('restaurant_id', restaurantInfoId, {expires: 30})
    Cookies.set('food_item_name', selectedFoodName, {expires: 30})

    return (
      <div className="restaurantItems-block">
        <img className="item-image" alt={id} src={imageUrl} />
        <ul className="item-info">
          <li className="item-name">
            {name} <span className="food-type"> ({foodType})</span>
          </li>
          <li className="item-cost">Rs.{cost}.00</li>
          <li className="item-rating">
            <IoMdStar className="item-rating-icon" />
            {rating}
          </li>
          {onAddItem ? this.renderAddButton() : <Counter />}
        </ul>
      </div>
    )
  }
}

export default RestaurantDetailItem
