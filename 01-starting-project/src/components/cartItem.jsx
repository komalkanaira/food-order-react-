import { currencyFormatter } from "../util/formatting.js"
import Button from "./UI/button"

export default function CartItem({name,quantity,price,onDecrease,onIncrease}){
    return (
    <li className="cart-item">
        <p>
            {name}-{quantity}*{currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <Button onClick={onDecrease}>-</Button>
            <span>{quantity}</span>
            <Button onClick={onIncrease}>+</Button>
        </p>
    </li>)
}