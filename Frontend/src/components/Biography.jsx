import React from 'react'

const Biography = ({ imageURL }) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageURL} alt="about image" />
      </div>
      <div className="banner">
        <h1>About Us</h1>
        <p>We are dedicated to providing the best healthcare services.</p>
        <p>Our team of experienced doctors and staff are here to ensure your well-being.</p>
        <p>We believe in compassionate care and advanced medical practices.</p>
        <button className='btn'>Learn More</button>
      </div>
    </div>
  )
}

export default Biography
