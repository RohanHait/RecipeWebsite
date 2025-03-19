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
interface Nutrition_properties{
  value : number,
  unit : string,
  percentage : number
}
export interface Nutrition {
  fat: Nutrition_properties,
  saturates: Nutrition_properties,
  carbs: Nutrition_properties,
  sugars: Nutrition_properties,
  fibre: Nutrition_properties,
  protein: Nutrition_properties,
  cholesterol: Nutrition_properties,
  sodium: Nutrition_properties,
  potassium: Nutrition_properties,
  microNutrition: Array<{ name: string, properties: Nutrition_properties}>
}
export interface RecipeData extends recipeMetaData {
  prepTime: number,
  cooktime: number,
  cuisine: string,
  course: string,
  diet: Array<string>,
  difficulty: string,
  ingredients: Array<Ingredient>,
  instructions : string,
  notes: string,
  Nutrition?: Nutrition,
}


