'use server'

import postgres from 'postgres'
import fs from 'fs'
import { RecipeSchema } from './recipeSchema';
import { recipeMetaData } from '../types/recipeTypes';
const sql = postgres(process.env.POSTGRES_URL,{ssl: "require" }) ;


export const createTable = async () => {
    try {
    const queryText = await  sql`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        preparation_time INT NOT NULL,
        cooking_time INT NOT NULL,
        cuisine TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        diet TEXT NOT NULL,
        author_id INT NOT NULL,
        instructions TEXT NOT NULL,
        notes TEXT,
        image TEXT,
        tags TEXT,
        likes INT DEFAULT 0,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (author_id) REFERENCES users (id)
        );
        CREATE TABLE IF NOT EXISTS ingredients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT,
        note TEXT,
        recipe_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id)
        );
        INSERT INTO users (name, email, password)
        VALUES ('admin', 'abc@email.com, 'admin123') ON CONFLICT DO NOTHING;
    `;
        
        console.log('Tables created successfully');
    } catch (error) {
        console.log('Error creating tables', error);
        throw error;
    }
}
// createTable();

export const addRecipe = async (recipe : RecipeSchema)=>{
    try{
        console.log("Starting transaction");
        await sql.begin(async (sql)=>{
        const query = await sql`
        INSERT INTO recipes (title, description, image, preparation_time, cooking_time, cuisine, difficulty, diet, author_id, instructions, notes, tags)
        VALUES (${recipe.name}, ${recipe.desc}, ${recipe.image ?? null},${recipe.prepTime}, ${recipe.cookTime}, ${recipe.cuisine ?? ""}, ${recipe.difficulties ?? ""}, ${recipe.diet?.join(",") ?? ""}, 1, ${recipe.steps}, ${recipe.notes ?? ""}, ${Array.isArray(recipe.tags) ? recipe.tags.join(",") : recipe.tags ?? ""})
        `;
        console.log(query);
        recipe.ingredients.forEach(async (ingredient)=>{
            await sql`
            INSERT INTO ingredients (name, unit, note, recipe_id)
            VALUES (${ingredient.name ?? ""}, ${ingredient.unit ?? ""}, ${ingredient.note ?? ""}, ${query[0].id})
            `;
        });
        return query[0].id ;
    });
        console.log('Recipe added successfully');
    }catch(e){
        console.log('Error adding recipe', e);
        return null;
    }
}
export const getRecipes = async ( ids : number[] )=>{
    try{
        const query = await sql<recipeMetaData[]>`
        SELECT users.name as author, recipes.id as id , recipes.title as title, recipes.description as desc, recipes.views as views, recipes.likes as likes   FROM recipes
        JOIN users ON recipes.author_id = users.id
        WHERE id = ANY(${ids})
        `;
        console.log(query) ;
        return query;
    }catch(e){
        console.log('Error getting recipes', e);
        return [];
    }
}
export const getFULLRecipe = async ( id : number )=>{
    try{
        const query = await sql<RecipeSchema[]>`
        SELECT recipes.title as name, recipes.description as desc, recipes.preparation_time as prepTime, recipes.cooking_time as cookTime, recipes.cuisine as cuisine, recipes.difficulty as difficulties, recipes.diet as diet, recipes.instructions as steps, recipes.notes as notes, recipes.tags as tags, JSON_AGG(ingredients.name as name, ingredients.unit as unit, ingredients.note as note) as ingredients FROM recipes
        JOIN ingredients ON recipes.id = ingredients.recipe_id
        GROUP BY  ingredients.recipe_id
        WHERE recipes.id = ${id}
        `;
        console.log(query) ;
        return query;
    }catch(e){
        console.log('Error getting recipe', e);
        return null;
    }
}
export default sql;