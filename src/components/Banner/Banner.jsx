import React, { useEffect, useState } from 'react'
import categories, { getMoveis } from '../../api';
import './Banner.css'
function Banner() {
    const [movie, setMovie] = useState({});
    const imagePath = 'https://image.tmdb.org/t/p/original/';
    const fetchRandomovie= async(_path) =>{
        try {
            const netflixOriginalsCategory = categories.find((category) => category.name === "netflixOriginals");
            const data = await getMoveis(netflixOriginalsCategory.path);
            const randomIndex = Math.floor(Math.random()*data.results.length);
            setMovie(data?.results[randomIndex]);
        } catch (error) {
            console.log("Banner fetchRandomovie error:", error);
        }
    }

    function truncate(str, n) {
        return str?.length > n ? str.substring(0, n - 1) + "..." : str;
      }

    useEffect(()=>{
        fetchRandomovie();
    },[])
  return (
      
      <header className='banner-container' style={
          {
              backgroundSize: "Cover",
              backgroundImage: `url("${imagePath}${movie?.backdrop_path}")`,
              roundPosition: "center-center",
          }
      }>

    <div className='banner-content'>
        <h1 className='banner-title'>
             {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons-container">
          <button className="banner-button">Assistir</button>
          <button className="banner-button">Minha Lista</button>
        </div>
        <div className="banner-description">
          <h2>{truncate(movie?.overview, 350)}</h2>
        </div>    
    </div>
      </header>
  )
}

export default Banner