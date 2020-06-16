import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

function loadDataTVPopuler(path = "tv/popular?api_key=") {
    let url = `${BASE_URL + path + API_KEY}&language=en-US&page=1`

    DataSource.loadData(url)
        .then(renderResult)
        .catch(fallbackResult)
}

const renderResult = results => {
    addItemTVPopular(results)
    slideShow(results)
}

const fallbackResult = results => {

}

const addItemTVPopular = function (data) {  
    let selectElement = document.querySelector(".wrap__listItemMovie");
    let tmp = ``;

    data.results.forEach(items => {
        tmp += 
        `
            <div class="itemMovie">
                <a href="#"><img class="itemMovie__img" src="https://image.tmdb.org/t/p/w500${items.poster_path}" alt=""></a>
                <p class="itemMovie__title center-align">${items.original_name === undefined ? items.original_title : items.original_name}</p>
            </div>
        `
    })
    selectElement.innerHTML = tmp;

}


const slideShow = function(data) {
    let count = data.length - 1;
    let index = 1;

    let selectSlide = document.querySelector(".banner");

    setInterval(() => {
        if (index > count) {
            index = 1;
        } else {
            selectSlide.style.background = `url('https://image.tmdb.org/t/p/w780${data.results[index].backdrop_path}')`
            selectSlide.style.backgroundSize = "cover";
            selectSlide.style.backgroundRepeat = "no-repeat";
            index++
        }
    },4000)
}

export {loadDataTVPopuler};