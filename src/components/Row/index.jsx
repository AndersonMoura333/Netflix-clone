import React, { useState, useEffect} from 'react'
import { getMoveis } from '../../api';
import './style.css'
const imageHost = "https://image.tmdb.org/t/p/original/";
export default function Row({title, path, isLarge}) {
const [movies, setMovies] = useState([]);

const fetchMovies =async (path) => {
    try {
        const data = await getMoveis(path);
        setMovies (data?.results);
    } catch (error) {
        console.log("fetchMovies error", error);
    }
}

useEffect(() => {
  fetchMovies(path)
}, [path])

  return (
    <div className='row-container'>
        <h2 className='row-header'>{title}</h2>
        <div className='row-cards'>
            {movies?.map((movie) =>{
                return (
                <img   
                className={`movie-card ${isLarge && "movie-card-large"}`}
                 key = {movie.id}
                 src={`${imageHost}${
                  isLarge ? movie.backdrop_path : movie.poster_path
                }`} 
                 alt=""  />)
            })}
        </div>
    </div>
  )
}
