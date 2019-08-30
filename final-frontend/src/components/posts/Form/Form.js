import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { post = {} } = this.props
    const { description = '', title = '', link='' } = post
    this.state = { description, title, link }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { post } = this.props

    if (post && post._id) {
      const body = Object.assign({}, this.state, { _id: post._id })
      this.props.onSubmit(body)
    } else {
      this.props.onSubmit(this.state)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            className='form-control'
            id='title'
            onChange={this.handleChange}
            name='title'
            type='text'
            value={this.state.title} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            className='form-control'
            id='description'
            onChange={this.handleChange}
            name='description'
            type='text'
            value={this.state.description}
            required />
        </div>
        <div className='form-group'>
          <label htmlFor='link'>Link</label>
          <textarea
            className='form-control'
            id='link'
            onChange={this.handleChange}
            name='link'
            type='link'
            value={this.state.description}
            required />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}