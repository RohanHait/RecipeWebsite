import { recipeMetaData } from "./types/recipeTypes";
import { RecipeCard } from "./UI/global/recipeCard";
import pool from "./lib/db";

const tempData: recipeMetaData = {
  id: 1,
  title: "Chicken Mancurion",
  desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  img: "https://ikneadtoeat.com/wp-content/uploads/2015/09/Chicken-Manchurian-1.jpg",
  author: "Rohan Hait",
  likes: 10,
  views: 10214,
}

export default function Home() {
  return (
    <main className=" px-24 py-10  ">
      <section className="mx-auto">
        <h2 className="text-2xl max-w-screen-xl font-bold my-3 mx-auto"> Trading Recipes </h2>
        <section className="card-container bg-gray-300 py-4 rounded-2xl">
          {
            Array.apply(null, Array(12)).map((_, ind) => <RecipeCard key={ind} data={tempData} />)
          }
        </section>
      </section>
    </main>
  );
}
