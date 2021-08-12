import {Component} from 'react'

import {SiCodechef} from 'react-icons/si'
import {FaPinterestSquare, FaFacebookSquare} from 'react-icons/fa'
import {AiOutlineTwitter} from 'react-icons/ai'
import {GrInstagram} from 'react-icons/gr'
import {GoMail} from 'react-icons/go'
import {HiOutlinePhoneMissedCall} from 'react-icons/hi'

import './index.css'

class FooterSection extends Component {
  render() {
    return (
      <div className="footer-block">
        <div className="footer-heading">
          <SiCodechef className="footer-logo" />
          <h1 className="footer-app-name">Tasty Kitchens</h1>
        </div>
        <p className="footer-quote">
          The only thing we are serious about is food.
        </p>
        <div className="footer-heading">
          <FaPinterestSquare className="footer-social-media-logos" />
          <GrInstagram className="footer-social-media-logos" />
          <AiOutlineTwitter className="footer-social-media-logos" />
          <FaFacebookSquare className="footer-social-media-logos" />
        </div>
        <ul className="queries-block">
          <li className="queries-list">For Queries Contact </li>
          <div className="query-icon-block">
            <GoMail className="query-icon" />
            <li className="queries-list">:- maheshuma916@gmail.com</li>
          </div>
          <div className="query-icon-block">
            <HiOutlinePhoneMissedCall className="query-icon" />
            <li className="queries-list">:- 814343880</li>
          </div>
        </ul>
      </div>
    )
  }
}
export default FooterSection
