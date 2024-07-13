
import Mealitem from './mealitem';
import usehttp from '../hook/usehttp';
import Error from './error.jsx';

const requestconfig={};
export default function Meals () {

const {data:loadedmeals,loading,error}=usehttp('http://localhost:3000/meals', requestconfig ,[]);
if(loading){
  return <p className='center'>Feching meal...</p>
}
if(error){
  return <Error title="failed to fetch meals"message={error}/>
}
return (
<ul id="meals">
  {loadedmeals.map((meal)=>(
    <Mealitem key={meal.id} meal={meal}/>
  ))}
  

</ul>
);
}