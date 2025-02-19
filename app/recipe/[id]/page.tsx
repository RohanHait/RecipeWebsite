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
  notes: `- **Replacing cashews**: If you don’t have cashews then add almonds. Blanch the almonds in hot water for 30 minutes. Then peel and blend them till smooth with some water.\n 
- **Sugar**: Addition of sugar depends upon your taste as well as the tanginess present in the tomatoes. So add as per taste. If you add cream then you might have to add less sugar.\n 
-**Taste and flavor**: If the butter paneer masala gravy tastes tangy or sour, then to balance the sour taste you can add a bit of sugar or cream. But do not add too much sugar as then the gravy becomes too sweet. Also, do note if you add cream then you might have to add less sugar in the sauce or gravy.\n 
- **Color**: To get the bright orangish-red color, its best to use kashmiri red chilli powder or deghi mirch instead of artificial food colors. Using deep red colored tomatoes also contribute to a lovely orange color in the gravy.\n 
- **Frying paneer** (optional): You can fry the paneer cubes if you want and then add in the prepared sauce or gravy.`

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
