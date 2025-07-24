import React from 'react'
//Here props - properties is passed by using destructuring
//destructured prop into its properties
const MovieCard = ({ movie : 
    { title, vote_average, poster_path, release_date, original_language }
}) => {
  return (
    <div className='movie-card'>
     <img src={poster_path ?
          `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}/>


     <div className='mt-4'>
       <h2>{title}</h2>

       <div className ='content'>
          <div className='rating'>
            <img src="./public/star.svg" alt='Star Icon'/>
            {/* toFixed()
                What it does: Formats a number using fixed-point notation. It converts a number to a string, rounding the number to a specified number of decimals.

                Syntax: number.toFixed(digits)

                digits: (Optional) The number of digits to appear after the decimal point. This value must be between 0 and 100, inclusive. If omitted, it defaults to 0.

                Returns: A string representation of the number, not a number.  */}
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            <span>•</span>
            <p className ='lang'>{original_language}</p>
            <span>•</span>
            <p className ='year'>{release_date ? release_date.split('-')[0]: 'N/A'}</p>
          </div>
       </div>
     </div>
    </div>
  )
}

export default MovieCard