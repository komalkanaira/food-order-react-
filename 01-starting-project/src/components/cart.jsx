import { useContext } from "react";
import Modal from "./UI/Modal";
import Cartcontext from "../store/context";
import { currencyFormatter } from "../util/formatting.js";
import UserprogressContext from "../store/progress";
import CartItem from "./cartItem";
import Button from "./UI/button";

export default function Cart(){
   const cartCtx= useContext(Cartcontext);
   const userProgressCtx=useContext(UserprogressContext);
   const cartTotal=cartCtx.items.reduce((totalprice,item)=>
    totalprice +item.quantity * item.price,0);

function handleCheckout(){
   userProgressCtx.showCheckout(); 
}
function handleclose(){
    userProgressCtx.hideCart();
}

   return (<Modal className="cart" open={userProgressCtx.progress==='cart'} onClose={userProgressCtx.progress==='cart'?handleclose:null}>
<h2>Your Cart</h2>
<ul>
{ cartCtx.items.map((item)=>(
    <CartItem 
     key={item.id} 
    name={item.name} 
    quantity={item.quantity} 
    price={item.price} 
    onDecrease={()=>cartCtx.removeItem(item.id)}
     onIncrease={()=>cartCtx.addItem(item)}/>
))}
</ul>
<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
<p className="modal-actions">
    <Button textOnly onClick={handleclose}>Close</Button>
    {cartCtx.items.length>0&&<Button onClick={handleCheckout}>Go To Checkout</Button>}
</p>
    </Modal>);
}