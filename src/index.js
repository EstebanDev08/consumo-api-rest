const API_key = '89a6dd4a75651354ac25c6fb617c4f3a';

async function consultaFetch(endPoint, params = ''){

    params = '' || params;
    const  res = await fetch(`https://api.themoviedb.org/3${endPoint}?api_key=${API_key}&language=es-co${params}`);

    return   await res.json() ;

    }


function RenderGenresList (){

    const API_URL_GENRE = '/genre/movie/list';

    consultaFetch(API_URL_GENRE)
        .then(data=>{

            //mostrar categorias
            categoriesPreviewList.innerHTML = '';
            data.genres.forEach(genre=>{

                const HtmlCategoriesList = `
            
               <div class="category-container">
                    <h3 id="id${genre.id}" 
                    class="category-title"
                    onClick="searchCategory('${genre.id}-${genre.name}')"
                                        
                    >${genre.name}</h3>
               </div>
                
            `;
                categoriesPreviewList.innerHTML += HtmlCategoriesList;
            });
        })

}

//se utiliza para agregar evento onclick directo en html en la funcion rendergenres
function searchCategory(a){


    location.hash = `#genre=${a.replaceAll(' ',"-")}`;
}

//funcion para renderizar peliculas en pasandole el end point de la api parametros en caso de ser necesario
function getRenderMovies(endPoint,prm , nodoHtml , scrollInfinite = false){

    if (!scrollInfinite){
        nodoHtml.innerHTML='';

    }


    consultaFetch(endPoint,prm)
        .then(movies => {


            movies.results.forEach(movie=>{

                const HtmlMovieContainer = `
            
                     <div class="movie-container"
                     onClick="urlMovie('${movie.id}-${movie.title}')"
                     >
                        <img
                              src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                              class="movie-img"
                              alt="${movie.title}"
                        />
                     </div>
                        
            `;

                nodoHtml.innerHTML += HtmlMovieContainer;



            });


        });

}

function urlMovie(a){


    location.hash = `#movie=${a.replaceAll(' ',"-")}`;
}

//solo obtiene los datos de una sola mlovie
function getRenderOneMovie(endPoint,prm){


    consultaFetch(endPoint,prm)
        .then(movie => {

            headerSection.style.background = `linear-gradient(180deg,
             rgba(0, 0, 0, 0.35) 19.27%, 
             rgba(0, 0, 0, 0) 29.17%),
             url(https://image.tmdb.org/t/p/original${movie.poster_path})`

            console.log(movie)

            movieDetailTitle.textContent = movie.title;
            movieDetailDescription.textContent = movie.overview;
            movieDetailScore.textContent = movie.vote_average.toFixed(1);

            const genresMovie = movie.genres;

            movieDetailCategoriesList.innerHTML = '';

            genresMovie.forEach(genre=>{

                const HtmlListGenres = `
                
                  <div class="category-container">
                     <h3 id="id${genre.id}" class="category-title">${genre.name}</h3>
                  </div>           
                  
                `;

                movieDetailCategoriesList.innerHTML += HtmlListGenres;

            })


            getRenderMovies(`${endPoint}/similar`,prm , relatedMoviesContainer);

        });

}


function observerScroll (endPoint, node,prm = "") {
    console.log("scroll")

    let page = 2;

    let ScrollPass =false;

    let distanciaSroll;

    let pages ;




    return  async ()=>{



        if ( (window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight)  ) {


            pages = await consultaFetch(endPoint,prm).then(movies => {

                ScrollPass = true ;

                return movies.total_pages;


            })

            console.log(distanciaSroll)



            if (page <= pages && ScrollPass ) {



               await getRenderMovies(endPoint, `&page=${page}${prm}`, node, true);

                console.log(document.documentElement.scrollHeight)

                page++;

                ScrollPass = false;

            }



        }


    }


}


