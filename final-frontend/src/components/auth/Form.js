import React from 'react'
import { withRouter } from 'react-router'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }


  handleSubmit (e) {
    e.preventDefault()
    console.log(JSON.stringify(this.state))
    this.props.onSubmit(this.state)
      .then(() => this.props.history.push('/students'))
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-control'
            id='email'
            onChange={this.handleChange}
            name='email'
            type='text'
            value={this.state.email}
            required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            id='password'
            onChange={this.handleChange}
            name='password'
            type='password'
            value={this.state.password}
            required  />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default withRouter(Form)

