'use client'

import React, { DOMAttributes, useEffect } from "react"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import { RecipeSchema, recipeSchema } from "@/app/lib/recipeSchema"
import { reduceFileSize } from "@/app/lib/imageProcecing"
import { postRecipe } from "@/app/lib/form-action"
const instructionConfig = {
    module: {
        toolbar: [
            [{ 'header': [3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike',],
            [{ 'list': 'ordered' }],
            ['link'],
            ['clean']
        ]
    },
    formats: ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'link']
}

const NoteConfig = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    },

    formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ],
}
function NoteFromSection(value: string, handleChange: (newValue: string) => void) {
    return (
        <fieldset className='note-form'>
            <legend> Note </legend>
            <ReactQuill value={value} onChange={handleChange} modules={NoteConfig.modules} formats={NoteConfig.formats} />
        </fieldset>
    )
}
function InstractionFormSection(instructions: RecipeSchema['instructions'], handleChange: (newInstructions: RecipeSchema['instructions']) => void) {
    return (
        <fieldset className='instruction-form'>
            <legend> Instructions </legend>
            <ReactQuill value={instructions} onChange={(value) => handleChange(value)} modules={instructionConfig.module} formats={instructionConfig.formats} />
        </fieldset>
    )
}

function ingredientFormSection(ingredients: RecipeSchema['ingredients'], handleChange: (newIngredients: RecipeSchema['ingredients']) => void) {
    const [name, setName] = React.useState<string>('')
    const [unit, setUnit] = React.useState<string>('')
    const [note, setNote] = React.useState<string>('')
    const addIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (name === '') {
            alert('Name is required')
            return;
        }
        handleChange([...ingredients, { name, quantity: unit, note }])
        setName('')
        setUnit('')
        setNote('')
    }
    const removeIngredient = (index: number) => {
        const newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        handleChange(newIngredients)
    }
    return (
        <fieldset className='ingredient-form'>
            <legend> Ingredient </legend>
            <ul className='ingredient-list list-disc list-inside px-5 ' datatype="list">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item text-lg flex items-center">
                        <p> <strong> {ingredient.name} </strong> <span> {ingredient.quantity || ""} </span> <span className="font-light"> {ingredient.note || ""} </span>
                        </p>
                        <button onClick={() => removeIngredient(index)} title="Remove ingredient" role="button" aria-label="Remove ingredient">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff001d"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex flex-row flex-wrap gap-5">

                <div className="min-w-[250px] flex-1">
                    <label className='ingredient-label' htmlFor='ingredient-name'> Name </label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full" name="ingredient-name" id="ingredient-name" placeholder="Name" aria-required />
                </div>
                <div className="min-w-[250px] flex-1">
                    <label className='ingredient-label' htmlFor='unit'> Unit </label>
                    <input onChange={e => setUnit(e.target.value)} value={unit} className="w-full" type="text" name="unit" id="unit" placeholder="Unit (optional)" />
                </div>
                <div className="min-w-[250px] flex-1">
                    <label className='ingredient-label' htmlFor='note'> Note </label>
                    <input onChange={e => setNote(e.target.value)} className="w-full" value={note} type="text" name="note" id="note" placeholder="Note (optional)" />
                </div>
                <button className='add-ingredient min-w-16 self-center h-12 bg-indigo-500 rounded-lg mt-auto mb-2 text-gray-100' onClick={addIngredient}> Add </button>
            </div>
        </fieldset>
    )
}

export default function Form() {

    const [formData, setFormData] = React.useState<RecipeSchema>({
        title: "",
        summary: "",
        ingredients: [],
        instructions: "",
        prep_time: 0,
        cook_time: 0,
        photo_url: "",

    })
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const handleSubmit = (e:HTMLFormElement) => {
        e.preventDefault()
        console.log("Form Entered")
        try {
            const recipe = recipeSchema.parse(formData)
            console.log(recipe)
            try { fetch("http://localhost:4000/recipe/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(recipe)
                }).then(res=>res.json()).then((res) => {
                    console.log(res)
                    console.log(res.body)
                }).catch((e) => {
                    console.log("error",e)
                })
            } catch (e) {
                console.log(e)
            }
            setErrors({});
        } catch (err) {
            alert(err)
            if (err instanceof Error && 'errors' in err) {
                const zodErrors = (err as any).errors;
                const errorMessages: Record<string, string> = {};
                zodErrors.forEach((error: any) => {
                    errorMessages[error.path[0]] = error.message;
                });
                setErrors(errorMessages);
            }
        }
    }
    const handleChange = (newData: Partial<RecipeSchema>) => {
        setFormData({ ...formData, ...newData })
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {

            reduceFileSize(file, 1024 * 1024, 800, 800, 0.8, (blob) => {
                if (blob) {
                    // blob to base64
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = () => {
                        console.log(reader.result)
                        handleChange({ photo_url: reader.result as string })
                    }

                }
            })
        }
    }
    useEffect(() => {
        if (!HTMLCanvasElement.prototype.toBlob) {
            Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                value: function (callback: (a: Blob) => void, type: string, quality: number) {

                    var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                        len = binStr.length,
                        arr = new Uint8Array(len);

                    for (var i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }

                    callback(new Blob([arr], { type: type || 'image/png' }));
                }
            });
        }
        window.URL = window.URL || window.webkitURL;

    }, [])

    return (
        <form className="flex flex-col recipe-post-form" onSubmit={handleSubmit}>
            <label className='post-label' htmlFor='title' aria-label='title'> Title </label>
            <input type="text" name="title" id="title" placeholder="Title" required aria-labelledby='title' aria-required onChange={(e) => handleChange({ title: e.target.value })} />
            <div>
                <label className='post-label' htmlFor='desc' > Image </label> <input onChange={handleImageUpload} type="file" name="image" id="image" accept="image/*" required aria-required />
            </div>
            <label className='post-label' htmlFor='desc' > Description </label>
            <textarea className='post-desc' placeholder='Description' id='desc' name='desc' required aria-required onChange={(e) => handleChange({ summary: e.target.value })} />
            <fieldset className='time-form flex flex-row gap-5 flex-wrap'>
                <div className="min-w-[200px] flex-1">
                    <label className='post-label' htmlFor='prepTime' > Preparation Time </label>
                    <input className="w-full" type="number" name="prepTime" id="prepTime" placeholder="Preparation Time" required aria-required onChange={(e) => handleChange({ prep_time: parseInt(e.target.value) })} />
                </div>
                <div className="min-w-[200px] flex-1">
                    <label className='post-label' htmlFor='cookTime' > Cook Time </label>
                    <input className="w-full" type="number" name="cookTime" id="cookTime" placeholder="Cook Time" required aria-required onChange={(e) => handleChange({ cook_time: parseInt(e.target.value) })} />
                </div>
                <div className="min-w-[200px] flex-1">
                    <label className="post-label" htmlFor="cuisine"> Cuisine </label>
                    <input className="w-full" type="text" name="cuisine" id="cuisine" placeholder="Cuisine" onChange={(e) => handleChange({ cuisine_type: e.target.value })} />
                </div>
                <div className="min-w-[200px] flex-1">
                    <label className="post-label" htmlFor="course"> Course </label>
                    <input className="w-full" type="text" name="course" id="course" placeholder="Course" onChange={(e) => handleChange({ course_type: e.target.value })} />
                </div>
                <div className="min-w-[200px] flex-1">

                    <label className="post-label" htmlFor="difficulties"> Difficulties </label>
                    <input className="w-full" type="text" name="difficulties" id="difficulties" placeholder="Difficulties" onChange={(e) => handleChange({ difficulty_level: e.target.value })} />
                </div>
            </fieldset>
            {ingredientFormSection(
                formData.ingredients,
                (newIngredients) => handleChange({ ingredients: newIngredients })
            )}
            {InstractionFormSection(formData.instructions, (newInstructions) => handleChange({ instructions: newInstructions }))}
            {NoteFromSection(formData.notes || "", (newNote) => handleChange({ notes: newNote }))}
            <input type="hidden" name="data" value={JSON.stringify(formData)}/>
            <button type="submit"> Submit </button>
        </form>
    )
}