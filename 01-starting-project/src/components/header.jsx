import logoimg from '../assets/logo.jpg';
import Button from './UI/button.jsx';
import { useContext } from 'react';
import Cartcontext from '../store/context.jsx';
import UserprogressContext from '../store/progress.jsx';

export default function Header(){

const cartCtx=useContext(Cartcontext);
const userProgressCtx=useContext(UserprogressContext);

const totalCartItems=cartCtx.items.reduce((totalnumberofitems,item)=>{
    return totalnumberofitems + item.quantity;
},0);
function handleShowCart(){
    userProgressCtx.showCart();
}
    return(
<header id="main-header">
    <div id="title">
        <img src={logoimg} alt="logoimg" />
        <h1>React Food</h1>
    </div>
    <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
    </nav>
</header>
    );
}