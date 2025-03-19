import React from 'react'
import { Nutrition } from '@/app/types/recipeTypes'

function NutritionSection({ Nutrition, recipeName }: { Nutrition: Nutrition, recipeName: string }) {
  return (
    <section className='recipe-section ' id='#Nutrition'>
      <h3 className='sec-m-header'> {"Nutrition (Approximate Value)"} </h3>
      <div className='w-[250px] mt-5 border border-gray-800 rounded p-2'>
        <h4 className='text-xl font-bold'> Nutrition Facts</h4>
        <div className='text-xs'> {recipeName}</div>
        <div className='nutrition-big-line' />
        <div><span className='nutrition-name'>Amount Per Serving </span></div>
        <div className='nutrition-item'>
          <div>
            <span className='nutrition-name'>Calories</span>
            <span className='nutrition-value'>{Nutrition.fat.value * 9 + Nutrition.protein.value * 4 + Nutrition.carbs.value * 4}</span>
          </div>
          <div className='text-xs ml-auto'>
            Calories from Fat {Nutrition.fat.value * 9}
          </div>
        </div>
        <div className='nutrition-small-line' />
        <div className='nutrition-item'> <span className='nutrition-percent'>% Daily Value*</span></div>
        <div className='nutrition-item'>
          <span className='nutrition-name'>Fat</span>
          <span className='nutrition-value'>{Nutrition.fat.value + Nutrition.fat.unit}</span>
          <span className='nutrition-percent'>{Nutrition.fat.percentage}%</span>
        </div>
        <div className='nutrition-item sub-item'>
          <span className='nutrition-name'>Saturated Fat</span>
          <span className='nutrition-value'>{Nutrition.saturates.value + Nutrition.saturates.unit}</span>
          <span className='nutrition-percent'>{Nutrition.saturates.percentage}%</span>
        </div>
        <div className='nutrition-item'>
          <span className='nutrition-name'>Cholesterol</span>
          <span className='nutrition-value'>{Nutrition.cholesterol.value + Nutrition.cholesterol.unit}</span>
          <span className='nutrition-percent'>{Nutrition.cholesterol.percentage}%</span>
        </div>
        <div className='nutrition-item'>
          <span className='nutrition-name'>Sodium</span>
          <span className='nutrition-value'>{Nutrition.sodium.value + Nutrition.sodium.unit}</span>
          <span className='nutrition-percent'>{Nutrition.sodium.percentage}%</span>
        </div>
        <div className='nutrition-item'>
          <span className='nutrition-name'>Potassium</span>
          <span className='nutrition-value'>{Nutrition.potassium.value + Nutrition.potassium.unit}</span>
          <span className='nutrition-percent'>{Nutrition.potassium.percentage}%</span>
        </div>
        <div className='nutrition-item'>
          <span className='nutrition-name'>Carbohydrates</span>
          <span className='nutrition-value'>{Nutrition.carbs.value + Nutrition.carbs.unit}</span>
          <span className='nutrition-percent'>{Nutrition.carbs.percentage}%</span>
        </div>
        <div className='nutrition-item sub-item'>
          <span className='nutrition-name'>Fiber</span>
          <span className='nutrition-value'>{Nutrition.fibre.value + Nutrition.fibre.unit}</span>
          <span className='nutrition-percent'>{Nutrition.fibre.percentage}%</span>
        </div>
        <div className='nutrition-item sub-item'>
          <span className='nutrition-name'>Sugar</span>
          <span className='nutrition-value'>{Nutrition.sugars.value + Nutrition.sugars.unit}</span>
          <span className='nutrition-percent'>{Nutrition.sugars.percentage}%</span>
        </div>
        <div className='nutrition-item'>
          <span className='nutrition-name'>Protein</span>
          <span className='nutrition-value'>{Nutrition.protein.value + Nutrition.protein.unit}</span>
          <span className='nutrition-percent'>{Nutrition.protein.percentage}%</span>
        </div>
        <div className='nutrition-big-line' />
        {
          Nutrition.microNutrition.map((item, index) => (
            <div key={index} className='nutrition-item'>
              <span className='nutrition-name'>{item.name}</span>
              <span className='nutrition-value'>{item.properties.value + item.properties.unit}</span>
              <span className='nutrition-percent'>{item.properties.percentage}%</span>
            </div>
          ))
        }
        <div className='nutrition-item'>
          <span className='text-xs text-gray-400 pt-1'>* Percent Daily Values are based on a 2000 calorie diet</span>
        </div>
      </div>
    </section>
  )
}

export default NutritionSection      