import { useState, useEffect } from 'react'
import './App.css'
//Most IMP for React class name should start with capital always

//{title} is known as destructuring used for using value of title variable
const Card = ({title}) =>{
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(()=>{
    console.log(`${title} has beed ${liked}`);
  }, [liked]);
  //[] is called as dependancy array, using which use effect is invoked

  return(
    <div className = "card" onClick = {() => setCount(count + 1)}>
    <h2>{title} | {count}</h2>
    

    <button onClick = { () => setLiked(!liked) }></button>
     { setLiked ? "true" : "false"}
    </div>
  )
}

const App = () => {
  
  return(
  <div className = "card-container">
    <Card title = "Star Wars" />
  </div>
   )
}

//export default App
