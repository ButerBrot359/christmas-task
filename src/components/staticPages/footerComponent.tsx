import React from 'react'
import RSLogo from '../../images/svg/rss.svg'

export const FooterComponent: React.FC = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-data">
        <p>©</p>
        <p>2021</p>
        <a href="https://github.com/ButerBrot359">ButerBrot359</a>
      </div>
      <a href="https://rs.school/js/" className="rs-logo">
        <img src={RSLogo} alt="rs-logo" />
      </a>
    </div>
  </footer>
)
