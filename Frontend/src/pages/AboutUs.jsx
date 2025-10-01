import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'

const AboutUs = () => {
  return (
    <> 
      <Hero title={"Learn more about us"} imageURL={"/about.png"}/>
      <Biography imageURL={"/whoweare.png"}/>
    </>
  )
}

export default AboutUs
