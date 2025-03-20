"use server";

import { redirect } from "next/navigation";
import { addRecipe } from "./db";
import { RecipeSchema, recipeSchema } from "./recipeSchema";

export async function postRecipe(formData : FormData){
    try{

        const data = recipeSchema.parse(JSON.parse(formData.get('data') as string));
        console.log(data);
        let id = await addRecipe(data);
        if(id){
            redirect(`/recipe/${id}`);
        }
    }catch(e){
        console.log(e);
    }
}