import { RecipeSchema } from "@/app/lib/recipeSchema";
import ReactQuill, {Quill} from "react-quill-new";

let Block = Quill.import('blots/block');
class OrderList extends Block {
    static create(value) {
        let node = super.create(value);
        node.setAttribute('class', 'sec-list sec-order-list');
        return node;
    }
    boltName = "listContainer";
    tagname = "ol";
}

const instructionModule = {
        toolbar: [
      [{ 'header': [3,4, false] }],
      ['bold', 'italic', 'underline','strike',],
      [{'list': 'ordered'}],
      ['link'],
      ['clean']
    ]
}
const instructionFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link'
  ]

Quill.register("formats/list", OrderList);


export default function InstractionFormSection(instructions : RecipeSchema['steps'] , handleChange: (newInstructions: RecipeSchema['steps']) => void) {
    return (
        <fieldset className='instruction-form'>
            <legend> Instructions </legend>
            <ReactQuill value={instructions} onChange={(value) => handleChange(value)} modules={instructionModule} formats={instructionFormats} />
        </fieldset>
    )
}