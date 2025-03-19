import { RecipeData } from "@/app/types/recipeTypes"
import RecipeTemplate from "@/app/UI/recipe/fullRecipe"
import Image from "next/image"
import pfpImg from "@/app/assets/man.png"
const recipe: RecipeData = {
  id: 1,
  title: "Paneer Butter Masala Recipe",
  author: "rohan",
  ingredients: [{ unit: "1 to 4 teaspone", name: "salt", note: "use as you wise" },
  { unit: "100 gm", name: "Panner", }],
  desc: "Paneer Butter Masala Recipe is one of India’s most popular paneer preparation. This restaurant style recipe with soft paneer cubes dunked in a creamy, lightly spiced tomato sauce or gravy is a best one that I have been making for a long time. This rich dish is best served with roti or chapati, paratha, naan or rumali roti.",
  img: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-5-500x500.jpg",
  likes: 20,
  views: 100,
  prepTime: 10,
  cooktime: 40,
  cuisine: "North India",
  course: "Main Course",
  diet: ["Gluten Free", "Vegetarian"],
  difficulty: "Modarate",
  instructions: "Soak cashews in a hot water for 20 to 30 minutes. When the cashews are soaking, you can prep the other ingredients like chopping tomatoes, preparing ginger-garlic paste, slicing paneer etc. Then drain and add the soaked cashews in a blender or mixer-grinder. Add 2 to 3 tablespoons water and blend to a smooth and fine paste without any tiny bits or chunks of cashews.",
  notes: "You can add cream or butter to make it more rich",
  Nutrition: {
    fat: { value: 10, unit: "g", percentage: 15 },
    saturates: { value: 5, unit: "g", percentage: 25 },
    carbs: { value: 20, unit: "g", percentage: 10 },
    sugars: { value: 5, unit: "g", percentage: 5 },
    fibre: { value: 5, unit: "g", percentage: 20 },
    protein: { value: 10, unit: "g", percentage: 20 },
    cholesterol: { value: 5, unit: "mg", percentage: 10 },
    sodium: { value: 10, unit: "mg", percentage: 5 },
    potassium: { value: 20, unit: "mg", percentage: 10 },
    microNutrition: [
      { name: "Vitamin A", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Vitamin C", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Calcium", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Iron", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Vitamin D", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Vitamin B12", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Vitamin B6", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Magnesium", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Zinc", properties: { value: 10, unit: "mg", percentage: 5 } },
      { name: "Phosphorus", properties: { value: 10, unit: "mg", percentage: 5 } },
    ]
  } 

}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return (
    <section className="max-w-screen-xl mx-auto my-3">
      <h1 className="text-4xl font-bold "> {recipe.title} </h1>
      <div className="flex gap-3 px-2 py-3 flex-row items-center">
        <Image width={42} height={42} src={pfpImg} alt="" className="rounded-full border border-black " />
        <div>
          <p> by <span className="font-bold"> {recipe.author} </span> </p>
          <p> last update on <span> 28-02-2024 </span> </p>
        </div>
      </div>
      <h2> Introductions </h2>
      <RecipeTemplate recipe={recipe} />

    </section>)
}
