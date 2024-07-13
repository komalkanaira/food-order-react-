import { currencyFormatter } from "../util/formatting.js"
import Button from "./UI/button.jsx"
import Cartcontext from "../store/context.jsx"
import { useContext } from "react"

export default function Mealitem({meal}){

const cartCtx=useContext(Cartcontext);
function handleAddmealToCart(){
cartCtx.addItem(meal);
console.log(meal);
}
    return (
        <li className="meal-item">
<article>
    <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
    <div>
        <h3>{meal.name}</h3>
        <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
        <p className="meal-utem-description">{meal.description}</p>
    </div>
    <p className="meal-item-actions">
        <Button onClick={handleAddmealToCart}>Add To Cart</Button>
    </p>
</article>
        </li>
    )
}