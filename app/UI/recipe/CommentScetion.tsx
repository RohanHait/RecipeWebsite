import React from 'react'

function CommentScetion() {
  return (
    <section className='recipe-section' id='comment-section'>
      <h3 className='sec-m-header'> Leave a Comments  </h3>
      <form className='comment-form'>
        <label className='comment-label' htmlFor='rating'> Rate This Recipe  </label>
        <div className="rating">
          <input type="radio" name="rating" value="5" id="5" /><label htmlFor="5">☆</label>
          <input type="radio" name="rating" value="4" id="4" /><label htmlFor="4">☆</label>
          <input type="radio" name="rating" value="3" id="3" /><label htmlFor="3">☆</label>
          <input type="radio" name="rating" value="2" id="2" /><label htmlFor="2">☆</label>
          <input type="radio" name="rating" value="1" id="1" /><label htmlFor="1">☆</label>
        </div>
        <label className='comment-label' htmlFor='comment' > Comment </label>
        <textarea className='comment-input' placeholder='Write your comment here' id='comment' name='comment' />
        <label className='comment-label' htmlFor='name' > Name </label>
        <input className='comment-name' aria-label='Name' placeholder='name' id='name' name="name" />
        <label className='comment-label' htmlFor='email'> Email </label>
        <input className='comment-email' type="email" name='email' id='email' placeholder='Email' aria-label='email' />
        <button className='comment-submit py-2 bg-persiangreen text-gray-200 max-w-28 my-auto rounded '> Submit </button>
      </form>

    </section>
  )
}

export default CommentScetion   