


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
    location.hash = "#home";
});


window.addEventListener('DOMContentLoaded',navigator , false);
window.addEventListener('hashchange',navigator , false);

function navigator() {
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
}



function homePage() {

    RenderTrendsDay(trendingMoviesPreviewList,'/trending/movie/day');
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



    renderGenresMovies("/discover/movie",`&with_genres=${idGenre}`)

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


    renderGenresMovies ('/search/movie',`&query=${urlHashSearch}`);
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



    RenderTrendsDay(genericSection,'/trending/movie/day');

}




function converUrl (s){

    return s.replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%A9", "é")



}