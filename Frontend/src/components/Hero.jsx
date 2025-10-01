import React from 'react'

const Hero = ({ title, imageURL }) => {
  return (
    <div className='hero container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis asperiores sed non sequi ipsa atque aspernatur eius exercitationem sapiente voluptatibus rem corrupti autem soluta voluptatum assumenda culpa ad, aliquid nihil? Cupiditate quam explicabo, dolore qui similique temporibus, quae repudiandae veniam ad harum nihil minus quas commodi cum! Voluptatem, quisquam magni.</p>
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
