import {Component} from 'react'
import {BiSmile, BiWinkSmile} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class PaymentSuccess extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="payment-success-page">
          <div className="success-card">
            <BiSmile className="smile-icon" />
            <p className="success-heading">Payment Successful</p>
            <li className="greet">Thank You for Ordering </li>
            <li className="greet">Your Payment is successfully completed.</li>
            <Link to="/">
              <button className="nav-home-button" type="button">
                Go To Home Page
              </button>
            </Link>
          </div>
          <div className="congrats">
            <BiWinkSmile className="congrats-smile" />
            <p className="congrats-greet">
              Congrats! You Have Avail a Free Delivery Charges.
            </p>
          </div>
        </div>
      </>
    )
  }
}
export default PaymentSuccess
