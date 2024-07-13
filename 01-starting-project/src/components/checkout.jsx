import { useContext } from "react";
import Modal from "./UI/Modal";
import Cartcontext from "../store/context";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/input";
import Button from "./UI/button";
import UserprogressContext from "../store/progress";
import usehttp from "../hook/usehttp";
import Error from "./error.jsx";

const requestconfig={
    method:'POST',
    headers:{
        'Content-type':'application/json',
    }
}
export default function CheckOut(){
   const cartCtx= useContext(Cartcontext);
   const userProgressCtx=useContext(UserprogressContext);

  const{data,loading:isSending,error,sendRequest,clearData}= usehttp('http://localhost:3000/orders',requestconfig)
   const cartTotal=cartCtx.items.reduce((totalprice,item)=>
    totalprice +item.quantity*item.price,0);

function handleSubmit(event){
    event.preventDefault();
    const fd=new FormData(event.target);
    const customerData=Object.fromEntries(fd.entries());
    sendRequest(
        JSON.stringify({
            order:{
                items:cartCtx.items,
                customer:customerData
            }
                }),
    );
}
function handleClose(){
    userProgressCtx.hideCheckout();
}
function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
}
let actions=(
    <>
     <Button  type="button" textOnly onClick={handleClose}>Close</Button>
     <Button >Submit Order</Button>
    </>
)
if(isSending){
    actions=<span>Sending order data...</span>
}
if(data&&!error){
return <Modal open ={userProgressCtx.progress==='checkout'} onClose={handleFinish}>
<h2>Success!</h2>
<p>Your order has submitted successfully.</p>
<p>we will get back to you with more details via email withing few minutes.</p>
<p className="modal-actions">
    <Button onClick={handleFinish}>Okay</Button>
</p>
</Modal>
}

    return (
    <Modal open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
        <form  onSubmit={handleSubmit}>

<h2>Checkout</h2>
<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

<Input type="text" label="Full-Name" id="name"/>
<Input type="email" label="E-mail address" id="email"/>
<Input type="text" label="Street" id="street"/>
<div className="control-row">
    <Input type="text" label="Postal Code" id="postal-code"/>
    <Input type="text" label="City" id="city"/>
</div>
{error&&<Error title="Failed to Submit order" message={error}/>}
<p className="modal-actions">
   {actions}
</p>
        </form>
    </Modal>);
}