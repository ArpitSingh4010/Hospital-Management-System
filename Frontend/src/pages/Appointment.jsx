import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'

const Appointment = () => {
  return (
    <>
      <Hero title={"Book an Appointment"} imageURL={"/signin.png"}/>
      <AppointmentForm/>
    </>
  )
}

export default Appointment
