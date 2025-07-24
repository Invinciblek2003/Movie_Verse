import React from 'react'

//Here we destructured props into two values
//instead we can only pass single props objext
//But Evertime we have to use props.searchTerm and props.setSearchTerm
const search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className ="search">
        
    <div>
      <img src = "./search.svg" alt = "search"></img>

      <input
      type = "text"
      placeholder = "search through thousands of movies"
      value = {searchTerm}
      onChange = {(event)=> setSearchTerm(event.target.value)}
      />

      
    </div>
        
    </div>
  )
}

export default search