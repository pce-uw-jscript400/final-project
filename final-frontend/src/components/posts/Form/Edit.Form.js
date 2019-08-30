import React from 'react'
import Form from './Form'

export default ({ onSubmit, post }) => (
  <section className='container'>
    <h1>Edit Your Assignment</h1>
    <hr />
    <Form post={post} onSubmit={onSubmit} />
  </section>
)
