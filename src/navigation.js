
let infiniteScroll;

/* funcionalidades */

searchFormBtn.addEventListener('click', () => {

    let search = searchFormInput.value;

    //search = search.replaceAll(" ", "-");


    location.hash = `#search=${search}`;



});

trendingBtn.addEventListener('click', () => {
    location.hash = "#trends";
});

arrowBtn.addEventListener('click', () => {



    history.back();


});


window.addEventListener('DOMContentLoaded',navigator , false);
window.addEventListener('hashchange',navigator , false);
window.addEventListener('scroll',infiniteScroll,false);

function navigator() {

    if (infiniteScroll){

       window.removeEventListener('scroll',infiniteScroll,false);
        infiniteScroll=undefined;
    }

    if (location.hash.startsWith("#trends")) {
        trendsPage();

    } else if (location.hash.startsWith("#search=")) {
        searchPage();

    } else if (location.hash.startsWith("#movie=")) {
        movieDetailsPage();

    } else if (location.hash.startsWith("#genre=")) {
        categoriesPage();

    } else {
        homePage();

    }

    if (infiniteScroll){

        window.addEventListener('scroll',infiniteScroll,false)

    }

}



function homePage() {

    getRenderMovies('/trending/movie/day',``,trendingMoviesPreviewList)

    RenderGenresList();

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');





}

function categoriesPage() {
    console.log("Categories!!")

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');


    const urlHash = location.hash.split('=');
    const idGenre = urlHash[1].split('-')[0];
    const genreName =urlHash[1].split('-')
        .slice(1,4)
        .toString()
        .replaceAll(',', ' ');

    headerCategoryTitle.textContent = converUrl(genreName);




    getRenderMovies('/discover/movie',`&with_genres=${idGenre}`,genericSection)

    infiniteScroll =  observerScroll('/discover/movie',genericSection,`&with_genres=${idGenre}` );


}

function movieDetailsPage() {
    console.log("Movie!!")
    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const idMovie = location.hash.split('=')[1]
        .split('-');

    headerSection.style.background = '';
    getRenderOneMovie(`/movie/${idMovie[0]}`);

}

function searchPage() {
    console.log("Search!!");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const urlHashSearch = location.hash.split('=')[1];





//renderizamos peliculas por busqueda en el nodo genberico
   getRenderMovies('/search/movie',`&query=${urlHashSearch}`,genericSection)

   infiniteScroll =  observerScroll('/search/movie',genericSection,`&query=${urlHashSearch}`);


}

function trendsPage() {
    console.log("TRENDS!!");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');





    getRenderMovies('/trending/movie/day',null,genericSection,true);


     infiniteScroll =  observerScroll('/trending/movie/day',genericSection);


}




function converUrl (s){

    return s.replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%A9", "é")



}