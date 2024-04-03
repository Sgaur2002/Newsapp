import React, { Component } from 'react'
import spin from './spin.gif'
export class Spinner extends Component {
  render() {
    return (
      <div style={{display:'flex', justifyContent:'center'}}>
        <img className='my-3' src={spin} alt="loading" />
      </div>
    )
  }
}

export default Spinner
