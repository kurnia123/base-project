import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

function loadDataTVPopuler(path = "tv/popular?api_key=") {
    let url = `${BASE_URL + path + API_KEY}&language=en-US&page=1`

    DataSource.loadData(url)
        .then(renderResult)
        .catch(fallbackResult)
}

const renderResult = results => {
    addItemTVPopular(results.results)
    slideShow(results.results)
}

const fallbackResult = results => {
    console.log(results)
}

const addItemTVPopular = function (data) {  
    let selectElement = document.querySelector(".wrap__listItemMovie");
    let tmp = ``;

    data.forEach(items => {
        tmp += 
        `
            <div class="itemMovie">
                <a href="./detail/detail.html?id=${items.id}&type=${items.original_title === undefined ? "tv" : "movie"}">
                    <img class="itemMovie__img" src="https://image.tmdb.org/t/p/w500${items.poster_path}" alt="">
                </a>
                <p class="itemMovie__title center-align">${items.original_name === undefined ? items.original_title : items.original_name}</p>
            </div>
        `
    })
    selectElement.innerHTML = tmp;

}


const slideShow = function(data) {
    
    let selectSlide = document.querySelector(".carousel");
    let tmp = ``
    data.forEach(item => {
        tmp += `<a class="carousel-item" href="#"><img src="https://image.tmdb.org/t/p/w780/${item.backdrop_path}"></a>`;
    })
    selectSlide.innerHTML = tmp;

    let elemsCarousel = document.querySelector('.carousel');
    let instanceCarousel = M.Carousel.init(elemsCarousel,{fullWidth:true})
    autoPlay();

    function autoPlay() {
        instanceCarousel.next();
        setTimeout(autoPlay, 4500);
    }
}



export {loadDataTVPopuler};