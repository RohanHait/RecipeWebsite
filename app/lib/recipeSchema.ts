import z from "zod"

export const recipeSchema = z.object({
  title: z.string(),
  summary : z.string(),
  ingredients: z.array(z.object({
    name : z.string(),
    quantity : z.string().optional(),
    note : z.string().optional(),
  })),
  instructions: z.string(),
  notes : z.string().optional(),
  tags : z.array(z.string()).optional(),
  about : z.string().optional(),
  prep_time : z.number(),
  cook_time : z.number(),
  cuisine_type : z.string().optional(),
  course_type : z.string().optional(),
  difficulty_level : z.string().optional(),
  diet : z.array(z.string()).optional(),
  photo_url : z.string().optional(),
})

export type RecipeSchema = z.infer<typeof recipeSchema>