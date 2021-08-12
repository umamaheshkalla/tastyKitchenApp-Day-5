import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
            alt="not found"
            className="not-found-img"
          />
          <p className="error-msg">
            we are sorry the page you requested is not found <br />
            Please go back to Home Page.
          </p>
          <Link to="/">
            <button type="button" className="to-home-button">
              Home Page
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default NotFound
