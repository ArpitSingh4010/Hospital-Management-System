import React from 'react'

const Hero = ({ title, imageURL }) => {
  return (
    <div className='hero container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>
          At our state-of-the-art medical facility, we are dedicated to providing exceptional healthcare services with compassion and excellence. Our team of experienced doctors, cutting-edge technology, and patient-centered approach ensure you receive the highest quality care. We believe in treating not just the illness, but the whole person, fostering a healing environment where your health and well-being are our top priorities. From preventive care to specialized treatments, we're here to support you every step of your healthcare journey.
        </p>
      </div>
      <div className="banner">
        <img src={imageURL} alt="Hero" className='animated-image'/>
        <span>
            <img src="/Vector.png" alt="Vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero
