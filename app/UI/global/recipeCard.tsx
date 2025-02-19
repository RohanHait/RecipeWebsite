import { recipeMetaData } from "@/app/types/recipeTypes";
import Image from "next/image";
import Link from "next/link";
interface CardProps {
  data: recipeMetaData,
}
const shortenStrings = (text: string, len = 80) => {
  if (text.length > len) return text.slice(0, len - 3) + "...";
  return text;
}
export function RecipeCard(props: CardProps) {
  return (
    <article className="card-box">
      <div className="card-wrapper">
        <figure className="card-img-wrapper">
          <img alt={props.data.title} src={props.data.img} className="card-img" />
        </figure>
        <div className="card-body">
          <h3 className="card-title"> {props.data.title} </h3>
          <p className="">{shortenStrings(props.data.desc)} </p>
          <Link href={`/recipe/${props.data.id}`} className="card-link">
            Read Recipe <span className="sr-only">about {props.data.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="card-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
