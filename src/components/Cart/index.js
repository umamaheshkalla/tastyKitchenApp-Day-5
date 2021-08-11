import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import FooterSection from '../FooterSection'
import CartItems from '../CartItems'

import './index.css'

class Cart extends Component {
  state = {foodItems: []}

  componentDidMount() {
    this.getItemName()
  }

  getItemName = async () => {
    const restaurantId = Cookies.get('restaurant_id')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${restaurantId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedFoodItems = data.food_items.map(eachItem => ({
      cost: eachItem.cost,
      foodType: eachItem.food_type,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.rating,
    }))
    this.setState({foodItems: updatedFoodItems})
  }

  render() {
    const {foodItems} = this.state
    return (
      <div className="cart-page-container-block">
        <Header />
        <div className="cart-page">
          {foodItems.map(eachItem => (
            <CartItems foodItems={eachItem} key={eachItem.id} />
          ))}
        </div>
        <FooterSection />
      </div>
    )
  }
}

export default Cart
