import { createContext, useState } from "react"

const UserprogressContext=createContext({
  progress:'',
  showCart:()=>{},
  hideCart:()=>{},
  showCheckout:()=>{},
  hideCheckout:()=>{}  
});
export function UserprogressContextProvider({children}){
    const[userProgress,setUserProgress]=useState('');

function showCart(){
    setUserProgress('cart');
}
function hideCart(){
    setUserProgress('');
}
function showCheckout(){
    setUserProgress('checkout');
}
function hideCheckout(){
    setUserProgress('');
}

    const userprogressCtx={
        progress:userProgress,
        showCart,
  hideCart,
  showCheckout,
  hideCheckout 
    }
    return <UserprogressContext.Provider value={userprogressCtx}>
        {children}</UserprogressContext.Provider>
}
export default UserprogressContext;