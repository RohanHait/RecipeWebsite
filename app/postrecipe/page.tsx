import React from 'react'
import Form from "@/app/UI/recipe/recipe-form"
import "@/app/UI/recipe/recipeCard.css"
function Page() {
    
  return (
    <section className='post-recipe max-w-screen-lg mx-auto my-3 border border-gray-200 rounded-md px-3 py-4' id='recipe-post'>
      <Form/>
    </section>

  )
}

export default Page 