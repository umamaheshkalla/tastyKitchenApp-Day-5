import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoMdStar} from 'react-icons/io'

import Header from '../Header'
import FooterSection from '../FooterSection'
import RestaurantDetailItem from '../RestaurantDetailItem'

import './index.css'

class RestaurantDetails extends Component {
  state = {restaurantDetails: {}, restaurantItems: []}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedRestaurantData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }

    const updatedRestaurantItems = data.food_items.map(eachFoodItem => ({
      cost: eachFoodItem.cost,
      foodType: eachFoodItem.food_type,
      id: eachFoodItem.id,
      imageUrl: eachFoodItem.image_url,
      name: eachFoodItem.name,
      rating: eachFoodItem.rating,
    }))

    this.setState({
      restaurantDetails: updatedRestaurantData,
      restaurantItems: updatedRestaurantItems,
    })
  }

  render() {
    const {restaurantDetails, restaurantItems} = this.state
    return (
      <div>
        <Header />
        <div className="restaurantDetail-container-block">
          <div className="restaurantDetail-container">
            <div className="restaurantDetail-content-container ">
              <img
                className="restaurantDetail-img"
                alt={restaurantDetails.id}
                src={restaurantDetails.imageUrl}
              />
              <ul className="restaurantDetail-info-container">
                <li className="restaurantDetail-name">
                  {restaurantDetails.name}
                </li>
                <li className="restaurantDetail-para">
                  {restaurantDetails.cuisine}
                </li>
                <li className="restaurantDetail-para">
                  {restaurantDetails.location}
                </li>
                <div className="rating-cost-block">
                  <li className="restaurantDetail-info-lists">
                    <IoMdStar /> {restaurantDetails.rating} <br />
                    <span className="restaurantDetail-info-lists-bottom">
                      {restaurantDetails.reviewsCount}+ Ratings
                    </span>
                  </li>
                  <li className="restaurantDetail-info-lists-bar">|</li>
                  <li className="restaurantDetail-info-lists">
                    Rs.{restaurantDetails.costForTwo}/- <br />
                    <span className="restaurantDetail-info-lists-bottom">
                      Cost For Two
                    </span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div className="restaurantDetail-items">
            {restaurantItems.map(eachItem => (
              <RestaurantDetailItem
                restaurantDetailItem={eachItem}
                restaurantId={restaurantDetails.id}
                key={eachItem.id}
              />
            ))}
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }
}

export default RestaurantDetails
