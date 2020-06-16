import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

function loadDataRecommend(path="tv/2/recommendations?api_key=") {
    let url = `${BASE_URL + path + API_KEY}&language=en-US&page=1`

    DataSource.loadData(url)
    .then(renderResult)
    .catch(fallbackResult)
}

const renderResult = results => {
    addItemTVRecommend(results)
}

const fallbackResult = results => {

}


const addItemTVRecommend = function (data) {  
    let selectElement = document.querySelector(".recommendation__content");
    let tmp = ``;

    data.results.forEach(items => {
        tmp += 
        `
        <div class="itemMovie">
            <a href="#"><img class="itemMovie__img" src="https://image.tmdb.org/t/p/w500${items.poster_path}" alt=""></a>
            <p class="itemMovie__title center-align">${items.title}</p>
        </div>
        `
    })
    selectElement.innerHTML = tmp;

}

export {loadDataRecommend}