export interface recipeMetaData {
  id: number,
  title: string,
  desc: string,
  img: string,
  author: string,
  likes: number,
  views: number,
}
export interface Ingredient {
  unit?: string,
  name: string,
  note?: string,
}
interface Nutrations {
  fat: number,
}
export interface RecipeData extends recipeMetaData {
  prepTime: number,
  cooktime: number,
  cuisine: string,
  course: string,
  diet: Array<string>,
  difficulty: string,
  ingredients: Array<Ingredient>,
  notes: string,

}


