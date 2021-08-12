import {Link, withRouter} from 'react-router-dom'

import {BiHomeCircle, BiLogOutCircle} from 'react-icons/bi'
import {SiCodechef} from 'react-icons/si'
import {GiShoppingCart} from 'react-icons/gi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div>
      <nav className="navbar">
        <div className="header">
          <SiCodechef className="icon" />
          <h1 className="header-title">Tasty Kitchens</h1>
        </div>
        <ul className="blog-items">
          <Link className="nav-link" to="/">
            <div className="cart-icon-container">
              <BiHomeCircle />
              <li className="blog-list">Home</li>
            </div>
          </Link>
          <Link className="nav-link" to="/cart">
            <div className="cart-icon-container">
              <GiShoppingCart className="cart-icon" />
              <li className="cart-name">Cart</li>
            </div>
          </Link>
          <button
            onClick={onClickLogout}
            className="logout-button"
            type="button"
          >
            Logout
          </button>
        </ul>
        <ul className="blog-icons">
          <Link className="nav-link" to="/">
            <li>
              <BiHomeCircle />
            </li>
          </Link>
          <Link className="nav-link" to="/cart">
            <li>
              <GiShoppingCart />
            </li>
          </Link>
          <li onClick={onClickLogout} type="button">
            <BiLogOutCircle />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(Header)
