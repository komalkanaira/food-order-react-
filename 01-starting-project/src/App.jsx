import Cart from './components/cart.jsx';
import CheckOut from './components/checkout.jsx';
import Header from './components/header.jsx'
import Meals from './components/meals.jsx';
import  {CartcontextProvider} from './store/context.jsx';
import {UserprogressContextProvider} from './store/progress.jsx';

function App() {


  return (
    <UserprogressContextProvider>
    <CartcontextProvider >
     <Header/>
     <Meals/>
     <Cart/>
     <CheckOut/>
    </CartcontextProvider>
    </UserprogressContextProvider>
  );
}

export default App;
