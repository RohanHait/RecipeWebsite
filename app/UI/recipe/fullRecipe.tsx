'use client'
import { Ingredient, RecipeData } from "@/app/types/recipeTypes";
import Image from "next/image"
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { z } from "zod"
import { useDebouncedCallback } from "use-debounce";
import { InstractionSection } from "./instractionSection";
import "@/app/UI/recipe/recipeCard.css"
import NutritionSection from "./NutritionSection";
interface propTypes {
  recipe: RecipeData,
}
interface CheckBoxProps {
  id: number,
  item: Ingredient,
  setValue?: (a: boolean) => void,
  getIntitalValue: () => boolean,
}
function CheckBox({ id, item, setValue, getIntitalValue }: CheckBoxProps) {
  const [isChecked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(getIntitalValue())
  }, [])

  return (
    <li className="ingredient-item">
      <input type="checkbox"
        onChange={(e) => {
          if (setValue)
            setValue(e.target.checked);
          setChecked(e.target.checked)
        }}
        className="ingredient-checkbox"
        id={`ingredient-cb-${id}`}
        aria-checked={isChecked}
        aria-label={`${item.unit ? item.unit : ""} ${item.name} ${item.note ? item.note : ""}`.trim()}
        checked={isChecked}
      />
      <label htmlFor={`ingredient-cb-${id}`} aria-labelledby={`ingredient-cb-${id}`}>
        <span className={`ingredient-unit ${!item.unit && "hidden"}`}>{item.unit} </span>
        <span className="ingredinet-name">{item.name} </span>
        <span className={`font-normal ingredient-note ${!item.note && "hidden" }`} > - {item.note} </span>
      </label>
    </li>)
}

function mTime2String(t: number) {
  if (t >= 60) return `${Math.floor(t / 60)} h ${t % 60} min`;
  return `${t} min`;
}

const boolArraySchema = z.boolean().array()


function ShowIngredients({ ingredients, id }: {
  ingredients: Ingredient[],
  id: number,
}) {
  const checkedItems = useRef<Array<boolean>>(ingredients.map(() => false));
  const SavedDraft = useDebouncedCallback((value) => {
    console.log(value)
    localStorage.setItem(`Ingredient-${id}`, JSON.stringify(value));
  }, 1000);
  useLayoutEffect(() => {
    let a = localStorage.getItem(`Ingredient-${id}`)

    if (a) {
      a = JSON.parse(a);
      const isParesed = boolArraySchema.safeParse(a)
      if (isParesed.success) {
        for (let i = 0; i < isParesed.data.length; i++) {
          checkedItems.current[i] = isParesed.data[i];
        }
      }
    }
    return () => {
      localStorage.setItem(`Ingredient-${id}`, JSON.stringify(checkedItems.current));
    }
  }, [id])

  return (
    <section className="recipe-section">
      <h4 className="sec-m-header"> Ingredients  </h4>
      <ul className="sec-list">
        {ingredients.map((item, ind) => {
          return <CheckBox item={item} key={ind} id={ind} setValue={(e: boolean) => { checkedItems.current[ind] = e; SavedDraft(checkedItems.current) }} getIntitalValue={() => checkedItems.current[ind]} />
        })}
      </ul>
    </section>
  )
}


export default function RecipeTemplate({ recipe }: propTypes) {

  return (
    <section className="border border-gray-200 rounded-md mx-1 my-2">
      <div>
        <img src={recipe.img} alt={`${recipe.title} image`}
          className="float-right w-[250px] h-[250px] ml-4 mb-4" />
        <div className="px-2 py-3">
          <h3 className="text-3xl font-bold underline underline-offset-2 px-2 py-4"> {recipe.title} </h3>
          <span className="mx-5 my-3 "> by <a href="#" className="font-semibold" > {recipe.author} </a> </span>
          <p className="px-3 py-3 text-lg font-medium">{recipe.desc} </p>
        </div>
      </div>
      <div className="recipe-button-list grid grid-cols-2 sm:grid-cols-4 gap-4 items-center py-3 justify-items-center">
        <button className="flex flex-row px-4 py-3 gap-4 border-2 border-persiangreen text-persiangreen">
          <PrintIcon fill={"#2a9d8f"} />
          <span> Print </span>
        </button>
        <button className="flex flex-row px-4 py-3 gap-4 border-2 border-persiangreen text-persiangreen">
          <ShareIcon fill={"#2a9d8f"} />
          <span> Share </span>
        </button>
        <button className="flex flex-row px-4 py-3 gap-4 border-2 border-persiangreen text-persiangreen">
          <FavoriteIcon fill={"#2a9d8f"} />
          <span> Save </span>
        </button>
        <button className="flex flex-row px-4 py-3 gap-4 border-2 border-persiangreen text-persiangreen">
          <StarRateIcon fill={"#2a9d8f"} />
          <span> Rate </span>
        </button>
      </div>
      <div className="flex flex-row items-center border border-gray-200 gap-x-3 py-2 text-md">
        <div className="mx-4 pr-4 h-full"> <AccessTimeIcon htmlColor="#2a9d8f" /> </div>
        <span className=" w-[1px] bg-slate-200 h-10 overflow-hidden rounded mx-1"></span>
        <div className="recipe-meta flex-1 grid grid-cols-4">
          <div className=""> <span> Prep Time </span> <br /> <span> {mTime2String(recipe.prepTime)}</span> </div>
          <span className=" w-[1px] bg-slate-200 h-10 overflow-hidden rounded mx-1"></span>
          <div className=""> <span> Cook Time </span> <br /> <span> {mTime2String(recipe.cooktime)}</span> </div>
          <span className=" w-[1px] bg-slate-200 h-10 overflow-hidden rounded mx-1"></span>
          <div className=""> <span> Total Time </span> <br /> <span> {mTime2String(recipe.prepTime + recipe.cooktime)}</span> </div>
        </div>
      </div>
      <div className=" flex flex-row items-center border border-gray-200 gap-3 px-3 py-2 text-md">
        <div> <AccessTimeIcon htmlColor="#2a9d8f" /> </div>
        <span className=" w-[1px] bg-slate-200 h-10 overflow-hidden rounded mx-1"></span>
        <div className="recipe-meta flex-1" >
          <div className="flex-1 "> <span> Cusine </span> <br /> <span> {recipe.cuisine}</span> </div>
          <span className=" w-[1px] bg-slate-200 h-10 overflow-hidden rounded mx-1"></span>
          <div className="flex-1"> <span>Course </span> <br /> <span> {recipe.course}</span> </div>
          <span className=" w-[1px] bg-slate-200 h-10 overflow-hidden rounded mx-1"></span>
          <div className="flex-1 "> <span>Diet </span> <br /> <span> {recipe.diet.join(",")}</span> </div>
          <span className=" w-[1px] bg-slate-200 h-10 overflow-hidden rounded mx-1"></span>
          <div className="flex-1 "> <span>Difficulty </span> <br /> <span>{recipe.difficulty}</span> </div>
        </div>
      </div>
      {/**
          Ingradients
      **/}
      <ShowIngredients ingredients={recipe.ingredients} id={recipe.id} />
      <InstractionSection />
      {recipe.Nutrition&& <NutritionSection Nutrition={recipe.Nutrition} recipeName={recipe.title} />}
    </section>
  )
}
