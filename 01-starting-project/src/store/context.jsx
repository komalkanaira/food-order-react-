import { createContext, useReducer } from "react";

 const Cartcontext=createContext({
items:[],
addItem:(item)=>{},
removeItem:(id)=>{},
clearCart:()=>{}
});

function cartReducer(state,action){

if(action.type==='ADD_ITEM'){
const existingCartItemIndex=state.items.findIndex(
   (item)=>item.id===action.item.id);

   const updatedItems=[...state.items];

if(existingCartItemIndex>-1){
   const existingItem=state.items[existingCartItemIndex];

const updateItem={
  ...existingItem,
  quantity:existingItem.quantity+1,

};
updatedItems[existingCartItemIndex]=updateItem;
}
else{
   updatedItems.push({...action.item,quantity :1});
}
return{...state,items:updatedItems};
}

if(action.type==='REMOVE_ITEM'){
   const existingCartItemIndex=state.items.findIndex(
      (item)=>item.id===action.id);
   
      const updatedItems=[...state.items];
      const existingItem=state.items[existingCartItemIndex];
      if(existingItem.quantity===1){
   updatedItems.splice(existingCartItemIndex,1); 
}  
else{
   const updateItem={
      ...existingItem,
      quantity:existingItem.quantity-1
   }
   updatedItems[existingCartItemIndex]=updateItem;
}
return {...state,items:updatedItems};
}
if(action.type==='CLEAR_CART'){
   return {...state,items:[]};
}

return state;
}

 export function CartcontextProvider({children}){
 const[cart,dispatchCartAction]=useReducer(cartReducer,{items:[]});
 

function addItem(item){
   dispatchCartAction({
      type:'ADD_ITEM',
item
   });
}
function removeItem(id){
dispatchCartAction({
   type:'REMOVE_ITEM',
   id
});
}
function clearCart(){
   dispatchCartAction({
      type:'CLEAR_CART',
   })
}
const cartContext={
   items:cart.items,
   addItem,
   removeItem,
   clearCart
};

console.log(cartContext);
return (
<Cartcontext.Provider value={cartContext}> {children}</Cartcontext.Provider>
);
}
export default Cartcontext;