import React from 'react'
import Store from '../store/store'

const HomePage = () => {
    const {increment,count}=Store()
  return (
    <div>
      <button onClick={increment}>click me</button>
      <div>{count}</div>
    </div>
  )
}

export default HomePage
