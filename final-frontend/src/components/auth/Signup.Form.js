import React from 'react'
import { withRouter } from 'react-router'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }


  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
      .then(() => this.props.history.push('/users'))
  }

  render () {
    return (
      <main className='container'>
      <section className='row justify-content-md-center'>
      <div className='col col-lg-5'>
          <h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            className='form-control'
            id='username'
            onChange={this.handleChange}
            name='username'
            type='text'
            value={this.state.username}
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
        <div className='form-group'>
          <label htmlFor='first-name'>First Name</label>
          <input
            className='form-control'
            id='first-name'
            onChange={this.handleChange}
            name='fname'
            type='text'
            value={this.state.firstname}
            required  />
        </div>
        <div className='form-group'>
          <label htmlFor='last-name'>Last Name</label>
          <input
            className='form-control'
            id="last-name"
            onChange={this.handleChange}
            name='lname'
            type='text'
            value={this.state.lastname}
            required  />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
      </div>
      </section>
      </main>
    )
  }
}

export default withRouter(SignUpForm)
