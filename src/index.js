const API_key = '89a6dd4a75651354ac25c6fb617c4f3a';

async function consultaFetch(url, params = ''){

    params = '' || params;
    const  res = await fetch(`${url}?api_key=${API_key}&language=es-co${params}`);

    return   await res.json();

    }

    function RenderTrendsDays(){

        const API_URL_TREND_DAY = 'https://api.themoviedb.org/3/trending/movie/day';

        consultaFetch(API_URL_TREND_DAY)
            .then(movies => {

                //mostrar trending day
                const articleTrending = document.querySelector('.trendingPreview-movieList')
                articleTrending.innerHTML='';

                movies.results.forEach(movie=>{

                    const HtmlMovieContainer = `
            
                     <div class="movie-container">
                        <img
                              src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                              class="movie-img"
                              alt="${movie.title}"
                        />
                     </div>
                        
            `;

                    articleTrending.innerHTML += HtmlMovieContainer;


                });

            });


    }


function RenderGenres (){

    const API_URL_GENRE = 'https://api.themoviedb.org/3/genre/movie/list';

    consultaFetch(API_URL_GENRE)
        .then(data=>{

            //mostrar categorias
            const articleCategories = document.querySelector('.categoriesPreview-list')

            articleCategories.innerHTML = '';
            data.genres.forEach(genre=>{

                const HtmlCategoriesList = `
            
               <div class="category-container">
                    <h3 id="id${genre.id}" 
                    class="category-title"
                    onClick="searchCategory('${genre.id}-${genre.name}')"
                                        
                    >${genre.name}</h3>
               </div>
                
            `;

                articleCategories.innerHTML += HtmlCategoriesList;


            });
        })




}

//se utiliza para agregar evento onclick directo en html en la funcion rendergenres
function searchCategory(a){


    location.hash = `#genre=${a.replaceAll(' ',"-")}`;
}




function renderSearchMovies (prm){
    //borrar el contenedor
    genericSection.innerHTML = '';

    const URL_FILTER_MOVIES = "https://api.themoviedb.org/3/discover/movie"

    consultaFetch(URL_FILTER_MOVIES,prm).then(data=>{

      const movies = data.results;


        movies.forEach(movie => {

            //mostrar categorias


            const HtmlListForGenre = `
            
                    <div  class="movie-container">
                      <img
                                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                                class="movie-img"
                                alt="${movie.title}"
                      />
                    </div>
                
            `;
                //es el elemento del dom donde se renderiza la img
                genericSection.innerHTML += HtmlListForGenre;


        });


    })


}


