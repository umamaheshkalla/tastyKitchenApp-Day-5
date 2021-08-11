import {Component} from 'react'
import {CgArrowLeftO, CgArrowRightO} from 'react-icons/cg'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import RestaurantItem from '../RestaurantItem'
import RestaurantsHeader from '../RestaurantsHeader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortbyOptions = [
  {
    optionId: 'Highest',
    displayText: 'Highest',
  },
  {
    optionId: 'Lowest',
    displayText: 'Lowest',
  },
]

class AllRestaurants extends Component {
  state = {
    restaurantsData: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activePage: 1,
  }

  componentDidMount() {
    this.getAllRestaurants()
  }

  getAllRestaurants = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeOptionId} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const {activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.restaurants.map(eachItem => ({
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        hasOnlineDelivery: eachItem.has_online_delivery,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        isDeliveringNow: eachItem.is_delivering_now,
        location: eachItem.location,
        menuType: eachItem.menu_type,
        name: eachItem.name,
        opensAt: eachItem.opens_at,
        rating: eachItem.user_rating.rating,
        ratingColor: eachItem.user_rating.rating_color,
        ratingText: eachItem.user_rating.rating_text,
        totalReviews: eachItem.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getAllRestaurants)
  }

  onIncrement = () => {
    const {activePage} = this.state
    if (activePage < 20) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getAllRestaurants,
      )
    }
  }

  onDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getAllRestaurants,
      )
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderAllRestaurantsLists = () => {
    const {restaurantsData, activeOptionId, activePage} = this.state

    return (
      <>
        <RestaurantsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <div className="all-restaurants-container">
          {restaurantsData.map(eachRestaurant => (
            <RestaurantItem
              restaurantItem={eachRestaurant}
              key={eachRestaurant.id}
            />
          ))}
        </div>
        <div className="active-page-block">
          <button
            className="page-buttons"
            type="button"
            onClick={this.onDecrement}
          >
            <CgArrowLeftO />
          </button>
          <p className="active-page">{activePage} of 20</p>
          <button
            onClick={this.onIncrement}
            className="page-buttons"
            type="button"
          >
            <CgArrowRightO />
          </button>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="orange" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllRestaurantsLists()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllProducts()}</>
  }
}

export default AllRestaurants
